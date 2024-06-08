const { responseReturn } = require('../../utiles/response');
const myShopWallet = require('../../models/myShopWallet');
const productModel = require('../../models/productModel');
const customerOrder = require('../../models/customerOrder');
const sellerModel = require('../../models/sellerModel');
const adminSellerMessage = require('../../models/chat/adminSellerMessage');
const sellerWallet = require('../../models/sellerWallet');
const authOrder = require('../../models/authOrder');
const sellerCustomerMessage = require('../../models/chat/sellerCustomerMessage');
const bannerModel = require('../../models/bannerModel');
const path = require('path');
const fs = require('fs');
const {
  mongo: { ObjectId },
} = require('mongoose');
const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');
const { log } = require('console');

class dashboardController {
  get_admin_dashboard_data = async (req, res) => {
    const { id } = req;
    try {
      const totalSale = await myShopWallet.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' },
          },
        },
      ]);
      const totalProduct = await productModel.find({}).countDocuments();
      const totalOrder = await customerOrder.find({}).countDocuments();
      const totalSeller = await sellerModel.find({}).countDocuments();
      const messages = await adminSellerMessage.find({}).limit(10);
      const recentOrders = await customerOrder.find({}).limit(5);
      responseReturn(res, 200, {
        totalProduct,
        totalOrder,
        totalSeller,
        messages,
        recentOrders,
        totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  //end Method

  get_seller_dashboard_data = async (req, res) => {
    const { id } = req;
    try {
      const totalSale = await sellerWallet.aggregate([
        {
          $match: {
            sellerId: {
              $eq: id,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' },
          },
        },
      ]);

      const totalProduct = await productModel
        .find({
          sellerId: new ObjectId(id),
        })
        .countDocuments();

      const totalOrder = await authOrder
        .find({
          sellerId: new ObjectId(id),
        })
        .countDocuments();

      const totalPendingOrder = await authOrder
        .find({
          $and: [
            {
              sellerId: {
                $eq: new ObjectId(id),
              },
            },
            {
              delivery_status: {
                $eq: 'pending',
              },
            },
          ],
        })
        .countDocuments();
      const messages = await sellerCustomerMessage
        .find({
          $or: [
            {
              senderId: {
                $eq: id,
              },
            },
            {
              receverId: {
                $eq: id,
              },
            },
          ],
        })
        .limit(3);

      const recentOrders = await authOrder
        .find({
          sellerId: new ObjectId(id),
        })
        .limit(5);

      responseReturn(res, 200, {
        totalProduct,
        totalOrder,
        totalPendingOrder,
        messages,
        recentOrders,
        totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  //end Method

  // add_banner = async (req, res) => {
  //   const form = formidable({ multiples: true });
  //   form.parse(req, async (err, field, files) => {
  //     const { productId } = field;
  //     const { mainban } = files;

  //     cloudinary.config({
  //       cloud_name: process.env.cloud_name,
  //       api_key: process.env.api_key,
  //       api_secret: process.env.api_secret,
  //       secure: true,
  //     });

  //     try {
  //       const { slug } = await productModel.findById(productId);
  //       const result = await cloudinary.uploader.upload(mainban.filepath, {
  //         folder: 'banners',
  //       });
  //       const banner = await bannerModel.create({
  //         productId,
  //         banner: result.url,
  //         link: slug,
  //       });
  //       responseReturn(res, 200, { banner, message: 'Banner Add Success' });
  //     } catch (error) {
  //       responseReturn(res, 500, { error: error.message });
  //     }
  //   });
  // };

  add_banner = async (req, res) => {
    try {
      if (!req.file) {
        return responseReturn(res, 404, { error: 'Image upload failed' });
      }

      // let { bannerName } = req.body;
      // bannerName = bannerName.trim();

      const imageFileName = req.file.filename; // Extract the filename
      if (!imageFileName) {
        return responseReturn(res, 404, { error: 'Please upload image' });
      }
      // const existingBanner = await bannerModel.findOne({ bannerName });

      // if (existingBanner) {
      //   responseReturn(res, 400, { error: 'Banner already exist' });
      //   return;
      // } else {
      const banner = await bannerModel.create({
        // bannerName,
        image: imageFileName,
      });
      return responseReturn(res, 201, {
        banner,
        message: 'Banner added successfully',
      });
      // }
    } catch (error) {
      return responseReturn(res, 500, { error: 'Internal Server Error' });
    }
  };
  //end Method

  get_banner = async (req, res) => {
    // const { productId } = req.params;
    try {
      //const categorys = await categoryModel.find({}).sort({ createdAt: -1 });
      const banner = await bannerModel.findOne();
      responseReturn(res, 200, { banner });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  //end Method

  update_banner = async (req, res) => {
    let { bannerId } = req.body;
    // bannerName = bannerName.trim();
    try {
      const imageFileName = req.file.filename; // Extract the filename

      const existingBanner = await bannerModel.findById(bannerId);

      if (existingBanner) {
        const oldImagePath = path.join(
          __dirname,
          '..',
          '../uploads',
          existingBanner.image
        );
        console.log(`Old image path: ${oldImagePath}`);
        // Check if the old image exists before deleting
        fs.access(oldImagePath, fs.constants.F_OK, (err) => {
          if (err) {
            console.error('Old image not found or inaccessible:', err);
          } else {
            fs.unlink(oldImagePath, (err) => {
              if (err) {
                console.error('Failed to delete old image:', err);
              } else {
                console.log('Old image deleted successfully');
              }
            });
          }
        });

        existingBanner.image = imageFileName; // Save only the filename

        await bannerModel.findByIdAndUpdate(bannerId, {
          // bannerName,
          image: imageFileName,
        });
      }

      const banner = await bannerModel.findById(bannerId);
      responseReturn(res, 200, {
        banner,
        message: 'Category Updated Successfully',
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  //end Method

  get_banners = async (req, res) => {
    try {
      const banners = await bannerModel.find();
      // aggregate
      // (
      //   [
      //   {
      //    $sample: {
      //       size: 2,
      //     },
      //   },
      // ]
      // );

      responseReturn(res, 200, { banners });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  //end Method

  delete_banner = async (req, res) => {
    // let { bannerId } = req.body;
    const { bannerId } = req.params;
    try {
      await bannerModel.findByIdAndDelete(bannerId);
      responseReturn(res, 200, { message: 'Banner Remove Successfully' });
    } catch (error) {
      //console.log(error.message);
      responseReturn(res, 500, { message: 'Failed to remove banner' });
    }
  };
  // End Method
}

module.exports = new dashboardController();

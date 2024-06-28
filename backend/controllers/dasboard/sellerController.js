const formidable = require('formidable');
const { responseReturn } = require('../../utiles/response');
// const cloudinary = require('cloudinary').v2
const sellerModel = require('../../models/sellerModel');
const bcrpty = require('bcrypt');
const path = require('path');
const fs = require('fs').promises;

class sellerController {
  request_seller_get = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
      } else {
        const sellers = await sellerModel
          .find({ status: 'pending' })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalSeller = await sellerModel
          .find({ status: 'pending' })
          .countDocuments();
        responseReturn(res, 200, { sellers, totalSeller });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  // end method

  seller_register = async (req, res) => {
    const { phone, name, password, category, address, shopName, city } =
      req.body;
    shopName = shopName.trim();
    const slug = shopName.split(' ').join('-');
    try {
      if (!req.file) {
        return responseReturn(res, 404, { error: 'Image upload failed' });
      }
      const imageFileName = req.file.filename;
      const getUser = await sellerModel.findOne({ phone });
      if (getUser) {
        responseReturn(res, 404, { error: 'Phone Already Exit' });
      } else {
        const seller = await sellerModel.create({
          name,
          phone,
          password: await bcrpty.hash(password, 10),
          category,
          method: 'menualy',
          slug,
          shopInfo: {
            shopName,
            address,
            city,
          },
          image: imageFileName,
        });
        return responseReturn(res, 201, {
          seller,
          message: 'Seller added successfully',
        });
      }
    } catch (error) {
      responseReturn(res, 500, { error: 'Internal Server Error' });
    }
  };
  // End Method

  seller_update = async (req, res) => {
    const {
      phone,
      name,
      password,
      category,
      address,
      shopName,
      city,
      sellerId,
    } = req.body;
    shopName = shopName.trim();
    const slug = shopName.split(' ').join('-');
    try {
      await sellerModel.findByIdAndUpdate(sellerId, {
        name,
        phone,
        password: await bcrpty.hash(password, 10),
        category,
        method: 'menualy',
        slug,
        shopInfo: {
          shopName,
          address,
          city,
        },
        //image: imageFileName,
      });
      // }

      const seller = await sellerModel.findById(sellerId);
      responseReturn(res, 200, {
        seller,
        message: 'Seller Updated Successfully',
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  //End Method

  profile_image_upload = async (req, res) => {
    const { sellerId } = req.params;

    try {
      if (!req.file) {
        throw new Error('No file uploaded');
      }

      const imageFileName = req.file.filename; // Extract the filename
      console.log(`Uploaded file name: ${imageFileName}`);

      const existingSeller = await sellerModel.findById(sellerId);
      if (!existingSeller) {
        throw new Error(`Seller with ID ${sellerId} not found`);
      }

      const oldImagePath = path.join(
        __dirname,
        '..',
        '../uploads',
        existingSeller.image
      );
      console.log(`Old image path: ${oldImagePath}`);

      // Check if the old image exists before deleting
      try {
        await fs.access(oldImagePath);
        await fs.unlink(oldImagePath);
        console.log('Old image deleted successfully');
      } catch (err) {
        console.error('Old image not found or inaccessible:', err);
      }

      existingSeller.image = imageFileName; // Save only the filename
      await sellerModel.findByIdAndUpdate(sellerId, { image: imageFileName });

      const updatedSeller = await sellerModel.findById(sellerId);
      responseReturn(res, 200, {
        seller: updatedSeller,
        message: 'Image Updated Successfully',
      });
    } catch (error) {
      console.error('Error in profile_image_upload:', error.message);
      responseReturn(res, 500, { error: error.message });
    }
  };

  // End Method

  get_seller = async (req, res) => {
    const { sellerId } = req.params;
    try {
      const seller = await sellerModel.findById(sellerId);
      responseReturn(res, 200, { seller });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  // end method

  seller_status_update = async (req, res) => {
    const { sellerId, status } = req.body;
    try {
      await sellerModel.findByIdAndUpdate(sellerId, { status });
      const seller = await sellerModel.findById(sellerId);
      responseReturn(res, 200, {
        seller,
        message: 'Seller Status Updated Successfully',
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  // end method

  get_active_sellers = async (req, res) => {
    let { page, searchValue, parPage } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);

    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
        const sellers = await sellerModel
          .find({
            $text: { $search: searchValue },
            status: 'active',
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalSeller = await sellerModel
          .find({
            $text: { $search: searchValue },
            status: 'active',
          })
          .countDocuments();
        responseReturn(res, 200, { totalSeller, sellers });
      } else {
        const sellers = await sellerModel
          .find({ status: 'active' })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalSeller = await sellerModel
          .find({ status: 'active' })
          .countDocuments();
        responseReturn(res, 200, { totalSeller, sellers });
      }
    } catch (error) {
      console.log('active seller get ' + error.message);
    }
  };
  // end method

  get_deactive_sellers = async (req, res) => {
    let { page, searchValue, parPage } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);

    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
        const sellers = await sellerModel
          .find({
            $text: { $search: searchValue },
            status: 'deactive',
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalSeller = await sellerModel
          .find({
            $text: { $search: searchValue },
            status: 'deactive',
          })
          .countDocuments();
        responseReturn(res, 200, { totalSeller, sellers });
      } else {
        const sellers = await sellerModel
          .find({ status: 'deactive' })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalSeller = await sellerModel
          .find({ status: 'deactive' })
          .countDocuments();
        responseReturn(res, 200, { totalSeller, sellers });
      }
    } catch (error) {
      console.log('deactive seller get ' + error.message);
    }
  };
  // end method
}

module.exports = new sellerController();

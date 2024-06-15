const adminModel = require('../models/adminModel');
const sellerModel = require('../models/sellerModel');
const sellerCustomerModel = require('../models/chat/sellerCustomerModel');
const { responseReturn } = require('../utiles/response');
const bcrpty = require('bcrypt');
const { createToken } = require('../utiles/tokenCreate');
const path = require('path');
const fs = require('fs').promises;

class authControllers {
  admin_login = async (req, res) => {
    const { phone, password } = req.body;
    try {
      const admin = await adminModel.findOne({ phone }).select('+password');
      // console.log(admin)
      if (admin) {
        const match = await bcrpty.compare(password, admin.password);
        // console.log(match)
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie('accessToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: 'Login Success' });
        } else {
          responseReturn(res, 404, { error: 'Password Wrong' });
        }
      } else {
        responseReturn(res, 404, { error: 'Phone not Found' });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  // End Method

  seller_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const seller = await sellerModel.findOne({ email }).select('+password');
      // console.log(admin)
      if (seller) {
        const match = await bcrpty.compare(password, seller.password);
        // console.log(match)
        if (match) {
          const token = await createToken({
            id: seller.id,
            role: seller.role,
          });
          res.cookie('accessToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: 'Login Success' });
        } else {
          responseReturn(res, 404, { error: 'Password Wrong' });
        }
      } else {
        responseReturn(res, 404, { error: 'Email not Found' });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  // End Method

  admin_register = async (req, res) => {
    const { name, phone, password } = req.body;
    try {
      if (!req.file) {
        return responseReturn(res, 404, { error: 'Image upload failed' });
      }
      const imageFileName = req.file.filename;
      const getAdmin = await adminModel.findOne({ phone });
      if (getAdmin) {
        responseReturn(res, 404, { error: 'Phone Already Exit' });
      } else {
        const adminUser = await adminModel.create({
          name,
          phone,
          password: await bcrpty.hash(password, 10),
          role: 'admin',

          image: imageFileName,
        });
        // const adminUsers = await adminModel.find();
        // responseReturn(res, 201, {
        //   adminUsers,
        //   message: 'Admin added successfully',
        // });
        return responseReturn(res, 201, {
          adminUser,
          message: 'Admin added successfully',
        });
      }
    } catch (error) {
      responseReturn(res, 500, { error: 'Internal Server Error' });
    }
  };
  // End Method

  get_admin_users = async (req, res) => {
    let { page, searchValue, parPage } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);

    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
        const adminUsers = await adminModel
          .find({
            $text: { $search: searchValue },
            // role: 'admin',
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalAdmin = await adminModel
          .find({
            $text: { $search: searchValue },
            // role: 'admin',
          })
          .countDocuments();
        responseReturn(res, 200, { totalAdmin, adminUsers });
      } else {
        const adminUsers = await adminModel
          .find()
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalAdmin = await adminModel.find().countDocuments();
        responseReturn(res, 200, { totalAdmin, adminUsers });
      }
    } catch (error) {
      console.log('Admin users get ' + error.message);
    }
  };
  //end Method

  admin_update = async (req, res) => {
    const { phone, name, password, userId } = req.body;

    try {
      await adminModel.findByIdAndUpdate(userId, {
        name,
        phone,
        password: await bcrpty.hash(password, 10),
      });
      // }

      const adminUser = await adminModel.findById(userId);
      responseReturn(res, 200, {
        adminUser,
        message: 'User Updated Successfully',
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  //End Method

  admin_image_upload = async (req, res) => {
    const { userId } = req.params;

    try {
      if (!req.file) {
        throw new Error('No file uploaded');
      }

      const imageFileName = req.file.filename; // Extract the filename
      console.log(`Uploaded file name: ${imageFileName}`);

      const existingAdmin = await adminModel.findById(userId);
      if (!existingAdmin) {
        throw new Error(`User with ID ${userId} not found`);
      }

      const oldImagePath = path.join(
        __dirname,
        '..',
        '../uploads',
        existingAdmin.image
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

      existingAdmin.image = imageFileName; // Save only the filename
      await adminModel.findByIdAndUpdate(userId, { image: imageFileName });

      const updateUser = await adminModel.findById(userId);
      responseReturn(res, 200, {
        adminUser: updateUser,
        message: 'Image Updated Successfully',
      });
      console.log(updateUser);
    } catch (error) {
      console.error('Error in profile_image_upload:', error.message);
      responseReturn(res, 500, { error: error.message });
    }
  };

  // End Method

  delete_admin_user = async (req, res) => {
    // let { bannerId } = req.body;
    const { userId } = req.params;
    try {
      await adminModel.findByIdAndDelete(userId);
      // responseReturn(res, 200, { message: 'User Remove Successfully' });

      const adminUsers = await adminModel.find();
      responseReturn(res, 201, {
        message: 'User Remove Successfully',
        adminUsers,
      });
    } catch (error) {
      //console.log(error.message);
      responseReturn(res, 500, { message: 'Failed to remove User' });
    }
  };
  // End Method

  getUser = async (req, res) => {
    const { id, role } = req;

    try {
      if (role === 'admin') {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        const seller = await sellerModel.findById(id);
        responseReturn(res, 200, { userInfo: seller });
      }
    } catch (error) {
      responseReturn(res, 500, { error: 'Internal Server Error' });
    }
  }; // End getUser Method

  profile_info_add = async (req, res) => {
    const { address, phone, shopName, city } = req.body;
    const { id } = req;

    try {
      await sellerModel.findByIdAndUpdate(id, {
        shopInfo: {
          shopName,
          address,
          phone,
          city,
        },
      });
      const userInfo = await sellerModel.findById(id);
      responseReturn(res, 201, {
        message: 'Profile info Add Successfully',
        userInfo,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  // End Method

  logout = async (req, res) => {
    try {
      res.cookie('accessToken', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      responseReturn(res, 200, { message: 'logout Success' });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  // End Method
}

module.exports = new authControllers();

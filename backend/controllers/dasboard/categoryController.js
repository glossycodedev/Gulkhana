const formidable = require('formidable');
const { responseReturn } = require('../../utiles/response');
const cloudinary = require('cloudinary').v2;
const categoryModel = require('../../models/categoryModel');
// const { upload } = require('../../utiles/multer');
const path = require('path');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class categoryController {
  add_category = async (req, res) => {
    try {
      if (!req.file) {
        return responseReturn(res, 404, { error: 'Image upload failed' });
      }

      let { name } = req.body;
      name = name.trim();
      const slug = name.split(' ').join('-');
      const imagePath = req.file.path;
      const imageFileName = req.file.filename; // Extract the filename

      const existingCategory = await categoryModel.findOne({ name });

      if (existingCategory) {
        responseReturn(res, 400, { error: 'Category already exist' });
        return;
        
      } else {
        const category = await categoryModel.create({
          name,
          slug,
          image: imageFileName,
        });
        return responseReturn(res, 201, {
          category,
          message: 'Category added successfully',
        });
      }
    } catch (error) {
      return responseReturn(res, 500, { error: 'Internal Server Error' });
    }
  };
  // end method
  category_update = async (req, res) => {
    let { name, categoryId } = req.body;
    name = name.trim();
    const slug = name.split(' ').join('-');
    try {
      const imageFileName = req.file.filename; // Extract the filename

      const existingCategory = await categoryModel.findById(categoryId);

      if (existingCategory) {
        const oldImagePath = path.join(
          __dirname,
          '..',
          '../uploads/categories',
          existingCategory.image
        );
        // console.log(`Old image path: ${oldImagePath}`);
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

        existingCategory.image = imageFileName; // Save only the filename

        await categoryModel.findByIdAndUpdate(categoryId, {
          name,
          slug,
          image: imageFileName,
        });
      }

      const category = await categoryModel.findById(categoryId);
      responseReturn(res, 200, {
        category,
        message: 'Category Updated Successfully',
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

 
  // End Method

  category_image_update = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      const { oldImage, categoryId } = fields;
      const { newImage } = files;

      if (err) {
        responseReturn(res, 400, { error: err.message });
        return;
      }

      if (!oldImage || !categoryId || !newImage) {
        responseReturn(res, 400, { error: 'Missing required fields' });
        return;
      }

      try {
        const result = await cloudinary.uploader.upload(newImage.filepath, {
          folder: 'categorys',
        });

        if (!result) {
          responseReturn(res, 404, { error: 'Image Upload Failed' });
          return;
        }

        const category = await categoryModel.findById(categoryId);
        if (!category) {
          responseReturn(res, 404, { error: 'Category Not Found' });
          return;
        }

        if (category.image !== oldImage) {
          responseReturn(res, 404, { error: 'Old Image Not Found' });
          return;
        }

        category.image = result.url;
        await category.save();

        responseReturn(res, 200, {
          category,
          message: 'Category Image Updated Successfully',
        });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };
  //End Method

  get_categoryId = async (req, res) => {
    const { categoryId } = req.params;
    try {
      const category = await categoryModel.findById(categoryId);
      responseReturn(res, 200, { category });
    } catch (error) {
      console.log(error.message);
    }
  };
  // End Method

  get_category = async (req, res) => {
    const { page, searchValue, parPage } = req.query;

    try {
      let skipPage = '';
      if (parPage && page) {
        skipPage = parseInt(parPage) * (parseInt(page) - 1);
      }

      if (searchValue && page && parPage) {
        const categorys = await categoryModel
          .find({
            $text: { $search: searchValue },
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalCategory = await categoryModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();
        responseReturn(res, 200, { categorys, totalCategory });
      } else if (searchValue === '' && page && parPage) {
        const categorys = await categoryModel
          .find({})
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalCategory = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { categorys, totalCategory });
      } else {
        const categorys = await categoryModel.find({}).sort({ createdAt: -1 });
        const totalCategory = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { categorys, totalCategory });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // end method
}

module.exports = new categoryController();

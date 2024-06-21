const { responseReturn } = require('../../utiles/response');
const reklamModel = require('../../models/reklamModel');
// const { upload } = require('../../utiles/multer');
const path = require('path');
const fs = require('fs');

class reklamController {
  add_reklam = async (req, res) => {
    try {
      if (!req.file) {
        return responseReturn(res, 404, { error: 'Image upload failed' });
      }

      let { title, description } = req.body;
      title = title.trim();
      const slug = title.split(' ').join('-');
      const imagePath = req.file.path;
      const imageFileName = req.file.filename; // Extract the filename

      const existingReklam = await reklamModel.findOne({ title });

      if (existingReklam) {
        responseReturn(res, 400, { error: 'Reklam already exist' });
        return;
      } else {
        const reklam = await reklamModel.create({
          title,
          description,
          image: imageFileName,
          slug,
        });
        return responseReturn(res, 201, {
          reklam,
          message: 'Reklam added successfully',
        });
      }
    } catch (error) {
      return responseReturn(res, 500, { error: 'Internal Server Error' });
    }
  };
  // end method

  reklam_update = async (req, res) => {
    let { title, description, reklamId } = req.body;
    title = title.trim();
    const slug = title.split(' ').join('-');
    try {
      const existingReklam = await reklamModel.findById(reklamId);

      if (existingReklam) {
        await reklamModel.findByIdAndUpdate(reklamId, {
          title,
          description,
          slug,
        });
      }

      const reklam = await reklamModel.findById(reklamId);
      responseReturn(res, 200, {
        reklam,
        message: 'Reklam Updated Successfully',
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  // End Method
  reklam_image_update = async (req, res) => {
    let { reklamId } = req.params;

    try {
      const imageFileName = req.file.filename; // Extract the filename

      const existingReklam = await reklamModel.findById(reklamId);

      if (existingReklam) {
        const oldImagePath = path.join(
          __dirname,
          '..',
          '../uploads',
          existingReklam.image
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

        existingReklam.image = imageFileName; // Save only the filename

        await reklamModel.findByIdAndUpdate(reklamId, {
          image: imageFileName,
        });
      }

      const reklam = await reklamModel.findById(reklamId);
      responseReturn(res, 200, {
        reklam,
        message: 'Reklam Image Updated Successfully',
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  // End Method

  // get_categoryId = async (req, res) => {
  //   const { categoryId } = req.params;
  //   try {
  //     const category = await categoryModel.findById(categoryId);
  //     responseReturn(res, 200, { category });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  // End Method

  get_reklams = async (req, res) => {
    const { page, searchValue, parPage } = req.query;

    try {
      let skipPage = '';
      if (parPage && page) {
        skipPage = parseInt(parPage) * (parseInt(page) - 1);
      }

      if (searchValue && page && parPage) {
        const reklams = await reklamModel
          .find({
            $text: { $search: searchValue },
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalReklams = await reklamModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();
        responseReturn(res, 200, { reklams, totalReklams });
      } else if (searchValue === '' && page && parPage) {
        const reklams = await reklamModel
          .find({})
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalReklams = await reklamModel.find({}).countDocuments();
        responseReturn(res, 200, { reklams, totalReklams });
      } else {
        const reklams = await reklamModel.find({}).sort({ createdAt: -1 });
        const totalReklams = await reklamModel.find({}).countDocuments();
        responseReturn(res, 200, { reklams, totalReklams });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // end method
}

module.exports = new reklamController();

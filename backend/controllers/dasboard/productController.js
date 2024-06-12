const formidable = require('formidable');
const { responseReturn } = require('../../utiles/response');
const cloudinary = require('cloudinary').v2;
const productModel = require('../../models/productModel');
const path = require('path');
const fs = require('fs').promises;

class productController {
  add_product = async (req, res) => {
    let {
      name,
      category,
      description,
      price,
      stock,
      discount,
      shopName,
      brand,
    } = req.body;
    const { id } = req;

    name = name.trim();
    const slug = name.split(' ').join('-');

    try {
      if (!req.files || req.files.length === 0) {
        return responseReturn(res, 404, { error: 'Image upload failed' });
      }

      const allImageUrl = req.files.map((file) => file.filename);

      await productModel.create({
        sellerId: id,
        name,
        slug,
        shopName,
        category: category.trim(),
        description: description.trim(),
        stock: parseInt(stock),
        price: parseInt(price),
        discount: parseInt(discount),
        images: allImageUrl,
        brand: brand.trim(),
      });

      responseReturn(res, 201, { message: 'Product Added Successfully' });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  /// end method

  products_get = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const { id } = req;

    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
        const products = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .countDocuments();
        responseReturn(res, 200, { products, totalProduct });
      } else {
        const products = await productModel
          .find({ sellerId: id })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({ sellerId: id })
          .countDocuments();
        responseReturn(res, 200, { products, totalProduct });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // End Method

  products_discount_get = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const { id } = req;

    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      const discountFilter = { discount: { $ne: 0 } };

      if (searchValue) {
        const products = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
            ...discountFilter,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalProduct = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
            ...discountFilter,
          })
          .countDocuments();

        responseReturn(res, 200, { products, totalProduct });
      } else {
        const products = await productModel
          .find({ sellerId: id, ...discountFilter })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalProduct = await productModel
          .find({ sellerId: id, ...discountFilter })
          .countDocuments();

        responseReturn(res, 200, { products, totalProduct });
      }
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { message: 'An error occurred.' });
    }
  };

  // End Method

  product_get = async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await productModel.findById(productId);
      responseReturn(res, 200, { product });
    } catch (error) {
      console.log(error.message);
    }
  };
  // End Method

  product_update = async (req, res) => {
    let { name, description, stock, price, discount, brand, productId } =
      req.body;
    name = name.trim();
    const slug = name.split(' ').join('-');

    try {
      await productModel.findByIdAndUpdate(productId, {
        name,
        description,
        stock,
        price,
        discount,
        brand,
        productId,
        slug,
      });
      const product = await productModel.findById(productId);
      responseReturn(res, 200, {
        product,
        message: 'Product Updated Successfully',
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  // End Method

  product_image_update = async (req, res) => {
    const { productId } = req.params;
    const { imageIndex } = req.body; // Get the index of the image to replace

    try {
      if (!req.file) {
        throw new Error('No file uploaded');
      }

      const newImage = req.file.filename;
      console.log(`Uploaded file name: ${newImage}`);

      const existingProduct = await productModel.findById(productId);
      if (!existingProduct) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      const oldImagePath = path.join(
        __dirname,
        '..',
        '../uploads',
        existingProduct.images[imageIndex] // Replace the specific image
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

      // Update the product with the new image
      existingProduct.images[imageIndex] = newImage; // Replace the specific image
      await existingProduct.save();

      responseReturn(res, 200, {
        product: existingProduct,
        message: 'Product Image Updated Successfully',
      });
    } catch (error) {
      console.error('Error in product_image_update:', error.message);
      responseReturn(res, 500, { error: error.message });
    }
  };

  // End Method

  delete_product = async (req, res) => {
    const { productId } = req.params;

    try {
      const product = await productModel.findById(productId);
      if (!product) {
        return responseReturn(res, 404, { message: 'Product not found' });
      }
      console.log(product);
      // Delete product images from the filesystem
      const deleteImagePromises = product.images.map(async (image) => {
        const imagePath = path.join(__dirname, '..', '../uploads', image);
        try {
          await fs.access(imagePath);
          await fs.unlink(imagePath);
          console.log(`Deleted image: ${imagePath}`);
        } catch (err) {
          console.error(`Failed to delete image: ${imagePath}`, err);
        }
      });
      await Promise.all(deleteImagePromises);

      // Delete the product from the database
      await productModel.findByIdAndDelete(productId);

      // Retrieve updated list of products
      const products = await productModel.find();
      responseReturn(res, 201, {
        message: 'Product removed successfully',
        products,
      });
    } catch (error) {
      console.error('Error in delete_product:', error.message);
      responseReturn(res, 500, { message: 'Failed to remove product' });
    }
  };
  // End Method
}

module.exports = new productController();

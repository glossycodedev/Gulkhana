const productController = require('../../controllers/dasboard/productController');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const router = require('express').Router();
const { upload } = require('../../utiles/multer');

router.post(
  '/product-add',
  authMiddleware,
  upload.array('images', 10),
  productController.add_product
);
router.get('/products-get', authMiddleware, productController.products_get);
router.get(
  '/discount-products-get',
  authMiddleware,
  productController.products_discount_get
);
router.get(
  '/product-get/:productId',
  authMiddleware,
  productController.product_get
);
router.post(
  '/product-update',
  authMiddleware,
  upload.array('images', 10),
  productController.product_update
);
router.post(
  '/product-image-update/:productId',
  authMiddleware,
  upload.single('image'),
  productController.product_image_update
);

router.post(
  '/delete-product/:productId',
  // authMiddleware,
  productController.delete_product
);

module.exports = router;

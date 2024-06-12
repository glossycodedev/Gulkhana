const sellerController = require('../../controllers/dasboard/sellerController');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const router = require('express').Router();
const { upload } = require('../../utiles/multer');

router.post(
  '/seller-register',
  upload.single('image'),
  sellerController.seller_register
);
router.get(
  '/request-seller-get',
  authMiddleware,
  sellerController.request_seller_get
);
router.get(
  '/get-seller/:sellerId',
  authMiddleware,
  sellerController.get_seller
);
router.post(
  '/seller-status-update',
  authMiddleware,
  sellerController.seller_status_update
);

router.get('/get-sellers', authMiddleware, sellerController.get_active_sellers);

router.get(
  '/get-deactive-sellers',
  authMiddleware,
  sellerController.get_deactive_sellers
);
router.post(
  '/seller-update/',
  authMiddleware,
  sellerController.seller_update
);

router.post(
  '/profile-image-upload/:sellerId',
  authMiddleware,
  upload.single('image'),
  sellerController.profile_image_upload
);

module.exports = router;

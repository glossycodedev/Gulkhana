const dashboardController = require('../../controllers/dasboard/dashboardController');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { upload } = require('../../utiles/multer');

const router = require('express').Router();

router.get(
  '/admin/get-dashboard-data',
  authMiddleware,
  dashboardController.get_admin_dashboard_data
);
router.get(
  '/seller/get-dashboard-data',
  authMiddleware,
  dashboardController.get_seller_dashboard_data
);

router.post(
  '/banner/add',
  authMiddleware,
  upload.single('image'),
  dashboardController.add_banner
);
router.get(
  '/banner/get/:productId',
  authMiddleware,
  dashboardController.get_banner
);
router.put(
  '/banner/update/:bannerId',
  authMiddleware,
  upload.single('image'),
  dashboardController.update_banner
);

router.get('/banners', dashboardController.get_banners);
router.delete('/banner/delete/:bannerId', dashboardController.delete_banner);

module.exports = router;

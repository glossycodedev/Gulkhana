const authControllers = require('../controllers/authControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = require('express').Router();
const { upload } = require('../utiles/multer');

router.post('/admin-login', authControllers.admin_login);
router.get('/get-user', authMiddleware, authControllers.getUser);
router.post(
  '/admin-register',
  authMiddleware,
  upload.single('image'),
  authControllers.admin_register
);
router.post('/seller-login', authControllers.seller_login);

router.post(
  '/profile-info-add',
  authMiddleware,
  authControllers.profile_info_add
);
router.get('/get-admin-users', authMiddleware, authControllers.get_admin_users);
router.delete(
  '/delete-admin-user/:userId',
  authMiddleware,
  authControllers.delete_admin_user
);
router.post('/admin-update', authMiddleware, authControllers.admin_update);
router.post(
  '/admin-image-upload/:userId',
  authMiddleware,
  upload.single('image'),
  authControllers.admin_image_upload
);
router.get('/logout', authMiddleware, authControllers.logout);

module.exports = router;

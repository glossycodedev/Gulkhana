const authControllers = require('../controllers/authControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = require('express').Router();
const { upload } = require('../utiles/multer');

router.post('/admin-login', authControllers.admin_login);
router.get('/get-user', authMiddleware, authControllers.getUser);

router.post('/seller-login', authControllers.seller_login);

router.post(
  '/profile-info-add',
  authMiddleware,
  authControllers.profile_info_add
);

router.get('/logout', authMiddleware, authControllers.logout);

module.exports = router;

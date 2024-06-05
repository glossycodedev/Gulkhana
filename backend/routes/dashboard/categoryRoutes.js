const categoryController = require('../../controllers/dasboard/categoryController');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { upload } = require('../../utiles/multer');

const router = require('express').Router();

router.post(
  '/category-add',
  authMiddleware,
  upload.single('image'),
  categoryController.add_category
);
// router.post('/category-add', authMiddleware, categoryController.add_category);
router.get('/category-get', authMiddleware, categoryController.get_category);
router.post(
  '/category-update',
  authMiddleware,
  upload.single('image'),
  categoryController.category_update
);
router.post(
  '/category-image-update',
  authMiddleware,
  categoryController.category_image_update
);

module.exports = router;

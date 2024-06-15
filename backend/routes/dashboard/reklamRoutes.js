const reklamController = require('../../controllers/dasboard/reklamController');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { upload } = require('../../utiles/multer');

const router = require('express').Router();

router.post(
  '/reklam-add',
  authMiddleware,
  upload.single('image'),
  reklamController.add_reklam
);

router.get('/reklam-get', reklamController.get_reklams);
// router.post(
//   '/category-update',
//   authMiddleware,
//   upload.single('image'),
//   categoryController.category_update
// );

module.exports = router;

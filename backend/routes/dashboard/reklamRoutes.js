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
router.post(
  '/reklam-update',
  authMiddleware,
  // upload.single('image'),
  reklamController.reklam_update
);

router.post(
  '/reklam-image-update/:reklamId',
  authMiddleware,
  upload.single('image'),
  reklamController.reklam_image_update
);

module.exports = router;

const homeControllers = require('../../controllers/home/homeControllers');
const router = require('express').Router();

router.get('/get-categorys', homeControllers.get_categorys);
router.get('/get-products', homeControllers.get_products);
router.get('/get-user-sellers', homeControllers.get_user_sellers);
router.get('/query-sellers', homeControllers.query_sellers);
router.get('/price-range-latest-product', homeControllers.price_range_product);
router.get('/query-products', homeControllers.query_products);
router.get(
  '/query-shop-products/:slugShop',
  homeControllers.query_shop_products
);
router.get('/product-details/:slug', homeControllers.product_details);

router.post('/customer/submit-review', homeControllers.submit_review);
router.get('/customer/get-reviews/:productId', homeControllers.get_reviews);
router.get('/banners', homeControllers.get_banners);

router.post('/submit-address', homeControllers.submit_address);
router.get('/address/:userId', homeControllers.get_address);
// router.post(
//   '/submit-address',
//   (req, res, next) => {
//     console.log('Submit address route hit');
//     next();
//   },
//   homeControllers.submit_address
// );

module.exports = router;

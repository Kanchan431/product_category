const { createCategory, getCategory, updateCategory } = require('../controllers/EcommController/CategoryController');
const { createProduct, updateProduct, getProducts, getProductByID, getProductsByCategory } = require('../controllers/EcommController/ProductController');

const { Router } = require('express');
const router = Router();

router.post('/createCategory', createCategory);
router.post('/updateCategory', updateCategory);
router.post('/getCategory', getCategory);

router.post('/createProduct', createProduct);
router.post('/updateProduct', updateProduct);
router.post('/getProducts', getProducts);

router.post('/getProductByID', getProductByID);
router.post('/getProductsByCategory', getProductsByCategory);

module.exports = router;

const { createCategory, getCategory,getCategoryByID, updateCategory, deleteCategory } = require('../controllers/EcommController/CategoryController');
const { index,users,pindex, createProduct, updateProduct, getProducts, getProductByID, getProductsByCategory, deleteProduct } = require('../controllers/EcommController/ProductController');

const { Router } = require('express');
const router = Router();

router.get('/', index);
router.post('/', pindex);
router.post('/users', users);
router.post('/createCategory', createCategory);
router.post('/updateCategory', updateCategory);
router.post('/getCategory', getCategory);
router.post('/deleteCategory', deleteCategory);

router.post('/createProduct', createProduct);
router.post('/updateProduct', updateProduct);
router.post('/getProducts', getProducts);
router.post('/deleteProduct', deleteProduct);

router.post('/getProductByID', getProductByID);
router.post('/getCategoryByID', getCategoryByID);
router.post('/getProductsByCategory', getProductsByCategory);

module.exports = router;

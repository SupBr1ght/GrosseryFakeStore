const express = require('express');
const router = express.Router();
const { addProduct, getProducts, addMultipleProducts, getProductById, updateProductById } = require('../controllers/productController');

// add good
router.post('/products', addProduct);
// add many goods
router.post('/products/bulk', addMultipleProducts);
// show goods
router.get('/products', getProducts );
// show unique good
router.get('/products/:id', getProductById);
// upodate our product
router.put('/products/:id', updateProductById);
module.exports = router;

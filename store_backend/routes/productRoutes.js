const express = require('express');
const router = express.Router();
const { addProduct } = require('../controllers/productController');
const { addMultipleProducts } = require('../controllers/productController');

// add good
router.post('/products', addProduct);
// add many goods
router.post('/products/bulk', addMultipleProducts);

module.exports = router;

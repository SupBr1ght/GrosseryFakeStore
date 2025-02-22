const express = require('express');
const router = express.Router();
const { addProduct } = require('../controllers/productController');

// Додати новий товар
router.post('/products', addProduct);

module.exports = router;

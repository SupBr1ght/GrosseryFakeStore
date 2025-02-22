const Product = require('../models/Product');

const createProduct = async (data) => {
    console.log("Дані, що йдуть у MongoDB:", data); // Логування
    const newProduct = new Product(data);
    return await newProduct.save();
};

module.exports = { createProduct };

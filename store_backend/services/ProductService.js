const Product = require('../models/Product');

const createProduct = async (product) => {
    console.log("product that send's to mongoDB:", product); // Логування
    const newProduct = new Product(product);
    await newProduct.save();

    console.log("✅ Збережений товар:", newProduct); // Лог після збережен
    
    return await Product.findById(newProduct._id)
        .select("-createdAt -updatedAt -__v")
        .lean(); // `lean()` змушує MongoDB повернути чистий JS-об'єкт

};

const createMultipleProducts = async (products) =>{
    console.log("Arrays of products into MongoDB", products);
    return await Product.insertMany(products, {rawResult: true})
}
module.exports = { createProduct, createMultipleProducts };


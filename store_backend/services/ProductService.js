const { default: mongoose } = require("mongoose");
const debug = require('debug')('app:service');
const Product = require("../models/Product");

const createProduct = async (product) => {
  debug('Creating product:', product)
  try {
    const newProduct = new Product(product);
    await newProduct.save();
    debug('Product created:', product)
  
    return await Product.findById(newProduct._id)
      .select("-createdAt -updatedAt -__v")
      .lean(); // `lean()` змушує MongoDB повернути чистий JS-об'єкт
    
  } catch (error) {
    debug('Failed to create  product:', error.message)
    throw error
  }

};

const createMultipleProducts = async (products) => {
  debug('Creating bulk of products:', products)
  try {
    return await Product.insertMany(products, { rawResult: true });
  } catch (error) {
    debug('Failed to create bulk of products:', error.message)
    throw error
  }
  
};

const getAllProducts = async () => {
  debug('Get all products:')
  try {
    return await Product.find({}).select("-__v").lean();
  } catch (error) {
    debug('Failed to get products:', error.message)
    throw error
  }
  
};

const getUniqueProductById = async (id) => {
  try {
      // Конвертуємо у ObjectId та зберігаємо у змінну
  const objectId = new mongoose.Types.ObjectId(id);
  debug('Getting unique product', id)
  // Шукаємо продукт у базі
  const product = await Product.findById(objectId).select("-__v").lean();
  debug('Unique product by id is', product)
  return product;
  } catch (error) {
    debug('Failed to get product by id:', error.message)
    throw error
  }
};

const updateUniqueProductById = async (id, new_data) => {
  try {
    debug('Updating product by id....', id)
    const updateObjectId = await Product.findByIdAndUpdate(id, new_data);
    debug('Update product by id was succsessful', updateObjectId)
    return updateObjectId;
  } catch (error) {
    debug('Failed to update product by id:', error.message)
    throw error
  }
 
};

const deleteUniqueProductById = async (id) => {
  try {
    debug('Deleting product by id....', id)
    const product = await Product.findByIdAndDelete(id);
    debug('DELETE product by id was succsesful', product)
    return product;  
  } catch (error) {
    debug('Failed to delete product by id:', error.message)
    throw error
  }
  
};

module.exports = {
  createProduct,
  createMultipleProducts,
  getAllProducts,
  getUniqueProductById,
  updateUniqueProductById,
  deleteUniqueProductById,
};

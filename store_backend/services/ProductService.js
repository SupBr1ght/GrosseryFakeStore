const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");

const createProduct = async (product) => {
  const newProduct = new Product(product);
  await newProduct.save();

  return await Product.findById(newProduct._id)
    .select("-createdAt -updatedAt -__v")
    .lean(); // `lean()` змушує MongoDB повернути чистий JS-об'єкт
};

const createMultipleProducts = async (products) => {
  return await Product.insertMany(products, { rawResult: true });
};

const getAllProducts = async () => {
  return await Product.find({}).select("-__v").lean();
};

const getUniqueProductById = async (id) => {
  // Конвертуємо у ObjectId та зберігаємо у змінну
  const objectId = new mongoose.Types.ObjectId(id);

  // Шукаємо продукт у базі
  const product = await Product.findById(objectId).select("-__v").lean();

  return product;
};

const updateUnquieProductById = async (id, new_data) => {
  const updateObjectId = await Product.findByIdAndUpdate(id, new_data);
  return updateObjectId;
};

const deleteUniqueProductById = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};

module.exports = {
  createProduct,
  createMultipleProducts,
  getAllProducts,
  getUniqueProductById,
  updateUnquieProductById,
  deleteUniqueProductById,
};

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
  // Перевіряємо, чи ID валідний
  if (!mongoose.isValidObjectId(id)) {
    // 🔥 Тут було `if (mongoose.isValidObjectId(id))`, виправлено!
    console.log("❌ Invalid ID format:", id);
    return null;
  }

  // Конвертуємо у ObjectId та зберігаємо у змінну
  const objectId = new mongoose.Types.ObjectId(id);

  // Шукаємо продукт у базі
  const product = await Product.findById(objectId).select("-__v").lean();

  return product;
};

const updateUnquieProductById = async (id, new_data) => {
  // Перевіряємо, чи ID валідний
  if (!mongoose.isValidObjectId(id)) {
    // 🔥 Тут було `if (mongoose.isValidObjectId(id))`, виправлено!
    console.log("❌ Invalid ID format:", id);
    return null;
  }

  // Update our object
  const updateObjectId = await Product.findByIdAndUpdate(id, new_data);

  if (!updateObjectId) {
    console.log("❌ Продукт не оновлено в базі!");
  } else {
    console.log("✅ Оновлено продукт:", updateObjectId);
  }

  return updateObjectId;
};

const deleteUniqueProductById = async (id) => {
  if(!mongoose.isValidObjectId(id)){
    console.log("Invvalid id format:", id);
    return null
  }

  const product = await Product.findByIdAndDelete(id);
  console.log("Product has deleted");
  return product
}

module.exports = {
  createProduct,
  createMultipleProducts,
  getAllProducts,
  getUniqueProductById,
  updateUnquieProductById,
  deleteUniqueProductById
};

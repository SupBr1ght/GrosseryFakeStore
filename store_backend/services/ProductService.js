const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");

const createProduct = async (product) => {
  console.log("product that send's to mongoDB:", product); // Логування
  const newProduct = new Product(product);
  await newProduct.save();

  console.log("✅ Збережений товар:", newProduct); // Лог після збережен

  return await Product.findById(newProduct._id)
    .select("-createdAt -updatedAt -__v")
    .lean(); // `lean()` змушує MongoDB повернути чистий JS-об'єкт
};

const createMultipleProducts = async (products) => {
  console.log("Arrays of products into MongoDB", products);
  return await Product.insertMany(products, { rawResult: true });
};

const getAllProducts = async () => {
  console.log("Running function");
  return await Product.find({}).select("-__v").lean();
};

const getUniqueProductById = async (id) => {
  console.log("🟢 Шукаємо товар за ID:", id);
  console.log("Тип ID:", typeof id);
  console.log("running method ");

  // Перевіряємо, чи ID валідний
  if (!mongoose.isValidObjectId(id)) {
    // 🔥 Тут було `if (mongoose.isValidObjectId(id))`, виправлено!
    console.log("❌ Invalid ID format:", id);
    return null;
  }

  // Конвертуємо у ObjectId та зберігаємо у змінну
  const objectId = new mongoose.Types.ObjectId(id);
  console.log("✅ Конвертований ObjectId:", objectId);

  // Шукаємо продукт у базі
  const product = await Product.findById(objectId).select("-__v").lean();

  if (!product) {
    console.log("❌ Продукт не знайдено в базі!");
  } else {
    console.log("✅ Знайдено продукт:", product);
  }

  return product;
};
module.exports = {
  createProduct,
  createMultipleProducts,
  getAllProducts,
  getUniqueProductById,
};

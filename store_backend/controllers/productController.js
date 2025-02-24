const Product = require("../models/Product");
const {
  createProduct,
  createMultipleProducts,
  getAllProducts,
  getUniqueProductById,
  updateUnquieProductById,
} = require("../services/ProductService");

const addProduct = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body) === 0) {
      return res
        .status(400)
        .json({ message: "Request of body can't be empty!" });
    }
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: " server error" });
  }
};

const addMultipleProducts = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body) === 0) {
      return res
        .status(400)
        .json({ message: "Request of body can't be empty!" });
    } // create new function that checks if request body is empty
    if (Array.isArray(req.body)) {
      const newBulkOfProducts = await createMultipleProducts(req.body);
      res.status(201).json(req.body);
    }
  } catch (error) {
    res.status(500).json({ message: " server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const listProducts = await getAllProducts();
    res.status(200).json(listProducts);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const uniqueProduct = await getUniqueProductById(req.params.id);
    if (!uniqueProduct) {
      console.log("Product is undefinned");
    }
    res.status(200).json(uniqueProduct);
  } catch (error) {
    res.status(404).json({ message: "Product not found!" });
  }
};

const updateProductById = async (req, res) => {
  try {
    const updateUnquieProduct = await updateUnquieProductById(
      req.params.id,
      req.body
    );
    res.status(200).json(updateUnquieProduct);
  } catch (error) {
    res.status(500).json({ message: "Server's error" });
  }
};

module.exports = {
  addProduct,
  addMultipleProducts,
  getProducts,
  getProductById,
  updateProductById,
};

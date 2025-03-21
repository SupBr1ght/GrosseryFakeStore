const debug = require('debug')('app:controller');
const {
  createProduct,
  createMultipleProducts,
  getAllProducts,
  getUniqueProductById,
  updateUniqueProductById,
  deleteUniqueProductById,
} = require("../services/ProductService");

const addProduct = async (req, res) => {
  debug('POST /products triggered');
  try {
    if (!req.body || Object.keys(req.body) === 0) {
      return res
        .status(400)
        .json({ message: "Request of body can't be empty!" });
    }
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    debug('Error in GET /products triggered');
    res.status(500).json({ message: " server error" });
    throw error
  }
};

const addMultipleProducts = async (req, res) => {
  debug('POST /products/bulk triggered');
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
    debug('Error in POST /products/bulk triggered');
    res.status(500).json({ message: " server error" });
    throw error
  }
};

const getProducts = async (req, res) => {
  debug('GET /products triggered');
  try {
    const listProducts = await getAllProducts();
    res.status(200).json(listProducts);
  } catch (error) {
    debug('Error in GET /products triggered');
    res.status(500).json({ message: "server error" });
    throw error
  }
};

const getProductById = async (req, res) => {
  debug('GET /products/:id triggered');
  try {
    const uniqueProduct = await getUniqueProductById(req.params.id);
    if (!uniqueProduct) {
      console.log("Product is undefinned");
    }
    res.status(200).json(uniqueProduct);
  } catch (error) {
    debug('Error in GET /products/:id triggered');
    res.status(404).json({ message: "Product not found!" });
    throw error
  }
};

const updateProductById = async (req, res) => {
  debug('PUT /products/:id triggered');
  try {
    const updateUnquieProduct = await updateUniqueProductById(
      req.params.id,
      req.body
    );
    res.status(200).json(updateUnquieProduct);
  } catch (error) {
    debug('Error in PUT /products/:id triggered');
    res.status(500).json({ message: "Server's error" });
    throw error
  }
};

const deleteProductById = async (req, res) => {
  debug('DELETE /products/:id triggered');
  try {
    const deletedUniqueProduct = await deleteUniqueProductById(req.params.id);
    res.status(200).json(deletedUniqueProduct);
  } catch (error) {
    res.status(500).json({ message: "Server's error" });
    debug('Error in DELETE /products/:id triggered');
    throw error
  }
};

module.exports = {
  addProduct,
  addMultipleProducts,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById
};

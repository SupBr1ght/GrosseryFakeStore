const Product = require("../models/Product");
const {
  createProduct,
  createMultipleProducts,
  getAllProducts,
  getUniqueProductById
} = require("../services/ProductService");

const addProduct = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body) === 0) {
      return res
        .status(400)
        .json({ message: "Request of body can't be empty!" });
    } // create new function that checks if request body is empty
    console.log("Got data:", req.body);
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error when add product:", error); // Лог детальної помилки
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
      console.log("Got data:", req.body);
      const newBulkOfProducts = await createMultipleProducts(req.body);
      res.status(201).json(req.body);
    }
  } catch (error) {
    console.error("❌ Error when add products:", error); // Лог детальної помилки
    res.status(500).json({ message: " server error" });
  }
};

const getProducts = async (req, res) => {
  try {
      const listProducts = await getAllProducts();
      console.log("🟢 Відправляємо товари:", listProducts);
      res.status(200).json(listProducts);
  } catch (error) {
    console.log("Error when displaying list of goods");
    res.status(500).json({ message: "server error" });
    console.log("🟢 Викликаємо res.json()...");
  }
};

const getProductById = async (req, res)  => {
  try {

    console.log("🟢 Отримали ID з запиту:", req.params.id);

    const uniqueProduct = await getUniqueProductById(req.params.id)
    if(!uniqueProduct){
      console.log("Product is undefinned");
    }
    res.status(200).json(uniqueProduct);
    
  } catch (error) {
    console.log("For some reason we can't display our product!");
    res.status(404).json({message: "Product not found!"})
    console.log("Running res.json().....");
  }
}

module.exports = { addProduct, addMultipleProducts, getProducts, getProductById };

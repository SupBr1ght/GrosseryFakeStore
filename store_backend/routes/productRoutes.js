const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  addMultipleProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController");

// add good
router.post("/api/products", addProduct);
// add many goods
router.post("/api/products/bulk", addMultipleProducts);
// show goods
router.get("/api/products", getProducts);
// show unique good
router.get("/api/products/:id", getProductById);
// upodate our product
router.put("/api/products/:id", updateProductById);
// delete a product
router.delete("/api/products/:id", deleteProductById);
module.exports = router;

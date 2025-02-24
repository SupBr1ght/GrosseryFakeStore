const mongoose = require("mongoose");

const productSсhema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  discount: { type: Number, default: 1 },
}, {versionKey: false});

const Product = mongoose.model("Product", productSсhema);
module.exports = mongoose.model('Product', productSсhema)
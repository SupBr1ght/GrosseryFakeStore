const { createProduct } = require('../services/Product.service')

const addProduct = async (req, res) =>{
    try {
        console.log("Отримані дані:", req.body);    
        const newProduct = await createProduct(req.body); 
        res.status(201).json(newProduct);
    } catch(error){
        console.error("❌ Помилка у створенні продукту:", error); // Лог детальної помилки
        res.status(500).json({message: ' server error'})
    }
};

module.exports = { addProduct };
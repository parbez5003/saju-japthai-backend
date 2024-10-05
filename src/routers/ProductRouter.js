const express = require('express');
const productRouter = express.Router();
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getProductsByCategory, getProductsByBrand } = require("../controllers/ProductController");
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

// Add New Product
productRouter.post('/products', verifyToken, verifyAdmin, addProduct);

// Get All Products
productRouter.get('/products', getAllProducts);

// Get a product
productRouter.get('/products/:id', getProductById);

// Update Product Details
productRouter.put('/products/:id', verifyToken , updateProduct);

// Delete Product
productRouter.delete('/products/:id', verifyToken, verifyAdmin, deleteProduct);



module.exports = productRouter;

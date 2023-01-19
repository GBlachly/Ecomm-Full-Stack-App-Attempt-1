const express = require('express');
const productsRouter = express.Router();

const {
    getAllProducts,
    getProductByName,
    getProductById,
    createProduct, 
    updateProduct,
    deleteProduct
} = require('../models/productsModel');

const checkAdmin = require('../passportStrats/checkAdmin');


// USER ROUTES
/* get all products (authentication of user not needed) */
productsRouter.get('/', getAllProducts);


/* get product by name (authentication of user not needed) */
productsRouter.get('/name/:productName', getProductByName);


/* get product by id (authentication of user not needed) */
productsRouter.get('/id/:productId', getProductById);



// ADMIN ROUTES
/* create new product (admin only) */
productsRouter.post('/', checkAdmin, createProduct);

/* update product (stock should update when product is added to an order/ otherwise admin only) */
productsRouter.put('/id/:productId', checkAdmin, updateProduct);

/* delete product by Id (admin only) */
productsRouter.delete('/id/:productId', checkAdmin, deleteProduct);


module.exports = productsRouter;
const express = require('express');
const cartsRouter = express.Router();

const {
    getCartByUserId, 
    createCart,
    addItemToCart,
    deleteItemFromCart,
    updateCartItemQuantity,
    deleteCart,
    checkout
} = require('../models/cartsModel');


// ROUTES
/* get users cart by user id (possibly happens upon login) */
cartsRouter.get('/', getCartByUserId);


/* create users cart (created when a user places an item into the shopping cart, must also add item to cart) */
cartsRouter.post('/', createCart);


/* update user cart (many different routes here depending on the different ways cart can be updated) */
cartsRouter.post('/addItem', addItemToCart);
cartsRouter.put('/deleteItem', deleteItemFromCart);
cartsRouter.put('/updateQuantity', updateCartItemQuantity);


/* delete user cart (empty cart button) */
cartsRouter.delete('/', deleteCart);



// CHECKOUT ROUTE
/* (take info from cart and carts_products, add to orders, delete from carts and carts_products)
(needs cart info, user info, payment info) */
cartsRouter.post('/checkout', checkout);


module.exports = cartsRouter;
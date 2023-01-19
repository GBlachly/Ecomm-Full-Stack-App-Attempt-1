const express = require('express');
const ordersRouter = express.Router();

const {
    getOrdersByUserId,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder
} = require('../models/ordersModel');

const checkAdmin = require('../passportStrats/checkAdmin');


// USER ROUTES
/* get all orders for authenticated user */
ordersRouter.get('/', getOrdersByUserId);

/* create new order (should come from what is in the user's cart/ users cart should be emptied once order is placed) */
ordersRouter.post('/', createOrder);



// ADMIN ROUTES
/* get order by order Id (admin only, to look up orders) */
ordersRouter.get('/:orderId', checkAdmin, getOrderById);

/* update order (admin only, maybe allow user to update shipping address or something like that) */
ordersRouter.put('/:orderId', checkAdmin, updateOrder);

/* delete order (admin only) */
ordersRouter.delete('/:orderId', checkAdmin, deleteOrder);


module.exports = ordersRouter;
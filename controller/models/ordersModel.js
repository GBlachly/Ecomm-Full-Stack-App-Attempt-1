const db = require('../db/db');


const getOrdersByUserId = async (req, res, next) => {
    //const { userId } = req.body;
    const { id } = req.user;

    try {
        const ordersResult = await db.queryNoCB(`SELECT * FROM orders WHERE user_id = $1;`, [id]);
        
        const userOrders = [];
        
        for (let i=0; i < ordersResult.length; i++) {
            const statement = `SELECT * 
                        FROM orders 
                        JOIN orders_products
                        ON orders.id = orders_products.order_id
                        WHERE orders.id = $1;`;

            const itemsResult = await db.queryNoCB(statement, [ordersResult.rows[i].id]);
                
            let products = [];
            itemsResult.rows.forEach(row => products.push({
                productId: row.product_id, 
                productName: row.product_name,
                quantity: row.quantity})
            );

            let orderObject = {
                orderId: ordersResult.rows[i].id,
                userId: ordersResult.rows[i].user_id,
                totalPrice: ordersResult.rows[i].total_price,
                shipStatus: ordersResult.rows[i].ship_status,
                products: products
            };

            userOrders.push(orderObject);
        };
        
        
        res.status(200).json({ userOrders: userOrders });
        
    } catch(err) {
        next(err);
    };
};


const createOrder = async (req, res, next) => {
    //const { userId } = req.body;
    const { id } = req.user;

    const { totalPrice, products /*, paymentInfo*/ } = req.body;
    
    try {
        const statement1 = `INSERT INTO orders (user_id, total_price) 
                            VALUES ($1, $2) 
                            RETURNING *`;
        const result = await db.queryNoCB(statement1, [id, totalPrice/*, paymentInfo*/]);
        const orderId = result.rows[0].id;
        
        /* HERE WE WANT TO ADD THE PRODUCTS AND THEIR QUANTITIES TO THE orders_products/ordered_items TABLE USING THE RETURNED orderID */
        const statement2 = `INSERT INTO orders_products (order_id, product_id, product_name, quantity) 
                            VALUES ($1, $2, $3, $4)`;
        products.forEach((product) => {
           db.queryNoCB(statement2, [orderId, product.productId, product.productName, product.quantity]);
        }); 

        res.status(201).send(`Order ID is ${orderId}`);

    } catch(err) {
        return next(err)
    }  
};


//(admin only)
const getOrderById = (req, res, next) => {
    const orderId = Number(req.params.orderId);

    const statement = `SELECT * 
                        FROM orders 
                        JOIN orders_products
                        ON orders.id = orders_products.order_id
                        WHERE orders.id = $1;`;

    db.query(statement,
        [orderId],
        (err, result) => {
            if (err) {
                return next(err);
            };

            const products = [];
            result.rows.forEach(row => products.push({
                productId: row.product_id, 
                productName: row.product_name,
                quantity: row.quantity})
            );

            const orderObject = {
                orderId: result.rows[0].id,
                userId: result.rows[0].user_id,
                totalPrice: result.rows[0].totalPrice,
                shipStatus: result.rows[0].ship_status,
                products: products
            };

            res.status(200).json(orderObject);
        }
    );
};


//(admin only)
const updateOrder = (req, res, next) => {
    const orderId = Number(req.params.orderId);
    const { shipStatus } = req.body;

    db.query(`ALTER TABLE orders SET ship_status = $2 WHERE id = $1;`, 
            [orderId, shipStatus], 
            (err, result) => {
                if (err) {
                    return next(err)
                }
                res.status(200).send(`Order with ID: ${orderId} was updated`)
            }
    );
};


//(admin only)
const deleteOrder = (req, res, next) => {
    const orderId = Number(req.params.orderId);

    db.query('DELETE FROM orders WHERE id = $1;', [orderId], (err, result) => {
        if (err) {
            return next(err)
        }
    }); 

    db.query('DELETE FROM orders_products WHERE order_id = $1;', [orderId], (err, result) => {
        if (err) {
            return next(err)
        }
        res.status(200).send(`Order with ID: ${orderId} was deleted`)
    }); 
};


module.exports = {
    getOrdersByUserId,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder
};
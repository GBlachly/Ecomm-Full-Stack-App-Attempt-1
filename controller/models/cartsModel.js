const db = require('../db/db');


const getCartByUserId = (req, res, next) => {
    //const { userId } = req.body;
    const { id } = req.user;

    const statement = `SELECT * 
                        FROM carts 
                        JOIN carts_products
                        ON carts.id = carts_products.cart_id
                        WHERE carts.user_id = $1;`;

    db.query(statement,
            [id],
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

                const cartObject = {
                    cartId: result.rows[0].id,
                    userId: result.rows[0].user_id,
                    totalPrice: result.rows[0].totalPrice,
                    products: products
                };

                res.status(200).json(cartObject);
            }
    );
};


const createCart= async (req, res, next) => {
    //const { userId } = req.body;
    const { id } = req.user;
    
    const {totalPrice, products} = req.body;
    //products = array of product objects with { productId, productName, quantity }

    try {
        const statement1 = `INSERT INTO carts (user_id, total_price)
                            VALUES ($1, $2)
                            RETURNING *;`;
        const result = await db.queryNoCB(statement1, [id, totalPrice]);
        const cartId = result.rows[0].id;

        const statement2 = `INSERT INTO carts_products (cart_id, product_id, product_name, quantity)
                            VALUES ($1, $2, $3, $4);`;
        products.forEach((product) => {
            db.query(statement2, [cartId, product.productId, product.productName, product.quantity])
        });

        res.status(200).send(`Cart with ID: ${cartId} created`)

    } catch(err) {
        return next(err);
    };
};


const addItemToCart = async (req, res, next) => {
    //const { userId } = req.body;
    const { id } = req.user;

    const { productId, productName, quantity } = req.body;

    try {
        const result = await db.queryNoCB('SELECT * FROM carts WHERE user_id = $1;', [id]);
        const cartId = result.rows[0].id;

        const statement = `INSERT INTO carts_products (cart_id, product_id, product_name, quantity)
                            VALUES ($1, $2, $3, $4);`;
        db.query(statement, [cartId, productId, productName, quantity]);

        res.status(200).send(`Item: ${productId} added to cart ${cartId}`);

    } catch(err) {
        return next(err);
    };
};


const deleteItemFromCart = async (req, res, next) => {
    //const { userId } = req.body;
    const { id } = req.user;

    const { productId } = req.body;

    try {
        const result = await db.queryNoCB('SELECT * FROM carts WHERE user_id = $1;', [id]);
        const cartId = result.rows[0].id;

        const statement = 'DELETE FROM carts_products WHERE cart_id = $1 AND product_id = $2;';
        db.queryNoCB(statement, [cartId, productId]);

        res.status(200).send(`Item: ${productId} added to cart ${cartId}`);

    } catch(err) {
        return next(err);
    };
};


const updateCartItemQuantity = async (req, res, next) => {
    //const { userId } = req.body;
    const { id } = req.user;

    const { productId, quantity } = req.body;

    try {
        const result = await db.queryNoCB('SELECT * FROM carts WHERE user_id = $1;', [id]);
        const cartId = result.rows[0].id;

        const statement = `ALTER TABLE carts_products 
                            SET quantity = $3
                            WHERE cart_id = $1 AND productId = $2;`;
        db.queryNoCB(statement, [cartId, productId, quantity]);

        res.status(200).send(`Quantity of Item: ${productId} has been updated to ${quantity}`);

    } catch(err) {
        return next(err);
    };
};


const deleteCart = async (req, res, next) => {
    //const { userId } = req.body;
    const { id } = req.user;

    try {
        //PostgreSQL allows you to return deleted information from a delete statement (other sql may not)
        const statement1 = `DELETE FROM carts
                            WHERE user_id = $1
                            RETURNING *;`;
        const result = await db.queryNoCB(statement1, [id]);
        const deletedCartId = result.rows[0].id;

        const statement2 = `DELETE FROM carts_products
                            WHERE cart_id = $1;`;
        db.queryNoCB(statement2, [deletedCartId]);

        res.status(200).send(`Cart with ID: ${deletedCartId} was deleted`);

    } catch(err) {
        return next(err);
    };
};


/* this route may need to also alter stock of products eventually */
const checkout = async (req, res, next) => {
    //const { userId } = req.body;
    const { id } = req.user;
    
    /*const {
        firstName,
        lastName,
        cardNumber,
        expirationDate,
        securityCode,
    } = req.body.paymentInfo; */

    try {

        const result1 = await db.queryNoCB('SELECT * FROM carts WHERE user_id = $1;', [id]);
        const cartId = result1.rows[0].id;
        const totalPrice = result1.rows[0].total_price;


        const statement2 = `SELECT * FROM carts_products WHERE cart_id = $1;`;
        const result2 = await db.queryNoCB(statement2, [cartId]);


        const products = [];
        result2.rows.forEach((row) => {
            let product = {
                productId: row.product_id,
                productName: row.product_name,
                quantity: row.quantity
            };
            products.push(product);
        });

        
        const statement3 = `INSERT INTO orders (user_id, total_price)
                            VALUES ($1, $2)
                            RETURNING *;`;
        const result3 = await db.queryNoCB(statement3, [id, totalPrice/*, paymentInfo */]);
        const orderId = result3.rows[0].id;


        const statement4 = `INSERT INTO orders_products (order_id, product_id, product_name, quantity)
                            VALUES ($1, $2, $3, $4);`;
        products.forEach((product) => {
            db.queryNoCB(statement4, [orderId, product.productId, product.productName, product.quantity]);
        });


        res.status(200).send(`Payment received and order: ${orderId} created`);


        db.queryNoCB('DELETE FROM carts_products WHERE cart_id = $1;', [cartId]);
        db.queryNoCB('DELETE FROM carts WHERE id = $1;', [cartId]);
        
    } catch(err) {
        return next(err);
    };
};


module.exports = {
    getCartByUserId,
    createCart,
    addItemToCart,
    deleteItemFromCart,
    updateCartItemQuantity,
    deleteCart,
    checkout
};

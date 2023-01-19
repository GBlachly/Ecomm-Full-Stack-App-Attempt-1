const db = require('../db/db');


const getAllProducts = (req, res, next) => {
    db.query('SELECT * FROM products;', [], (err, result) => {
        if (err) {
            return next(err)
        }
        res.status(200).json({ products: result.rows });
    });
};


const getProductByName = (req, res, next) => {
    const productName = req.params.productName;
    
    db.query(`SELECT * FROM products WHERE name LIKE '%$1%';`, [productName], (err, result) => {
        if (err) {
            return next(err)
        }
        res.status(200).json({ products: result.rows });
    });
};


const getProductById = (req, res, next) => {
    const productId = Number(req.params.productName);
    
    db.query(`SELECT * FROM products WHERE id = $1;`, [productId], (err, result) => {
        if (err) {
            return next(err)
        }
        res.status(200).json({ products: result.rows[0] });
    });
};


// (admin only)
const createProduct = (req, res, next) => {
    const { name, price, stock } = req.body;

    db.query('INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *;', [name, price, stock], (err, result) => {
        if (err) {
            return next(err)
        }
        res.status(201).send(`Product created with ID: ${result.rows[0].id}`)
    });
};


// (admin only)
const updateProduct = (req, res, next) => {
    const productId = Number(req.params.productId);
    const { name, price, stock } = req.body;

    db.query('ALTER TABLE products SET name = $2, price = $3, stock = $4 WHERE id = $1;', [productId, name, price, stock], (err, result) => {
        if (err) {
            return next(err)
        }
        res.status(200).send(`Product with ID: ${productId} was updated`)
    });
};


// (admin only)
const deleteProduct = (req, res, next) => {
    const productId = Number(req.params.productId);

    db.query('DELETE FROM products WHERE id = $1;', [productId], (err, result) => {
        if (err) {
            return next(err)
        }
        res.status(200).send(`Product with ID: ${productId} was deleted`)
    });
};


module.exports = {
    getAllProducts,
    getProductByName,
    getProductById,
    createProduct, 
    updateProduct,
    deleteProduct
};
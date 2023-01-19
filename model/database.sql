--Table Definitions

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    email VARCHAR(50) UNIQUE,
    admin BOOL DEFAULT FALSE
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    price MONEY NOT NULL,
    stock INTEGER NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    total_price MONEY,
    ship_status BOOLEAN DEFAULT FALSE
    --payment_complete BOOLEAN DEFAULT FALSE
    --add payment info 
);

CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) UNIQUE,
    total_price MONEY
);

CREATE TABLE orders_products (
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id),
    product_name TEXT REFERENCES products(name),
    quantity INTEGER,
    PRIMARY KEY (order_id, product_id)
);

CREATE TABLE carts_products (
    cart_id INT REFERENCES carts(id),
    product_id INT REFERENCES products(id),
    product_name TEXT REFERENCES products(name),
    quantity INTEGER NOT NULL,
    PRIMARY KEY (cart_id, product_id)
);


/*Ordered Items Table (instead of orders_products Table maybe)
CREATE TABLE ordered_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id),
    quantity INT,
    price MONEY
); */

/* OAuth2 Server Tables
CREATE TABLE confidential_clients (
    id SERIAL PRIMARY KEY,
    client_id TEXT UNIQUE,
    client_secret TEXT UNIQUE,
    client_credentials_grant BOOL DEFAULT FALSE,
    authorization_code_grant BOOL DEFAULT FALSE
);

CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    token TEXT,
    client_id REFERENCES confidential_clients(client_id)
); */


--Example Inserts
INSERT INTO users (username, password, email, admin)
VALUES ();

INSERT INTO products(name, price, stock)
VALUES ();

INSERT INTO orders(user_id, total_price, ship_status)
VALUES ();

INSERT INTO carts(user_id, total_price)
VALUES ();

INSERT INTO orders_products(order_id, product_id, quantity)
VALUES ();

INSERT INTO carts_products(cart_id, product_id, product_name, quantity)
VALUES ();

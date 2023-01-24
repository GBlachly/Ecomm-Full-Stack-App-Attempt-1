const prodRoot = 'http://localhost:4001/products/';
const userRoot = 'http://localhost:4001/users/';
const orderRoot = 'http://localhost:4001/orders/';
const cartRoot = 'http://localhost:4001/carts/';

//PRODUCTS
const fetchAllProducts = async () => {
    try {
        const response = await fetch(`${prodRoot}`);
        const json = await response.json();
        console.log(json);

        return json.products;

    } catch(err) {
        console.log(err);
    };
};

const fetchProductsByName = async (name) => {
    try {
        const response = await fetch(`${prodRoot}name/${name}`);
        const json = await response.json();
        console.log(json);

        return json.products;

    } catch(err) {
        console.log(err);
    };
};

const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${prodRoot}id/${id}`);
        const json = await response.json();
        console.log(json);

        //products/id API route (used here) returns one product object
        //the above products/ and products/name routes return arrays of product objects
        //to be consistent, push the singular object returned by this route into an empty array 
        let products = [];
        products.push(json.product);
        return products;

    } catch(err) {
        console.log(err);
    };
};


//ACCOUNTS
//logins and also fetches user information 
const fetchLoginUser = async (username, password) => {
    try {
        const response = await fetch(`${userRoot}login`, {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        console.log(json);

        return json;

    } catch(err) {
        console.log(err);
    };
};

const fetchUserInfo = async () => {
    try {
        const response = await fetch(`${userRoot}`) ;
        const json = response.json();
        console.log(json);

        return json.userInfo;

    } catch(err) {
        console.log(err);
    };
};

const fetchLogoutUser = async () => {
    try {
        const response = await fetch(`${userRoot}logout`);
        const json = await response.json();
        console.log(json);

        return json;

    } catch(err) {
        console.log(err);
    };
};

const fetchRegisterUser = async (username, password, email, admin=false) => {
    try {
        const response = await fetch(`${userRoot}register`, {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
                email,
                admin
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        console.log(json);

        return json;

    } catch(err) {
        console.log(err);
    };
};

const fetchUserOrders = async () => {
    try {
        const response = await fetch(`${orderRoot}`);
        const json = await response.json();
        console.log(json);

        return json.userOrders;

    } catch(err) {
        console.log(err);
    };
};
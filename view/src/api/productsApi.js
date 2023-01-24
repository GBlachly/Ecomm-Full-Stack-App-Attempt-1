const root = 'http://localhost:4001/products/';

const fetchAllProducts = async () => {
    try {
        const response = await fetch(`${root}`);
        const json = await response.json();
        return json.products;
    } catch(err) {
        console.log(err);
    };
};


const fetchProductsByName = async (name) => {
    try {
        const response = await fetch(`${root}name/${name}`);
        const json = await response.json();
        return json.products;
    } catch(err) {
        console.log(err);
    };
};


const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${root}id/${id}`);
        const json = await response.json();
        
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
import React, { useState, useEffect } from 'react';

export const Products = () => {
    const [ products, setProducts ] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:4001/products/`)
        .then(response => response.json())
        .then(json => setProducts(json.products) )
        .catch(err => console.log(err))
    }, [setProducts]);

    return (
        <div className=''>
            <h1>Products Container</h1>
            {products.map(product => {
                return (
                    <h2>{product.name}</h2>
                )
            })}
        </div>
    );
};
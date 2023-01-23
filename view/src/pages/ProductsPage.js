import React from 'react';
import { Products } from '../containers/products/Products';
import { Cart } from '../containers/cart/Cart';

export const ProductsPage = () => {
    
    return (
        <div className='row'>

            <div className='col-10 border'> 
                <Products />
            </div>

            <div className='col-2 border'> 
                <Cart />
            </div>

        </div>
    );
};
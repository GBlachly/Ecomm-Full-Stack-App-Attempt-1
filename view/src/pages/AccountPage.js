import React from 'react';
import { User } from '../containers/user/User';
import { Orders } from '../containers/orders/Orders';
import { Cart } from '../containers/cart/Cart';


export const AccountPage = () => {
    
    return (
        <div className='row'>
            
            <div className='col-5 border'>
                <User />
            </div>

            <div className='col-5 border'>
                <Orders />
            </div>
            
            <div className='col-2 border'>
                <Cart />
            </div> 
        
        </div>
    );
};
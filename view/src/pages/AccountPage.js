import React from 'react';
import { User } from '../containers/user/User';
import { Orders } from '../containers/orders/Orders';
import { Cart } from '../containers/cart/Cart';


export const AccountPage = () => {
    
    return (
        <div className='row'>
            <div className='col-10'>
                
                <div className='row'>
                    <div className='col-12'>
                        <User />
                    </div>
                </div>
                
                <div className='row'>
                    <div className='col-12'>
                        <Orders />
                    </div>
                </div>

            </div>
            
            <div className='col-2'>
                <Cart />
            </div> 
        
        </div>
    );
};
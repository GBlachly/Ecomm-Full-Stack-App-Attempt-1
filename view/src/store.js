import { configureStore, combineReducers } from '@reduxjs/toolkit';

import productsReducer from './containers/products/productsSlice';
import userReducer from './containers/user/userSlice';
import ordersReducer from './containers/orders/ordersSlice';
import cartReducer from './containers/cart/cartSlice';

export default configureStore({
    reducer: combineReducers({
        products: productsReducer,
        user: userReducer,
        orders: ordersReducer,
        cart: cartReducer,
    })
});
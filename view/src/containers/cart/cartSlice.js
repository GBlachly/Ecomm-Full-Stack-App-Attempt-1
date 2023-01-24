import { createSlice } from '@reduxjs/toolkit';

//ASYNC ACTION CREATORS


//SLICE CREATOR
const options = {
    name: 'cart',
    initialState: {
        cart: {},
        isLoading: true,
        hasError: false
    },
    reducers: {},
    extraReducers: {}
};

const cartSlice = createSlice(options);


//EXPORTED SELECTORS/REDUCER


export default cartSlice.reducer;
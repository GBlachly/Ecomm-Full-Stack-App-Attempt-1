import { createSlice } from '@reduxjs/toolkit';

//ASYNC ACTION CREATORS


//SLICE CREATOR
const options = {
    name: 'orders',
    initialState: {
        orders: [],
        isLoading: true,
        hasError: false
    },
    reducers: {},
    extraReducers: {}
};

const ordersSlice = createSlice(options);


//EXPORTED SELECTORS/REDUCER


export default ordersSlice.reducer;
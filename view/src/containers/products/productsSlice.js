import { createSlice } from '@reduxjs/toolkit';

//ASYNC ACTION CREATORS


//SLICE CREATOR
const options = {
    name: 'products',
    initialState: {
        products: [],
        isLoading: true,
        hasError: false
    },
    reducers: {},
    extraReducers: {}
};

const productsSlice = createSlice(options);


//EXPORTED SELECTORS/REDUCER


export default productsSlice.reducer;
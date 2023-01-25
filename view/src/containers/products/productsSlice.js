import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchAllProducts } from '../../util/api';

//ASYNC ACTION CREATORS
export const getAllProducts = createAsyncThunk(
    'products/getAllProducts',
    async () => {
        const response = await fetchAllProducts();
        return response;
    }
);


//SLICE CREATOR
const options = {
    name: 'products',
    initialState: {
        products: [],
        isLoading: true,
        hasError: false
    },
    reducers: {},
    extraReducers: {
        [getAllProducts.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },
        [getAllProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
    }
};

const productsSlice = createSlice(options);


//EXPORTED SELECTORS/REDUCER
export const selectProducts = (state) => state.products.products;

export default productsSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

//ASYNC ACTION CREATORS


//SLICE CREATOR
const options = {
    name: 'user',
    initialState: {
        user: {},
        isLoading: true,
        hasError: false
    },
    reducers: {},
    extraReducers: {}
};

const userSlice = createSlice(options);


//EXPORTED SELECTORS/REDUCER


export default userSlice.reducer;
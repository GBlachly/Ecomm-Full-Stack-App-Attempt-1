import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchLoginUser, fetchUserInfo } from '../../util/api';

//ASYNC ACTION CREATORS
/* export const loginUser = (username, password) => async (dispatch) => {
    try{
        
        dispatch(startLoginUser());
        const response1 = await fetchLoginUser(username, password);
        if (response1) {
            const response2 = await fetchUserInfo();
            dispatch(loginUserSuccess(response2));
        };
        
    } catch(error) {
        dispatch(loginUserFailed())
    };
}; */

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async () => {
        const response = await fetchUserInfo();
        return response;
    }
);


//SLICE CREATOR
const options = {
    name: 'user',
    initialState: {
        user: {},
        isLoading: true,
        hasError: false
    },
    reducers: {
        /*startLoginUser(state, action) {
            state.isLoading  = true;
            state.hasError = false;
        },
        loginUserSuccess(state, action) {
            state.user = action.payload;
            state.isLoading  = false;
            state.hasError = false;
        },
        loginUserFailed(state, action) {
            state.isLoading  = false;
            state.hasError = true;
        }, */
    },
    extraReducers: {
        [getUserInfo.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [getUserInfo.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },
        [getUserInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
    }
};

const userSlice = createSlice(options);


//EXPORTED SELECTORS/REDUCER/ACTIONS
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;

//export const { startLoginUser, loginUserSuccess, loginUserFailed} = userSlice.actions;
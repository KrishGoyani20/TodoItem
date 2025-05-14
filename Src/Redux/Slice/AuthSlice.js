import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userDetails: null,
    loginUser: null, 
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.userDetails = action.payload;
        },
        clearUser: (state) => {
            state.userDetails = null;
        },
        UserLogIn: (state, action) => {
            state.loginUser = action.payload; 
        },
        UserLogOut: (state) => {
            state.loginUser = null;
        },
    },
});

export const { createUser, clearUser, UserLogIn, UserLogOut } = authSlice.actions;
export default authSlice.reducer;
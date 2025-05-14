// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../Slice/DataSlice';
import authReducer from '../Slice/AuthSlice';

export const store = configureStore({
    reducer: {
        data: dataReducer,
        auth: authReducer,
    },
});

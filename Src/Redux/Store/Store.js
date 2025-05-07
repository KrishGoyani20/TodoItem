// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../Slice/DataSlice';

export const store = configureStore({
    reducer: {
        data: dataReducer,
    },
});

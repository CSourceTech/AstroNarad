import { configureStore, createReducer } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import dobReducer from './dobSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    dob: dobReducer,
  },
});

export default store;

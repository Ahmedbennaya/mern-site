// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './features/authSlice';
import storesReducer from './storesSlice';
import cartReducer from './features/cartSlice';
import productsReducer from './features/productsSlice';
import filterReducer from './features/filterSlice';
import orderReducer from './features/orderSlice';
import contactReducer from './features/contactSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    stores: storesReducer,
    cart: cartReducer,
    products: productsReducer,
    filters: filterReducer,
    order: orderReducer,
    contact: contactReducer,

  },
  devTools: true,
});

export default store;

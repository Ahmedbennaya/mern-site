import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./features/authSlice";
import storesReducer from "./storesSlice"; 
import cartReducer from './features/cartSlice';
import productsReducer from './features/productsSlice';
import filterReducer from './features/filterSlice';
import orderSlice from "./features/orderSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    stores: storesReducer,
    cart: cartReducer,
    products: productsReducer,
    filters: filterReducer,
order:orderSlice

  },
  devTools: true,
});

export default store;
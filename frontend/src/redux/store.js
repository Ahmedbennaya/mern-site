import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./features/authSlice";
import storesReducer from "./storesSlice"; 
import cartReducer from './features/cartSlice';
import productsReducer from './features/productsSlice';
import filterReducer from './features/filterSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    stores: storesReducer,
    cart: cartReducer,
    products: productsReducer,
    filters: filterReducer,


  },
  devTools: true,
});

export default store;
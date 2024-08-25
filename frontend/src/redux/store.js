import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import storesReducer from "./storesSlice"; 
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    stores: storesReducer, 
    cart: cartReducer,
  },
  devTools: true,
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import storesReducer from "./storesSlice"; // Import the stores slice

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    stores: storesReducer, // Add the stores reducer
  },
  devTools: true,
});

export default store;

import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 0 });
      }

      state.totalItems += 1;
      state.totalAmount += item.price;

      // Show toast notification
      toast.success(`${item.name} added to cart!`);
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.id === itemId);

      if (existingItem) {
        state.totalItems -= 1;
        state.totalAmount -= existingItem.price;

        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== itemId);
        } else {
          existingItem.quantity -= 1;
        }
      }
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.id === id);

      if (existingItem && quantity > 0) {
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalAmount += quantityDifference * existingItem.price;
        state.totalItems += quantityDifference;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    }
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

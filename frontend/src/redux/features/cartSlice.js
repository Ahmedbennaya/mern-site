// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:5000';

// Add to Cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const { data: product } = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
      const cartItem = {
        userId,
        product,
        quantity
      };
      toast.success(`${product.name} added to cart`);
      return cartItem;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error adding to cart';
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Remove from Cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      // Ideally, you'd call an API to remove the item from the backend
      return productId; // Return the productId to filter it from the cart state
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error removing item from cart';
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Clear Cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (userId, { rejectWithValue }) => {
    try {
      // Normally here, you'd call the API to update the backend
      toast.success('Cart cleared');
      return { cartItems: [], totalAmount: 0 };
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error clearing cart';
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

const initialState = {
  cartItems: [],
  totalAmount: 0,
  loading: false,
  error: null,
};

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existingItem = state.cartItems.find(item => item.product._id === newItem.product._id);

        if (existingItem) {
          existingItem.quantity += newItem.quantity; // Update quantity if item already exists
        } else {
          state.cartItems.push(newItem); // Add new item to the cart
        }

        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const productId = action.payload;
        const itemToRemove = state.cartItems.find(item => item.product._id === productId);
        
        if (itemToRemove) {
          toast.success(`${itemToRemove.product.name} removed from cart`);
        }

        state.cartItems = state.cartItems.filter(item => item.product._id !== productId);
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
        state.totalAmount = 0;
        state.loading = false;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;

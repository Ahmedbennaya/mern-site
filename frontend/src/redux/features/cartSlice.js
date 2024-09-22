// src/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Define API Base URL directly
const API_BASE_URL = 'http://localhost:5000'; // Replace with your backend URL

// Fetch Cart Items
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/cart/${userId}`);
      toast.success('Cart fetched successfully');
      return data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error fetching cart';
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Add to Cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      if (!productId || !quantity) {
        return rejectWithValue('Product ID and quantity are required.');
      }
      const { data } = await axios.post(`${API_BASE_URL}/api/cart`, { userId, productId, quantity });
      toast.success('Item added to cart');
      return data;
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
      const { data } = await axios.delete(`${API_BASE_URL}/api/cart/${userId}/${productId}`);
      toast.success('Item removed from cart');
      return data;
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
      await axios.delete(`${API_BASE_URL}/api/cart/${userId}`);
      toast.success('Cart cleared');
      return { cartItems: [], totalAmount: 0 };
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error clearing cart';
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Purchase Cart
export const purchaseCart = createAsyncThunk(
  'cart/purchaseCart',
  async ({ userId, shippingAddress, paymentMethod }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/cart/purchase`, {
        userId,
        shippingAddress,
        paymentMethod,
      });
      toast.success('Purchase successful');
      return data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error processing purchase';
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Initial State
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
  reducers: {
    clearCartState(state) {
      state.cartItems = [];
      state.totalAmount = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems || [];
        state.totalAmount = action.payload.totalAmount || 0;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems || [];
        state.totalAmount = action.payload.totalAmount || 0;
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems || [];
        state.totalAmount = action.payload.totalAmount || 0;
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Clear Cart
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
      })

      // Purchase Cart
      .addCase(purchaseCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(purchaseCart.fulfilled, (state) => {
        state.cartItems = [];
        state.totalAmount = 0;
        state.loading = false;
      })
      .addCase(purchaseCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Export clear cart action
export const { clearCartState } = cartSlice.actions;

// Export reducer as default
export default cartSlice.reducer;

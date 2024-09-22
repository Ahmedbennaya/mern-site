import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch Cart Items
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/cart/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error fetching cart'
      );
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
      const { data } = await axios.post(`/api/cart`, {
        userId,
        productId,
        quantity,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error adding to cart'
      );
    }
  }
);

// Remove from Cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/cart/${userId}/${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error removing item from cart'
      );
    }
  }
);

// Clear Cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/cart/${userId}`);
      return { cartItems: [], totalAmount: 0 };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error clearing cart'
      );
    }
  }
);

// Purchase Cart
export const purchaseCart = createAsyncThunk(
  'cart/purchaseCart',
  async ({ userId, shippingAddress, paymentMethod }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/cart/purchase`, {
        userId,
        shippingAddress,
        paymentMethod,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error processing purchase'
      );
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

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;

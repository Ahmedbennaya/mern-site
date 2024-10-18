import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'https://mern-site-z5gs.onrender.com';

// Add to Cart Thunk
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      if (!userId) {
        toast.error('You need to login to add items to the cart.');
        return rejectWithValue('User not logged in');
      }

      const { data: product } = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
      const cartItem = {
        userId,
        product,
        quantity,  // Ensure correct quantity is passed
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

// Remove from Cart Thunk
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ productId }, { rejectWithValue }) => {
    try {
      const { data: product } = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
      toast.success(`${product.name} removed from cart`);
      return productId;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error removing item from cart';
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Clear Cart Thunk
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
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
          // Update the quantity without adding twice
          existingItem.quantity = newItem.quantity;
        } else {
          state.cartItems.push(newItem); // Add the new item to the cart
        }

        // Recalculate the total amount after adding/updating
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
        state.cartItems = state.cartItems.filter(item => item.product._id !== productId);

        // Recalculate total amount after removing an item
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

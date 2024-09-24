// Order slice file

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'https://mern-site-z5gs.onrender.com';

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      // Corrected URL with proper template literals
      const response = await axios.post(`${API_BASE_URL}/api/orders/create`, orderData);

      // Ensure response contains the 'order' data
      if (response.data && response.data.order) {
        toast.success('Order created successfully');
        return response.data.order;
      } else {
        throw new Error('No order data returned from the server.');
      }
    } catch (error) {
      // Log the full error response for debugging
      console.error('Error creating order:', error.response ? error.response.data : error.message);

      // Handle different cases of error response
      const errorMsg =
        error.response?.data?.message || 
        error.message || 
        'Failed to create order. Please try again later.';

      // Display a user-friendly error message in the toast
      toast.error(`Order submission failed: ${errorMsg}`);

      // Reject with a custom error message for Redux state handling
      return rejectWithValue(errorMsg);
    }
  }
);

const initialState = {
  order: null,
  loading: false,
  error: null,
};

// Order Slice
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Export the action to reset order state if needed
export const { resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;

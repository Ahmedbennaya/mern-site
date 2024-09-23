import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:5000';

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/orders/create`, orderData);
      toast.success('Order created successfully');
      return response.data.order;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to create order';
      toast.error(errorMsg);
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
    // You can define additional synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // Pending case for order creation
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled case for order creation
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload; // Set the order data from the fulfilled action
        state.loading = false;
      })
      // Rejected case for order creation
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;

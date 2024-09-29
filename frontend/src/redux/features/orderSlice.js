import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'https://mern-site-z5gs.onrender.com';

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/orders/create`, orderData);
      if (response.data && response.data.order) {
        toast.success('Order created successfully');
        return response.data.order;
      } else {
        throw new Error('No order data returned from the server.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to create order. Please try again later.';
      toast.error(`Order submission failed: ${errorMsg}`);
      return rejectWithValue(errorMsg);
    }
  }
);

// Async thunk to fetch all orders for admin
export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/orders`);
      return response.data.orders;  // Assuming backend returns an array of orders
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      return rejectWithValue(errorMsg);
    }
  }
);

// Async thunk for confirming an order
export const confirmOrder = createAsyncThunk(
  'order/confirmOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/orders/${orderId}/confirm`);
      toast.success('Order confirmed successfully');
      return response.data.order;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      toast.error(`Order confirmation failed: ${errorMsg}`);
      return rejectWithValue(errorMsg);
    }
  }
);

// Initial state of the order slice
const initialState = {
  orders: [],       // Store multiple orders (for admin)
  order: null,      // Store a single order (for the user)
  loading: false,
  error: null,
};

// Order slice combining user and admin functionality
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Action to reset the order state
    resetOrderState: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order cases
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload; // Set the order data
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Fetch orders cases (admin)
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // Set the fetched orders
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Confirm order cases (admin)
      .addCase(confirmOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.loading = false;
        const confirmedOrder = action.payload;
        // Update the confirmed order in the state
        state.orders = state.orders.map(order =>
          order._id === confirmedOrder._id ? confirmedOrder : order
        );
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the action to reset order state if needed
export const { resetOrderState } = orderSlice.actions;

// Export the order reducer
export default orderSlice.reducer;
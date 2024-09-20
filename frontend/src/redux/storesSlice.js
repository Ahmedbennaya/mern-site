import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Fetch stores (all stores)
export const fetchStores = createAsyncThunk(
  'stores/fetchStores',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/stores');
      return data;
    } catch (error) {
      const errorMessage = error.response?.data || 'An error occurred';
      toast.error('Failed to fetch stores');
      return rejectWithValue(errorMessage);
    }
  }
);

// Delete a store by ID
export const deleteStore = createAsyncThunk(
  'stores/deleteStore',
  async (storeId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/stores/${storeId}`);
      toast.success('Store deleted successfully');
      return storeId;
    } catch (error) {
      const errorMessage = error.response?.data || 'An error occurred';
      toast.error('Failed to delete store');
      return rejectWithValue(errorMessage);
    }
  }
);

const storesSlice = createSlice({
  name: 'stores',
  initialState: {
    stores: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchStores
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle deleteStore
      .addCase(deleteStore.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = state.stores.filter((store) => store._id !== action.payload);
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default storesSlice.reducer;

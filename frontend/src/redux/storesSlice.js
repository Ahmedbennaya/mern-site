import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

// Async thunk to fetch store data
export const fetchStores = createAsyncThunk(
  "stores/fetchStores",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/stores");
      return data;
    } catch (error) {
      toast.error("Failed to fetch stores");
      return rejectWithValue(error.response.data);
    }
  }
);

// Create storesSlice
const storesSlice = createSlice({
  name: "stores",
  initialState: {
    stores: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStores.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchStores.fulfilled, (state, action) => {
      state.loading = false;
      state.stores = action.payload;
    });
    builder.addCase(fetchStores.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export the stores reducer as default
export default storesSlice.reducer;

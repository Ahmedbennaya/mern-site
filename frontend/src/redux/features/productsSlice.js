// redux/features/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Axios instance with `withCredentials` to send the JWT cookie automatically
const axiosInstance = axios.create({
  baseURL: 'https://mern-site-z5gs.onrender.com',
  withCredentials: true,
});

// Fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/products', { params: filters });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/products/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new product
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async ({ category, name, description, price, imageUrl, imageUrl2, imageUrl3, imageUrl4, dimensions, inStock, subcategory, colors }, { rejectWithValue }) => {
    try {
      // Validate required fields
      if (!category || !name || !description || !price || !imageUrl || !imageUrl2 || !imageUrl3 || !imageUrl4 || !dimensions || !dimensions.width || !dimensions.height || inStock === undefined) {
        throw new Error('All required fields must be provided.');
      }

      const productData = { name, description, price, imageUrl, imageUrl2, imageUrl3, imageUrl4, category, dimensions, inStock, subcategory, colors };
      const encodedCategory = encodeURIComponent(category);

      const response = await axiosInstance.post(`/api/products/category/${encodedCategory}`, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);

// Update product by ID
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, name, description, price, imageUrl }, { rejectWithValue }) => {
    try {
      if (!id || !name || !price) {
        throw new Error('Product ID, name, and price are required.');
      }

      const productData = { name, description, price, imageUrl };

      const response = await axiosInstance.put(`/api/products/${id}`, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);

// Delete product by ID
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/products/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Products slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
    product: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        toast.success('Products fetched successfully');
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error fetching products: ${action.payload}`);
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        toast.success('Product fetched successfully');
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error fetching product: ${action.payload}`);
      })

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        toast.success('Product created successfully');
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error creating product: ${action.payload}`);
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        toast.success('Product updated successfully');
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error updating product: ${action.payload}`);
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(product => product._id !== action.payload);
        toast.success('Product deleted successfully');
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error deleting product: ${action.payload}`);
      });
  },
});

export default productsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', { params: filters });
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
      const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Create new product with category in the URL
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async ({ category, name, description, price, imageUrl, dimensions, inStock, subcategory, colors }, { rejectWithValue }) => {
    try {
      // Ensure all required fields are present
      if (!category || !name || !description || !price || !imageUrl || !dimensions || !dimensions.width || !dimensions.height || inStock === undefined) {
        throw new Error('All required fields must be provided.');
      }

      const productData = { name, description, price, imageUrl, category, dimensions, inStock, subcategory, colors };

      // URL encode the category to handle special characters and spaces
      const encodedCategory = encodeURIComponent(category);

      // Post to the category-specific endpoint
      const response = await axios.post(`http://localhost:5000/api/products/category/${encodedCategory}`, productData);
      return response.data;
    } catch (error) {
      // Log the error details for debugging
      console.error('Error creating product:', error.response ? error.response.data : error.message);
      
      // Return a detailed error message
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);

// Update product by ID
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, name, description, price, imageUrl }, { rejectWithValue }) => {
    try {
      // Ensure all required fields are present
      if (!id || !name || !price) {
        throw new Error('Product ID, name, and price are required.');
      }

      const productData = { name, description, price, imageUrl };

      // Put to the product-specific endpoint
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, productData);
      return response.data;
    } catch (error) {
      // Log the error details for debugging
      console.error('Error updating product:', error.response ? error.response.data : error.message);
      
      // Return a detailed error message
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);

// Delete product by ID
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
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
      // Handle fetchProducts
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

      // Handle fetchProductById
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

      // Handle createProduct
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload); // Add the new product to the state
        toast.success('Product created successfully');
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error creating product: ${action.payload}`);
      })

      // Handle updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload; // Update the product in the state
        }
        toast.success('Product updated successfully');
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error updating product: ${action.payload}`);
      })

      // Handle deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(product => product._id !== action.payload); // Remove the deleted product from the state
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
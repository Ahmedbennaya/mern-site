import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cartItems: [],
  totalAmount: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.cartItems = action.payload.cartItems || [];
      state.totalAmount = action.payload.totalAmount || 0;
      state.error = null;  // Clear errors when cart is successfully updated
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCart, setLoading, setError } = cartSlice.actions;

export default cartSlice.reducer;

// Thunks for cart actions
export const fetchCart = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get(`http://localhost:5000/api/cart/${userId}`);
    dispatch(setCart(data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Error fetching cart'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addToCart = (userId, productId, quantity) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post('http://localhost:5000/api/cart', { userId, productId, quantity });
    dispatch(setCart(data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Error adding to cart'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeFromCart = (userId, productId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
    dispatch(setCart(data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Error removing item from cart'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const clearCart = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete(`http://localhost:5000/api/cart/${userId}`);
    dispatch(setCart({ cartItems: [], totalAmount: 0 }));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Error clearing cart'));
  } finally {
    dispatch(setLoading(false));
  }
};

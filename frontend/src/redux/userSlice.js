// redux/userSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { setCredentials, clearCredentials } from './features/authSlice'; 

axios.defaults.withCredentials = true;
const API_URL = 'http://localhost:5000/api/users';

export const signin = createAsyncThunk(
  'user/signin',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, user);
      dispatch(setCredentials(data)); 
      toast.success('Logged In');
      return data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to sign in';
      toast.error(errorMsg);
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signup',
  async ({ user, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/registerUser`, user);
      toast.success('Account created successfully');
      navigate('/signin');
      return data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to sign up';
      toast.error(errorMsg);
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (navigate, { dispatch, rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/logout`);
      dispatch(clearCredentials());
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  'user/requestPasswordReset',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/forgot-password`, { email });
      toast.success('Password reset link sent to your email.');
      return data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to request password reset';
      toast.error(errorMsg);
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      toast.success('Password has been reset successfully.');
      return data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to reset password';
      toast.error(errorMsg);
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updatedUserData, { dispatch, getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.userInfo?.token;

      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      const { data } = await axios.put(`${API_URL}/update`, updatedUserData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch(setCredentials(data)); 
      toast.success('Profile updated successfully');
      return data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to update profile';
      toast.error(errorMsg);
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API_URL);
      return data;
    } catch (error) {
      toast.error('Failed to fetch users');
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${userId}`);
      toast.success('User deleted successfully');
      return userId;
    } catch (error) {
      toast.error('Failed to delete user');
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);

const initialState = {
  loading: false,
  loggedInUser: null,
  createdUser: null,
  passwordResetRequested: false,
  passwordResetSuccessful: false,
  updatedUser: null,
  users: [],
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => { state.loading = true; })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(signin.rejected, (state) => { state.loading = false; })
      .addCase(signUp.pending, (state) => { state.loading = true; })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.createdUser = action.payload;
      })
      .addCase(signUp.rejected, (state) => { state.loading = false; })
      .addCase(logout.pending, (state) => { state.loading = true; })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.loggedInUser = null;
      })
      .addCase(logout.rejected, (state) => { state.loading = false; })
      .addCase(requestPasswordReset.pending, (state) => { state.loading = true; })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading = false;
        state.passwordResetRequested = true;
      })
      .addCase(requestPasswordReset.rejected, (state) => {
        state.loading = false;
        state.passwordResetRequested = false;
      })
      .addCase(resetPassword.pending, (state) => { state.loading = true; })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordResetSuccessful = true;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
        state.passwordResetSuccessful = false;
      })
      .addCase(updateUser.pending, (state) => { state.loading = true; })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedUser = action.payload;
        state.loggedInUser = action.payload;
      })
      .addCase(updateUser.rejected, (state) => { state.loading = false; })
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => { state.loading = true; })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

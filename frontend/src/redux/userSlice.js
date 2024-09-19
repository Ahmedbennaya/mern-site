import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { setCredentials, clearCredentials } from './features/authSlice'; 

axios.defaults.withCredentials = true;

// Base URL for API requests
const API_URL = 'http://localhost:5000/api/users';

// Sign in an existing user
export const signin = createAsyncThunk(
  'user/signin',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, user);
      dispatch(setCredentials(data)); 
      toast.success('Logged In');
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to sign in');
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);

// Register a new user
export const signUp = createAsyncThunk(
  'user/signup',
  async ({ user, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/registerUser`, user);
      toast.success('Account created successfully');
      navigate('/signin');
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to sign up');
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);

// Log out the current user
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

// Request password reset link
export const requestPasswordReset = createAsyncThunk(
  'user/requestPasswordReset',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/forgot-password`, { email });
      toast.success('Password reset link sent to your email.');
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to request password reset');
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);

// Reset password with token
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      toast.success('Password has been reset successfully.');
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to reset password');
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);

// Update user profile
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updatedUserData, { dispatch, getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.userInfo?.token;

      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      const { data } = await axios.put(
        `${API_URL}/update`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setCredentials(data)); 
      toast.success('Profile updated successfully');
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update profile');
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);

// Fetch all users
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}`);
      return data;
    } catch (error) {
      toast.error('Failed to fetch users');
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);

// Delete a user
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

// Initial state for the user slice
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
      // Signin cases
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(signin.rejected, (state) => {
        state.loading = false;
      })
      // Signup cases
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.createdUser = action.payload;
      })
      .addCase(signUp.rejected, (state) => {
        state.loading = false;
      })
      // Logout cases
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.loggedInUser = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })
      // Request password reset cases
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading = false;
        state.passwordResetRequested = true;
      })
      .addCase(requestPasswordReset.rejected, (state) => {
        state.loading = false;
        state.passwordResetRequested = false;
      })
      // Reset password cases
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordResetSuccessful = true;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
        state.passwordResetSuccessful = false;
      })
      // Update user profile cases
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedUser = action.payload;
        state.loggedInUser = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
      })
      // Fetch users cases
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete user cases
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
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

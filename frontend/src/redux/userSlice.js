import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setCredentials, clearCredentials } from "./features/authSlice"; // Corrected import path

axios.defaults.withCredentials = true;

export const signin = createAsyncThunk(
  "user/signin",
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", user);
      dispatch(setCredentials(data));
      toast.success("Logged In");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to sign in");
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signup",
  async ({ user, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/registerUser", user);
      navigate("/signin");
      toast.success("Account created successfully");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to sign up");
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (navigate, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/logout");
      dispatch(clearCredentials());
      navigate("/");
      toast.success("Logged out successfully");
      return data;
    } catch (error) {
      toast.error("Failed to log out");
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  "user/requestPasswordReset",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/forgot-password", { email });
      toast.success("Password reset link sent to your email.");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to request password reset");
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, { password });
      toast.success("Password has been reset successfully.");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updatedUserData, { dispatch, getState, rejectWithValue }) => {
    try {
      const { auth } = getState(); // Access the auth state
      const token = auth.userInfo?.token; // Get the token

      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const { data } = await axios.put(
        "http://localhost:5000/api/users/update",
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the token in the request headers
          },
        }
      );

      dispatch(setCredentials(data)); // Update credentials in auth slice
      toast.success("Profile updated successfully");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
      return rejectWithValue(error?.response?.data || "An error occurred");
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
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
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
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedUser = action.payload;
        state.loggedInUser = action.payload; // Update the logged-in user info
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;

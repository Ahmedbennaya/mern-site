import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to save preferences to the backend
export const savePreferences = createAsyncThunk(
  'preference/savePreferences',
  async (preference, { getState }) => {
    const { auth } = getState(); // Assuming you have auth state
    const userId = auth.userInfo ? auth.userInfo._id : null; // Use _id from MongoDB

    // Save preferences to backend only if userId (_id) exists
    if (userId) {
      await axios.post('https://mern-site-z5gs.onrender.com/api/preferences/savePreferences', { userId, preference });
    }

    // Also save preferences to localStorage
    localStorage.setItem('cookiePreference', JSON.stringify(preference));
    
    return preference;
  }
);

// Initial state
const initialState = {
  preferences: JSON.parse(localStorage.getItem('cookiePreference')) || { thirdParty: true },
  loading: false,
  error: null,
};

// Slice
const preferenceSlice = createSlice({
  name: 'preference',
  initialState,
  reducers: {
    loadPreferences: (state) => {
      const storedPreference = JSON.parse(localStorage.getItem('cookiePreference'));
      if (storedPreference) {
        state.preferences = storedPreference;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(savePreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
        state.error = null;
      })
      .addCase(savePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the action
export const { loadPreferences } = preferenceSlice.actions;

// Export the reducer
export default preferenceSlice.reducer;

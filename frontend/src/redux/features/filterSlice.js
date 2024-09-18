import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  width: 150,
  height: 150,
  inStock: false,
  category: [],
  subCategory: [],
  color: [],
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { name, value } = action.payload;
      if (Array.isArray(state[name])) {
        const exists = state[name].includes(value);
        state[name] = exists
          ? state[name].filter((item) => item !== value)
          : [...state[name], value];
      } else {
        state[name] = value;
      }
    },
    clearFilters: (state) => {
      return initialState;
    },
  },
});

export const { setFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;

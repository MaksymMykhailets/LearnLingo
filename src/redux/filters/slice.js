import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: '',
  level: '',
  priceRange: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLanguageFilter(state, action) {
      state.language = action.payload;
    },
    setLevelFilter(state, action) {
      state.level = action.payload;
    },
    setPriceFilter(state, action) {
      state.priceRange = action.payload;
    },
    clearFilters(state) {  
      state.language = '';
      state.level = '';
      state.priceRange = '';
    },
  },
});

export const { setLanguageFilter, setLevelFilter, setPriceFilter, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;

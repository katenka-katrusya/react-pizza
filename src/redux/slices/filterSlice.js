import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryIndex: 0,
  sortType: {
    name: 'популярности',
    sortProperty: 'rating'
  },
  sortOrder: true,
  currentPage: 1,
  searchValue: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState, // первоначальное состояние
  reducers: {
    setCategoryIndex(state, action) {
      state.categoryIndex = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    }
  }
});

export const { setCategoryIndex, setSortType, setSortOrder, setCurrentPage, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;

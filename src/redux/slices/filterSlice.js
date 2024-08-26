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
    },
    // setFilters(state, action) {
    //   state.currentPage = Number(action.payload.currentPage);
    //   state.categoryIndex = Number(action.payload.categoryIndex);
    //   state.sortType = action.payload.sortType;
    //   state.sortOrder = Boolean(action.payload.sortOrder);
    //   state.searchValue = action.payload.searchValue;
    // }
  }
});

export const { setCategoryIndex, setSortType, setSortOrder, setCurrentPage, setSearchValue, setFilters } = filterSlice.actions;
export default filterSlice.reducer;

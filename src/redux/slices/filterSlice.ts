import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/redux/store'

export type TSortList = {
  name: string,
  sortProperty: 'rating' | 'price' | 'title'
}

interface IFilterSlice {
  categoryIndex: number;
  sortType: TSortList;
  sortOrder: boolean;
  currentPage: number;
  searchValue: string;
}

const initialState: IFilterSlice = {
  categoryIndex: 0,
  sortType: {
    name: 'популярности',
    sortProperty: 'rating'
  },
  sortOrder: true,
  currentPage: 1,
  searchValue: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState, // первоначальное состояние
  reducers: {
    setCategoryIndex(state: IFilterSlice, action: PayloadAction<number>) {
      state.categoryIndex = action.payload
    },
    setSortType(state: IFilterSlice, action: PayloadAction<TSortList>) {
      state.sortType = action.payload
    },
    setSortOrder(state: IFilterSlice, action: PayloadAction<boolean>) {
      state.sortOrder = action.payload
    },
    setCurrentPage(state: IFilterSlice, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setSearchValue(state: IFilterSlice, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    // setFilters(state, action) {
    //   state.currentPage = Number(action.payload.currentPage);
    //   state.categoryIndex = Number(action.payload.categoryIndex);
    //   state.sortType = action.payload.sortType;
    //   state.sortOrder = Boolean(action.payload.sortOrder);
    //   state.searchValue = action.payload.searchValue;
    // }
  }
})

export const selectFilter = (state: RootState) => state.filter

export const {
  setCategoryIndex,
  setSortType,
  setSortOrder,
  setCurrentPage,
  setSearchValue
} = filterSlice.actions

export default filterSlice.reducer

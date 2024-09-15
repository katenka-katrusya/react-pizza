import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFilterSlice, TSortList } from '@/redux/slices/filter/filterTypes.ts'

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
    }
  }
})

export const {
  setCategoryIndex,
  setSortType,
  setSortOrder,
  setCurrentPage,
  setSearchValue
} = filterSlice.actions

export default filterSlice.reducer

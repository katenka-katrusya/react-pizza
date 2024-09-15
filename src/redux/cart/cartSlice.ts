import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calculateTotalPrice } from '@/helpers.ts'
import { ICartSlice, TCartItem } from '@/redux/cart/cartTypes.ts'

const initialState: ICartSlice = {
  totalPrice: 0,
  items: []
}

// поиск элемента в массиве
const findItem = (items: TCartItem[], payload: TCartItem) => {
  return items.find(item =>
    item.id === payload.id &&
    item.size === payload.size &&
    item.type === payload.type
  )
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state: ICartSlice, action: PayloadAction<TCartItem>) {
      const item = findItem(state.items, action.payload)
      if (item) {
        item.count++
      } else {
        state.items.push({ ...action.payload, count: 1 }) // если такого товара нет, добавить новый
      }
      state.totalPrice = calculateTotalPrice(state.items)
    },
    plusItem(state: ICartSlice, action: PayloadAction<TCartItem>) {
      const item = findItem(state.items, action.payload)
      if (item) {
        item.count++
      }
      state.totalPrice = calculateTotalPrice(state.items)
    },
    minusItem(state: ICartSlice, action: PayloadAction<TCartItem>) {
      const item = findItem(state.items, action.payload)
      if (item && item.count > 1) {
        item.count--
      } else {
        state.items = state.items.filter(
          obj =>
            obj.id !== action.payload.id ||
            obj.size !== action.payload.size ||
            obj.type !== action.payload.type
        )
      }
      state.totalPrice = calculateTotalPrice(state.items)
    },
    removeItem(state: ICartSlice, action: PayloadAction<number>) {
      state.items = state.items.filter((_, index) => (index !== action.payload))
      state.totalPrice = calculateTotalPrice(state.items)
    },
    clearItems(state: ICartSlice) {
      state.items = []
      state.totalPrice = 0
    }
  }
})

export const {
  addItem,
  removeItem,
  clearItems,
  plusItem,
  minusItem
} = cartSlice.actions

export default cartSlice.reducer

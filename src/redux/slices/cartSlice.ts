import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/redux/store'

export type TCartItem = {
  id: number,
  title: string,
  price: number,
  imageUrl: string,
  size: number,
  type: string,
  count: number,
}

interface ICartSlice {
  totalPrice: number;
  items: TCartItem[];
}

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

// пересчет общей стоимости
const calculateTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, item) => sum + (item.price * item.count), 0)
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

export const selectCart = (state: RootState) => state.cart
export const selectCartItem = (id: number, sizes: number, dough: string) => (state: RootState) =>
  state.cart.items.find(
    obj =>
    (obj.id === id) &&
    (obj.size === sizes) &&
    (obj.type === dough)
  )

export const {
  addItem,
  removeItem,
  clearItems,
  plusItem,
  minusItem
} = cartSlice.actions

export default cartSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice.ts'
import cartReducer from './slices/cartSlice.ts'
import pizzasReducer from './slices/pizzasSlice.ts'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
})

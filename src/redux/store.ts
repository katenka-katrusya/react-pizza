import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice.ts'
import cartReducer from './slices/cartSlice.ts'
import pizzasReducer from './slices/pizzasSlice.ts'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

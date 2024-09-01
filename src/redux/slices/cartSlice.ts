import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: []
}

// загрузка корзины из локалсторадж
const loadCartFromLocalStorage = () => {
  try {
    const localCart = localStorage.getItem('cartPizzas')
    
    if (!localCart) {
      return initialState
    }
    
    return JSON.parse(localCart)
  } catch (error) {
    console.warn('Ошибка при загрузке пиццы из localStorage', error)
    return initialState
  }
}

// сохранение в локалсторадж
const saveCartToLocalStorage = (state) => {
  try {
    const localCart = JSON.stringify(state)
    localStorage.setItem('cartPizzas', localCart)
  } catch (error) {
    console.warn('Ошибка при сохранении пиццы из localStorage', error)
  }
}

// поиск элемента в массиве
const findItem = (items, payload) => {
  return items.find(item =>
    item.id === payload.id &&
    item.size === payload.size &&
    item.type === payload.type
  )
}

// пересчет общей стоимости
const calculateTotalPrice = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.count), 0)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(), // первоначальное состояние
  reducers: {
    addItem(state, action) {
      const item = findItem(state.items, action.payload)
      if (item) {
        item.count++
      } else {
        state.items.push({ ...action.payload, count: 1 }) // если такого товара нет, добавить новый
      }
      state.totalPrice = calculateTotalPrice(state.items)
      saveCartToLocalStorage(state)
    },
    plusItem(state, action) {
      const item = findItem(state.items, action.payload)
      if (item) {
        item.count++
      }
      state.totalPrice = calculateTotalPrice(state.items)
      saveCartToLocalStorage(state)
    },
    minusItem(state, action) {
      const item = findItem(state.items, action.payload)
      if (item.count > 1) {
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
      saveCartToLocalStorage(state)
    },
    removeItem(state, action) {
      state.items = state.items.filter((_, index) => (index !== action.payload))
      state.totalPrice = calculateTotalPrice(state.items)
      saveCartToLocalStorage(state)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
      saveCartToLocalStorage(state)
    }
  }
})

export const selectCart = (state) => state.cart
export const selectCartItem = (id, sizes, dough) => (state) =>
  state.cart.items.find(obj =>
    (obj.id === id) &&
    (obj.size === sizes) &&
    (obj.type === dough))

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions
export default cartSlice.reducer

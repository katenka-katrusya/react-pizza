import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

// поиск элемента в массиве
const findItem = (items, payload) => {
  return items.find(item =>
    item.id === payload.id &&
    item.size === payload.size &&
    item.type === payload.type
  );
};

// пересчет общей стоимости
const calculateTotalPrice = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.count), 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState, // первоначальное состояние
  reducers: {
    addItem(state, action) {
      const item = findItem(state.items, action.payload);
      if (item) {
        item.count++;
      } else {
        state.items.push({ ...action.payload, count: 1, }); // если такого товара нет, добавить новый
      }
      state.totalPrice = calculateTotalPrice(state.items);
    },
    plusItem(state, action) {
      const item = findItem(state.items, action.payload);
      if (item) {
        item.count++;
      }
      state.totalPrice = calculateTotalPrice(state.items);
    },
    minusItem(state, action) {
      const item = findItem(state.items, action.payload);
      if (item.count > 1) {
        item.count--;
      } else {
        state.items = state.items.filter(
          obj =>
            obj.id !== action.payload.id ||
            obj.size !== action.payload.size ||
            obj.type !== action.payload.type
        );
      }
      state.totalPrice = calculateTotalPrice(state.items);
    },
    removeItem(state, action) {
      console.log('removeItem', action.payload);
      state.items = state.items.filter((_, index) => (index !== action.payload));
      state.totalPrice = calculateTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  }
});

export const selectCart = (state) => state.cart;
export const selectCartItem = (id, sizes, dough) => (state) =>
  state.cart.items.find(obj =>
    (obj.id === id) &&
    (obj.size === sizes) &&
    (obj.type === dough))

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions;
export default cartSlice.reducer;

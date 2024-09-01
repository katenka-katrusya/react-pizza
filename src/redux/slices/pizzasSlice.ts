import { createSlice } from '@reduxjs/toolkit';
import { fetchPizzas } from '@/redux/slices/pizzasThunk.ts';

const initialState = {
  items: [],
  totalPages: 1,
  pizzasLimit: 4,
  loading: 'pending', // 'pending' | 'success' | 'failed'
  error: null,
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      console.log(action.payload);
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.loading = 'pending';
        state.error = null; // сброс предыдущих ошибок
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.loading = 'success';
        state.items = action.payload.data;
        state.totalPages = Math.ceil(action.payload.totalCount / state.pizzasLimit);
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload; // сохранение ошибки
        state.items = [];
      });
  }
});

export const selectPizzasData = (state) => state.pizzas;

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;

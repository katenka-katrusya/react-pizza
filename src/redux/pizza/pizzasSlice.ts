import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPizzas } from '@/redux/pizza/pizzasThunk.ts'
import { IPizzasSlice, Status, TPizzaBlock } from '@/redux/pizza/pizzaTypes.ts'

const initialState: IPizzasSlice = {
  items: [],
  totalPages: 1,
  pizzaLimit: 4,
  loading: Status.PENDING,
  error: null,
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state: IPizzasSlice, action: PayloadAction<TPizzaBlock[]>) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state: IPizzasSlice) => {
        state.loading = Status.PENDING;
        state.error = null; // сброс предыдущих ошибок
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state: IPizzasSlice, action) => {
        state.loading = Status.SUCCESS;
        state.items = action.payload.data;
        state.totalPages = Math.ceil(action.payload.totalCount / state.pizzaLimit);
      })
      .addCase(fetchPizzas.rejected, (state: IPizzasSlice, action) => {
        state.loading = Status.FAILED;
        state.error = action.error || null; // сохранение ошибки
        state.items = [];
      });
  }
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;

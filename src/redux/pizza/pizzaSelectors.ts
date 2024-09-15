import { RootState } from '@/redux/store.ts'

export const selectPizzasData = (state: RootState) => state.pizzas;

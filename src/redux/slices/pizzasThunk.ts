import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ALL_PIZZAS } from '@/constants/api.ts'
import { TPizzaBlock } from '@/redux/slices/pizzasSlice.ts'

export type TParams = {
  category?: number;
  title_like?: string;
  _page: number;
  _limit: number;
  _sort: 'rating' | 'price' | 'title';
  _order: 'asc' | 'desc';
}

export const fetchPizzas = createAsyncThunk<
  { data: TPizzaBlock[]; totalCount: number },
  TParams,
  { rejectValue: any }>(
  'pizzas/fetchPizzasStatus',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(ALL_PIZZAS, { params })
      const data = response.data as TPizzaBlock[]
      const totalCount = Number(response.headers['x-total-count'])

      return { data, totalCount }
    } catch (error: any) {
      console.log(error.message)
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)


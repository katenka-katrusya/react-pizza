import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ALL_PIZZAS } from '@/constants/api.ts'

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(ALL_PIZZAS, { params });
      const data = response.data;

      const totalCount = response.headers['x-total-count'];
      console.log(data, totalCount);
      return { data, totalCount };
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

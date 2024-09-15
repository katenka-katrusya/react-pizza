import { SerializedError } from '@reduxjs/toolkit'

export type TPizzaBlock = {
  id: number,
  title: string,
  price: number,
  imageUrl: string,
  sizes: number[],
  types: number[],
}

export enum Status {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface IPizzasSlice {
  items: TPizzaBlock[];
  totalPages: number;
  pizzaLimit: number;
  loading: Status;
  error: SerializedError | null;
}

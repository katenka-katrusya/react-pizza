import { RootState } from '@/redux/store.ts'

export const selectCart = (state: RootState) => state.cart
export const selectCartItem = (id: number, sizes: number, dough: string) => (state: RootState) =>
  state.cart.items.find(
    obj =>
      (obj.id === id) &&
      (obj.size === sizes) &&
      (obj.type === dough)
  )

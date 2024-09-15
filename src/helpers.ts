import { TCartItem } from '@/redux/slices/cart/cartTypes.ts'

export const calculateTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, item) => sum + (item.price * item.count), 0)
}

export const calculateTotalCount = (items: TCartItem[]) => {
  return items.reduce((sum, item) => sum + item.count, 0)
}

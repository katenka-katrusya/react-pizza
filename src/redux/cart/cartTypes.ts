export type TCartItem = {
  id: number,
  title: string,
  price: number,
  imageUrl: string,
  size: number,
  type: string,
  count: number,
}

export interface ICartSlice {
  totalPrice: number;
  items: TCartItem[];
}

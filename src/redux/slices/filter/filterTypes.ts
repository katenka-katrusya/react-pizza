export type TSortList = {
  name: string,
  sortProperty: 'rating' | 'price' | 'title'
}

export interface IFilterSlice {
  categoryIndex: number;
  sortType: TSortList;
  sortOrder: boolean;
  currentPage: number;
  searchValue: string;
}

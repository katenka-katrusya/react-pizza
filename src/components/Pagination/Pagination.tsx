import s from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'
import { FC } from 'react'

type TPagination = {
  onChangeCurrentPage: (page: number) => void;
  totalPages: number;
  pizzaLimit: number;
  currentPage: number
}

export const Pagination: FC<TPagination> = ({ onChangeCurrentPage, totalPages, pizzaLimit, currentPage }) => {
  return (
    <ReactPaginate
      className={s.pagination}
      breakLabel='...'
      nextLabel='>'
      previousLabel='<'
      onPageChange={e => onChangeCurrentPage(e.selected + 1)}
      forcePage={currentPage - 1} // явно указываем какая страница активна
      pageRangeDisplayed={pizzaLimit}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
    />
  );
};

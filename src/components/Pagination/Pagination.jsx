import s from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'

export const Pagination = ({ onChangeCurrentPage, totalPages, pizzasLimit, currentPage }) => {
  return (
    <ReactPaginate
      className={s.pagination}
      breakLabel='...'
      nextLabel='>'
      previousLabel='<'
      onPageChange={e => onChangeCurrentPage(e.selected + 1)}
      forcePage={currentPage - 1} // явно указываем какая страница активна
      pageRangeDisplayed={pizzasLimit}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
    />
  );
};

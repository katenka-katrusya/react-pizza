import s from './Pagination.module.scss'
import ReactPaginate from 'react-paginate';

export const Pagination = ({onChangeCurrentPage, totalPages, pizzasPerPage}) => {
  return (
    <ReactPaginate
      className={s.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={e => onChangeCurrentPage(e.selected + 1)}
      pageRangeDisplayed={pizzasPerPage}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
    />
  )
}

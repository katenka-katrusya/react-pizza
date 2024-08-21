import s from './Pagination.module.scss'
import ReactPaginate from 'react-paginate';

export const Pagination = ({onChangeCurrentPage, totalPages, rangeItems}) => {
  return (
    <ReactPaginate
      className={s.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={e => onChangeCurrentPage(e.selected + 1)}
      pageRangeDisplayed={rangeItems}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
    />
  )
}

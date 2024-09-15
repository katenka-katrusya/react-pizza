import { FC, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Categories } from '@/components/Categories.tsx'
import { Sort } from '@/components/Sort.tsx'
import { SkeletonLoader } from '@/components/PizzaItem/SkeletonLoader.tsx'
import { PizzaBlock } from '@/components/PizzaItem/PizzaBlock.tsx'
import { Pagination } from '@/components/Pagination/Pagination.tsx'
import { setCategoryIndex, setCurrentPage } from '@/redux/slices/filter/filterSlice.ts'
import { fetchPizzas, TParams } from '@/redux/slices/pizza/pizzasThunk.ts'
import { Status } from '@/redux/slices/pizza/pizzaTypes.ts'
import { useAppDispatch } from '@/redux/store.ts'
import { selectFilter } from '@/redux/slices/filter/filterSelectors.ts'
import { selectPizzasData } from '@/redux/slices/pizza/pizzaSelectors.ts'

export const Home: FC = () => {
  const { categoryIndex, sortType, sortOrder, currentPage, searchValue } = useSelector(selectFilter)
  const { items, pizzaLimit, totalPages, loading } = useSelector(selectPizzasData)
  const dispatch = useAppDispatch()

  const skeletons = Array(4).fill(null).map((_, index) => <SkeletonLoader key={index} />)
  const pizzas = items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)

  const onChangeCategory = useCallback((i: number) => {
    dispatch(setCategoryIndex(i))
  }, [])

  useEffect(() => {
    const params: TParams = {
      _page: currentPage,
      _limit: pizzaLimit,
      _sort: sortType.sortProperty,
      _order: sortOrder ? 'asc' : 'desc',
    }
    // выбор категории. 0 категория - это все пиццы
    if (categoryIndex > 0) {
      params.category = categoryIndex
    }
    // поиск
    params.title_like = searchValue

    dispatch(fetchPizzas(params))

    // window.scrollTo(0, 0);
  }, [categoryIndex, sortType, sortOrder, currentPage, searchValue])

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryIndex}
          onClickCategory={onChangeCategory} />
        <Sort sortType={sortType} sortOrder={sortOrder}/>
      </div>
      <h2 className='content__title'>Все пиццы</h2>

      {loading === Status.FAILED ? (
        <div className='content__error-info'>
          <h2 className='content__error-title'>Произошла ошибка 😕</h2>
          <p className='content__error-desc'>Не удалось получить пиццы. Попробуйте повторить позже</p>
        </div>
      ) : (
        <div className='content__items'>
          {loading === 'pending' ? skeletons : pizzas}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangeCurrentPage={(page: number) => dispatch(setCurrentPage(page))}
        totalPages={totalPages}
        pizzaLimit={pizzaLimit}
      />
    </div>
  )
}

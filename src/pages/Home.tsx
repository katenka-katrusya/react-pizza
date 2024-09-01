import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Categories } from '@/components/Categories.tsx'
import { Sort } from '@/components/Sort.tsx'
import { SkeletonLoader } from '@/components/PizzaItem/SkeletonLoader.tsx'
import { PizzaBlock } from '@/components/PizzaItem/PizzaBlock.tsx'
import { Pagination } from '@/components/Pagination/Pagination.tsx'
import {
  selectFilter,
  setCategoryIndex,
  setCurrentPage
} from '@/redux/slices/filterSlice.ts'
import { fetchPizzas } from '@/redux/slices/pizzasThunk.ts'
import { selectPizzasData } from '@/redux/slices/pizzasSlice.ts'

export const Home = () => {
  const { categoryIndex, sortType, sortOrder, currentPage, searchValue } = useSelector(selectFilter);
  const { items, pizzasLimit, totalPages, loading, error } = useSelector(selectPizzasData);
  const dispatch = useDispatch();

  const skeletons = Array(4).fill(null).map((_, index) => <SkeletonLoader key={index} />);
  const pizzas = items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />);

  useEffect(() => {
    const params = {};

    // выбор категории. 0 категория - это все пиццы
    if (categoryIndex > 0) {
      params.category = categoryIndex;
    }
    // поиск
    params.title_like = searchValue;
    //   пагинация
    params._page = currentPage;
    params._limit = pizzasLimit;
    // сортировка
    params._sort = sortType.sortProperty;
    params._order = sortOrder ? 'asc' : 'desc';

    dispatch(fetchPizzas(params));

    // window.scrollTo(0, 0);
  }, [categoryIndex, sortType, sortOrder, currentPage, searchValue]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryIndex}
          onClickCategory={(i) => dispatch(setCategoryIndex(i))} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>

      {error ? (
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
        onChangeCurrentPage={number => dispatch(setCurrentPage(number))}
        totalPages={totalPages}
        pizzasLimit={pizzasLimit}
      />
    </div>
  );
};

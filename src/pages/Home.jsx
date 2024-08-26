import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories } from '@/components/Categories.jsx';
import { Sort } from '@/components/Sort.jsx';
import { SkeletonLoader } from '@/components/PizzaItem/SkeletonLoader.jsx';
import { PizzaBlock } from '@/components/PizzaItem/PizzaBlock.jsx';
import { Pagination } from '@/components/Pagination/Pagination.jsx';
import { setCategoryIndex, setCurrentPage } from '@/redux/slices/filterSlice.js';

export const Home = () => {
  const { categoryIndex, sortType, sortOrder, currentPage, searchValue } = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const pizzasLimit = 4;

  const skeletons = Array(6).fill(null).map((_, index) => <SkeletonLoader key={index} />);
  const pizzas = items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const url = 'http://localhost:3000/items';
        const params = {};

        // поиск
        params.title_like = searchValue;
        //   пагинация
        params._page = currentPage;
        params._limit = pizzasLimit;
        // сортировка
        params._sort = sortType.sortProperty;
        params._order = sortOrder ? 'asc' : 'desc';
        // выбор категории. 0 категория - это все пиццы
        if (categoryIndex > 0) {
          params.category = categoryIndex;
        }

        const response = await axios.get(url, { params });
        const data = response.data;

        const totalCount = response.headers['x-total-count'];
        setTotalPages(Math.ceil(totalCount / pizzasLimit));

        setItems(data);
        setIsLoading(false);
      } catch (error) {
        console.log(`Error fetching data: ${error}`);
      }
    };
    fetchData();
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
      <div className='content__items'>
        {isLoading ? skeletons : pizzas}
      </div>

      <Pagination
        onChangeCurrentPage={number => dispatch(setCurrentPage(number))}
        totalPages={totalPages}
        pizzasLimit={pizzasLimit}
      />
    </div>
  );
};

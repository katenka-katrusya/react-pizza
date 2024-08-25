import { useContext, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories } from '@/components/Categories.jsx';
import { Sort } from '@/components/Sort.jsx';
import { SkeletonLoader } from '@/components/PizzaItem/SkeletonLoader.jsx';
import { PizzaBlock } from '@/components/PizzaItem/PizzaBlock.jsx';
import { Pagination } from '@/components/Pagination/Pagination.jsx';
import { SearchContext } from '@/App.jsx';
import { setCategoryIndex } from '@/redux/slices/filterSlice.js';

export const Home = () => {
  const { categoryIndex, sortType, sortOrder } = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pizzasLimit = 4;

  const skeletons = Array(6).fill(null).map((_, index) => <SkeletonLoader key={index} />);
  // если поисковая строка не пустая, используем отдельно запрошенный весь массив с сервера
  const filterItems = searchValue
                      ? allItems.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                      : items;

  const pizzas = filterItems.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const url = new URL('http://localhost:3000/items');

        if (searchValue) {
          url.searchParams.append('title_like', `${searchValue}`);
        } else {
          // пагинация
          url.searchParams.append('_page', `${currentPage}`);
          url.searchParams.append('_limit', `${pizzasLimit}`);
          // сортировка
          url.searchParams.append('_sort', `${sortType.sortProperty}`);
          url.searchParams.append('_order', `${sortOrder ? 'asc' : 'desc'}`);
          // 0 категория - это все пиццы
          if (categoryIndex > 0) {
            url.searchParams.append('category', `${categoryIndex}`);
          }
        }

        const response = await fetch(url);
        const data = await response.json();

        if (searchValue) {
          setAllItems(data);
        } else {
          const totalCount = response.headers.get('X-Total-Count');
          setTotalPages(Math.ceil(totalCount / pizzasLimit));
          setItems(data);
        }

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
        onChangeCurrentPage={number => setCurrentPage(number)}
        totalPages={totalPages}
        pizzasLimit={pizzasLimit}
      />
    </div>
  );
};

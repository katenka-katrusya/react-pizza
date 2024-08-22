import { useContext, useEffect, useState } from 'react';

import { Categories } from '@/components/Categories.jsx';
import { Sort } from '@/components/Sort.jsx';
import { SkeletonLoader } from '@/components/PizzaItem/SkeletonLoader.jsx';
import { PizzaBlock } from '@/components/PizzaItem/PizzaBlock.jsx';
import { Pagination } from '@/components/Pagination/Pagination.jsx';
import { SearchContext } from '@/App.jsx';

export const Home = () => {
  const {searchValue} = useContext(SearchContext);
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortOrder, setSortOrder] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const pizzasPerPage = 4;
  
  const skeletons = Array(6).fill(null).map((_, index) => <SkeletonLoader key={index} />)
  // если поисковая строка не пустая, используем отдельно запрошенный весь массив с сервера
  const filterItems = searchValue
                      ? allItems.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                      : items;
  const pizzas = filterItems?.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const url = new URL('http://localhost:3000/items');

        // 0 категория - это все пиццы
        if (categoryId > 0) {
          url.searchParams.append('category', `${categoryId}`);
        }

        // сортировка и пагинация
        url.searchParams.append('_sort', `${sortOrder ? sortType.sortProperty : '-' + sortType.sortProperty}`);
        url.searchParams.append('_page', `${currentPage}`);
        url.searchParams.append('_per_page', `${pizzasPerPage}`);

        const response = await fetch(url);
        const data = await response.json();
        setItems(data.data);
        setTotalPages(data.pages);
        setIsLoading(false);
      } catch (error) {
        console.log(`Error fetching data: ${error}`);
      }
    };
    fetchData();

    // window.scrollTo(0, 0);
  }, [categoryId, sortType, sortOrder, currentPage]);

  // Запрашиваем отдельно массив с сервера, т.к. из-за либы пагинации не отдает весь массив, а только текущую
  // страницу, поиск будет по всем страницам на клиенте, т.к. в json-server нет поиска в посл. версии.
  useEffect(() => {
    if (searchValue) {
      const fetchAllData = async() => {
        try {
          const response = await fetch('http://localhost:3000/items');
          const data = await response.json();
          setAllItems(data); // весь массив данных
        } catch (error) {
          console.log(`Error fetching all data: ${error}`);
        }
      }
      fetchAllData();
    }
  }, [searchValue]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryId}
          onClickCategory={(i) => setCategoryId(i)} />
        <Sort
          value={sortType}
          onClickSortType={(i) => setSortType(i)}
          onClickOrder={(sortOrder) => setSortOrder(sortOrder)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading ? skeletons : pizzas}
      </div>

      <Pagination
        onChangeCurrentPage={number => setCurrentPage(number)}
        totalPages={totalPages}
        pizzasPerPage={pizzasPerPage}
      />
    </div>
  )
}

import { useEffect, useState } from 'react';

import { Categories } from '@/components/Categories.jsx';
import { Sort } from '@/components/Sort.jsx';
import { SkeletonLoader } from '@/components/PizzaItem/SkeletonLoader.jsx';
import { PizzaBlock } from '@/components/PizzaItem/PizzaBlock.jsx';
import { useOutletContext } from 'react-router-dom';

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortOrder, setSortOrder] = useState(true);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  // const {search} = useOutletContext();

  // const filterItems = items.filter(item =>
  //   item.title.toLowerCase().includes(search.toLowerCase())
  // );

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const url = new URL('http://localhost:3000/items');

        if (categoryId > 0) {
          url.searchParams.append('category', `${categoryId}`);
        }

        url.searchParams.append('_sort', `${sortOrder ? sortType.sortProperty : '-' + sortType.sortProperty}`);

        const response = await fetch(url);
        const data = await response.json();
        setItems(data);
        setIsLoading(false);
      } catch (error) {
        console.log(`Error fetching data: ${error}`);
      }
    };

    fetchData();

    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortOrder]);

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
        {isLoading
         ? (Array(6).fill(null).map((_, index) => <SkeletonLoader key={index} />))
         : (items?.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />))
        }
      </div>
    </div>
  )
}

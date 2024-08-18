import { useEffect, useState } from 'react';

import { Categories } from '@/components/Categories.jsx';
import { Sort } from '@/components/Sort.jsx';
import { SkeletonLoader } from '@/components/PizzaItem/SkeletonLoader.jsx';
import { PizzaBlock } from '@/components/PizzaItem/PizzaBlock.jsx';

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://66bf2d2b42533c4031455133.mockapi.io/items');
        const data = await response.json();
        setItems(data);
        setIsLoading(false);
      } catch (error) {
        console.log(`Error fetching data: ${error}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
         ? (Array(6).fill(null).map((_, index) => <SkeletonLoader key={index} />))
         : (items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />))
        }
      </div>
    </div>
  )
}

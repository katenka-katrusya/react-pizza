import './scss/app.scss'
import { Header } from '@/components/Header.jsx';
import { Categories } from '@/components/Categories.jsx';
import { Sort } from '@/components/Sort.jsx';
import { PizzaBlock } from '@/components/PizzaBlock.jsx';
import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://66bf2d2b42533c4031455133.mockapi.io/items')
        const data = await response.json()
        console.log(data);
        setItems(data)
      } catch(error) {
        console.log(`Error fetching data: ${error}`);
      }
    }

    fetchData()
  }, []);

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

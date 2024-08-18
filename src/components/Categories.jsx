import { useState } from 'react';

export const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const categoryList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <ul className='categories'>
      {categoryList.map((item, index) => (
        <li key={index} onClick={() => setActiveCategory(index)}
            className={`categories__item ${activeCategory === index ? 'active' : ''}`}>
          {item}
        </li>
      ))}
    </ul>
  );
};

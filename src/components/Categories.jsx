import { useState } from 'react';

export const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const categoryList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {categoryList.map((item, index) => (
          <li key={index} onClick={() => setActiveCategory(index)}
              className={activeCategory === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

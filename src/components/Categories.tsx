import { FC } from 'react'

type CategoriesProps = {
  value: number,
  onClickCategory: (i: number) => void
}

const categoryList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: FC<CategoriesProps> = ({ value, onClickCategory }) => {
  return (
    <ul className='categories'>
      {categoryList.map((categoryName, i) => (
        <li key={i} onClick={() => onClickCategory(i)}
            className={`categories__item ${value === i ? 'active' : ''}`}>
          {categoryName}
        </li>
      ))}
    </ul>
  );
};

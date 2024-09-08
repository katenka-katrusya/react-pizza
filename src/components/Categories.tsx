import { FC, memo } from 'react'

type TCategories = {
  value: number,
  onClickCategory: (i: number) => void
}

const categoryList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: FC<TCategories> = memo(({ value, onClickCategory }) => {
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
})

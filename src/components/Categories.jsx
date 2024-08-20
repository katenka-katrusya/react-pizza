export const Categories = ({ value, onClickCategory }) => {
  const categoryList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <ul className='categories'>
      {categoryList.map((categoryName, index) => (
        <li key={index} onClick={() => onClickCategory(index)}
            className={`categories__item ${value === index ? 'active' : ''}`}>
          {categoryName}
        </li>
      ))}
    </ul>
  );
};

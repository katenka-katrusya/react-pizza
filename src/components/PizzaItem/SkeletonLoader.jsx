import ContentLoader from 'react-content-loader';

export const SkeletonLoader = () => {
  return (
    <ContentLoader
      className='pizza-block'
      speed={2}
      width={280}
      height={465}
      viewBox='0 0 280 465'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
    >
      {/* Круглое изображение пиццы */}
      <circle cx='140' cy='125' r='125' />

      {/* Заголовок */}
      <rect x='0' y='270' rx='5' ry='5' width='280' height='24' />

      {/* Тип теста, размер */}
      <rect x='0' y='310' rx='10' ry='10' width='280' height='88' />

      {/* Цена */}
      <rect x='0' y='415' rx='5' ry='5' width='100' height='32' />

      {/* Кнопка "Добавить" */}
      <rect x='145' y='412' rx='20' ry='20' width='130' height='42' />
    </ContentLoader>
  );
};

import s from './Search.module.scss';

export const Search = () => {
  return (
    <input className={s.search} type='text' placeholder='Поиск пиццы...' />
  );
};

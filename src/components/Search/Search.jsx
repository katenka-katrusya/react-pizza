import s from './Search.module.scss';
import { useState } from 'react';

export const Search = ({onSearch}) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const searchValue = e.target.value;
    setValue(searchValue);
    onSearch(searchValue);
  }

  return (
    <div className={s.wrapper}>
      <svg className={s.icon} clipRule='evenodd' fillRule='evenodd' strokeLinejoin='round' strokeMiterlimit='2'
           viewBox='0 0 24 24'
           xmlns='http://www.w3.org/2000/svg'>
        <g id='Icon'>
          <g>
            <path
              d='m10 3.5c-3.587 0-6.5 2.913-6.5 6.5s2.913 6.5 6.5 6.5 6.5-2.913 6.5-6.5-2.913-6.5-6.5-6.5zm0 1c3.036 0 5.5 2.464 5.5 5.5s-2.464 5.5-5.5 5.5-5.5-2.464-5.5-5.5 2.464-5.5 5.5-5.5z' />
            <path
              d='m20.354 19.646-5.759-5.758c-.195-.195-.512-.195-.707 0s-.195.512 0 .707l5.758 5.759c.196.195.512.195.708 0 .195-.196.195-.512 0-.708z' />
          </g>
        </g>
      </svg>
      <input
        value={value}
        onChange={handleChange}
        className={s.search}
        type='text'
        placeholder='Поиск пиццы...' />
    </div>
  );
};

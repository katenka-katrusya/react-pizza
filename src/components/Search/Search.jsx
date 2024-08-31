import s from './Search.module.scss';
import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '@/redux/slices/filterSlice.js';

export const Search = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const debounceSearch = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 300),
    []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    debounceSearch(e.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue('')); // очистка в state
    setValue(''); // локальная очистка
  };

  return (
    <label className={s.wrapper}>
      <svg className={s.icon} clipRule='evenodd' fillRule='evenodd' strokeLinejoin='round' strokeMiterlimit='2'
           viewBox='0 0 24 24'
           xmlns='http://www.w3.org/2000/svg'>
        <path
          d='m10 3.5c-3.587 0-6.5 2.913-6.5 6.5s2.913 6.5 6.5 6.5 6.5-2.913 6.5-6.5-2.913-6.5-6.5-6.5zm0 1c3.036 0 5.5 2.464 5.5 5.5s-2.464 5.5-5.5 5.5-5.5-2.464-5.5-5.5 2.464-5.5 5.5-5.5z' />
        <path
          d='m20.354 19.646-5.759-5.758c-.195-.195-.512-.195-.707 0s-.195.512 0 .707l5.758 5.759c.196.195.512.195.708 0 .195-.196.195-.512 0-.708z' />
      </svg>
      <input
        value={value}
        onChange={onChangeInput}
        className={s.search}
        type='text'
        placeholder='Поиск пиццы...' />

      {value &&
        <button onClick={onClickClear} className={s.closeBtn}>
          <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <rect width='24' height='24' fill='white'></rect>
            <path d='M7 17L16.8995 7.10051' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'></path>
            <path d='M7 7.00001L16.8995 16.8995' stroke='currentColor' strokeLinecap='round'
                  strokeLinejoin='round'></path>
          </svg>
        </button>
      }
    </label>
  );
};

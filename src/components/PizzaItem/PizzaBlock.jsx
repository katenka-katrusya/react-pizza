import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, selectCartItem } from '@/redux/slices/cartSlice.js'
import { Link } from 'react-router-dom'

const dough = ['тонкое', 'традиционное'];

export const PizzaBlock = ({ id, title, price, imageUrl, sizes, types }) => {
  const [activeSize, setActiveSize] = useState(0);
  const [activeDough, setActiveDough] = useState(0);

  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItem(id, sizes[activeSize], dough[activeDough]))

  const addCount = cartItem ? cartItem.count : 0;

  useEffect(() => {
    !types.includes(0) ? setActiveDough(1) : setActiveDough(0);
  }, []);

  const addPizzaToCart = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      size: sizes[activeSize],
      type: dough[activeDough],
    }
    dispatch(addItem(item))
  }

  return (
    <div className='pizza-block'>
      <Link to={`/pizza/${id}`}>
        <img
          className='pizza-block__image'
          src={imageUrl}
          alt='Pizza'
        />
        <h4 className='pizza-block__title'>{title}</h4>
      </Link>
      <div className='pizza-block__selector'>
        <ul>
          {types.map((type) => (
            <li key={type} onClick={() => setActiveDough(type)}
                className={activeDough === type ? 'active' : ''}>
              {dough[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li key={size} onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : ''}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className='pizza-block__bottom'>
        <div className='pizza-block__price'>от {price} ₽</div>
        <button onClick={addPizzaToCart} className='button button--outline button--add'>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span>Добавить</span>
          {addCount > 0 && <i>{addCount}</i>}
        </button>
      </div>
    </div>
  );
};

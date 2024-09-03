import { Link, useLocation } from 'react-router-dom'
import { Search } from '@/components/Search/Search.tsx'
import { useSelector } from 'react-redux'
import { selectCart } from '@/redux/slices/cartSlice.ts'
import { calculateTotalCount } from '@/helpers.ts'

export const Header = () => {
  const { totalPrice, items } = useSelector(selectCart)
  const location = useLocation()
  const totalCount = calculateTotalCount(items)

  return (
    <div className='header'>
      <div className='container'>
        <Link to='/' className='header__link-logo'>
          <div className='header__logo'>
            <img width='38' src='/img/pizza-logo.svg' alt='Pizza logo' />
            <div>
              <h1>Pizza</h1>
              <p>самая вкусная пицца во&nbsp;вселенной</p>
            </div>
          </div>
        </Link>

        {location.pathname !== '/cart' &&
          <Search />
        }

        <div className='header__cart'>
          <Link to='/cart' className='button button--cart'>
            <span>{totalPrice}&nbsp;₽</span>
            <div className='button__delimiter'></div>
            <img src='/img/cart.svg' alt='изображение корзины' />
            <span>{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

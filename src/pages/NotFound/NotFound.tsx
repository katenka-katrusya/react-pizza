import s from './NotFound.module.scss'
import { Link } from 'react-router-dom'
import { FC } from 'react'

const NotFound: FC = () => {
  return (
    <div className={`container ${s.container}`}>
      <h1 className={s.title}>404 <span className={s.subtitle}>Ой! Пицца не&nbsp;найдена</span> 🍕</h1>
      <div className={s.content}>
        <p className={s.text}>Кажется, вы&nbsp;потерялись. Но&nbsp;не&nbsp;переживайте, у&nbsp;нас есть много вкусных
          пицц!</p>
        <img
          src='https://cdn.dribbble.com/users/496146/screenshots/2331441/v1_animation_pizza.gif' // Ссылка на картинку
          alt='Потерянная пицца'
          className={s.image}
        />
      </div>
      <Link to='/' className={s.link}>Вернуться на главную</Link>
    </div>
  );
};

export default NotFound

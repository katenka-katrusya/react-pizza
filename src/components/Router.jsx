import App from '@/App.jsx';
import { createBrowserRouter } from 'react-router-dom';
import { NotFound } from '@/pages/NotFound/NotFound.jsx';
import { Cart } from '@/pages/Cart.jsx';
import { Home } from '@/pages/Home.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, // Маршрут для главной страницы ("/")
        element: <Home />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ]
  }
])
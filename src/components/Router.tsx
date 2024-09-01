import App from '@/App.tsx'
import { createBrowserRouter } from 'react-router-dom'
import { NotFound } from '@/pages/NotFound/NotFound.tsx'
import { Cart } from '@/pages/Cart.tsx'
import { Home } from '@/pages/Home.tsx'
import { FullPizza } from '@/components/FullPizza.tsx'

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
        path: '/pizza/:id',
        element: <FullPizza />
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ]
  }
])

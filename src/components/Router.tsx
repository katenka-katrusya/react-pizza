import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '@/App.tsx'
import NotFound from '@/pages/NotFound/NotFound.tsx'
import { Home } from '@/pages/Home.tsx'

const Cart = lazy(() => import('@/pages/Cart.tsx'))
const FullPizza = lazy(() => import('@//components/FullPizza.tsx'))

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
        element:
          <Suspense fallback={<div className='container'>Идёт загрузка корзины...</div>}>
            <Cart />
          </Suspense>
      },
      {
        path: '/pizza/:id',
        element:
          <Suspense>
            <FullPizza />
          </Suspense>
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

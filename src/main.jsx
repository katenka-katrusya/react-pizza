import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from '@/components/Router.jsx';

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

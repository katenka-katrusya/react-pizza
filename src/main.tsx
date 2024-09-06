import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/components/Router.tsx'
import { Provider } from 'react-redux'
import { store } from '@/redux/store.ts'

const rootElement = document.getElementById('root');
// const root = createRoot(document.getElementById('root'));

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  )
} else {
  console.error('Root element not found')
}

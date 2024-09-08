import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { router } from '@/components/Router.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from '@/redux/store.ts'

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={store}>
       <PersistGate persistor={persistor}>
         <RouterProvider router={router} />
       </PersistGate>
      </Provider>
    </StrictMode>
  )
} else {
  console.error('Root element not found')
}

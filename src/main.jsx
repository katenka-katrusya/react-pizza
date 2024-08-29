import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/components/Router.jsx';
import { Provider } from 'react-redux';
import { store } from '@/redux/store.js';

const root = createRoot(document.getElementById('root'));

root.render(
  //<StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  //</StrictMode>
);

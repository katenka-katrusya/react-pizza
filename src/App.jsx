import './scss/app.scss';
import { Header } from '@/components/Header.jsx';
import { Outlet} from 'react-router-dom';
import { createContext, useState } from 'react';

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className='wrapper'>
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header  />
        <div className='content'>
          <Outlet />
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;

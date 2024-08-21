import './scss/app.scss';
import { Header } from '@/components/Header.jsx';
import { Outlet} from 'react-router-dom';
import { useState } from 'react';


function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className='wrapper'>
      {/*<Header onSearch={(value) => setSearch(value)} />*/}
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className='content'>
        {/*<Outlet context={{ search }}/>*/}
        <Outlet />
      </div>
    </div>
  );
}

export default App;

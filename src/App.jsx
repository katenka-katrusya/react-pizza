import './scss/app.scss';
import { Header } from '@/components/Header.jsx';
import { Outlet} from 'react-router-dom';
import { useState } from 'react';


function App() {
  const [search, setSearch] = useState('');

  return (
    <div className='wrapper'>
      <Header onSearch={(value) => setSearch(value)} />
      <div className='content'>
        <Outlet context={{ search }}/>
      </div>
    </div>
  );
}

export default App;

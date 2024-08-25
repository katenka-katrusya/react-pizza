import './scss/app.scss';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header.jsx';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;

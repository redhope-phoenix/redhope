import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';
import "./styles/utils.css"
import "./styles/root.css"

import { Navbar } from './components/navbar/Navbar';
import { Home } from './pages/home-page/Home';
import { AppRoutes } from './routes/App.routes';
import { useEffect, useState } from 'react';

function App() {
  const [showNav, setShowNav] = useState(true);
  useEffect(() => {
    if (window.location.pathname.includes("/auth/")) setShowNav(false);
    else setShowNav(true);
  }, [])
  return (
    <>
      {showNav && <Navbar />}
      <main>
        <AppRoutes />
      </main>
      <footer className='text-center my-4 mt-5'>
        &copy;2024 Redhope. All rights are reserverd
      </footer>
    </>
  );
}

export default App;

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';
import "./styles/utils.css"
import "./styles/root.css"
import 'react-toastify/dist/ReactToastify.css';

import { Navbar } from './components/navbar/Navbar';
import { Home } from './pages/home-page/Home';
import { AppRoutes } from './routes/App.routes';
import { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import { useCurrentUser } from './hooks/current-user';

function App() {
  const [showNav, setShowNav] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("/auth/")) setShowNav(false);
    else setShowNav(true);
  }, [location])

  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AuthContext);
  const currentUser = useCurrentUser();

  return (
    <>
      {showNav && <Navbar />}
      <main>
        {(showNav && currentUser && !currentUser.isBloodGropAdded && !currentUser.isContactInfoFilled) &&
          <div style={{ width: "100%" }} className='d-flex justify-content-center'>< div className='ph-nav-flag' onClick={() => navigate("/profile-edit")}>
            <div>Complete your profile to access the all features. Add address and blood group.</div>
            <div><span><i class="ri-arrow-right-s-line"></i></span></div>
          </div></div>}

        <AppRoutes />
      </main>
      {!location.pathname.includes("/health-assistant")&&<footer className='text-center my-4 mt-5'>
        &copy;2025 Redhope. All rights are reserverd
      </footer>}

      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"dark"}
      />
    </>
  );
}

export default App;

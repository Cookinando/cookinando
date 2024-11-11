import { Outlet } from 'react-router-dom';
import { Footer } from "../components/Footer.jsx";
import { Navbar } from "../components/Navbar.jsx";
import backgroundImage from '../assets/images/fondo_layout.svg';
import { useAuth } from '../context/AuthContext.jsx'; 
import { useEffect } from 'react';

export const Layout = () => {
  const { checkTokenExpiration, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const intervalId = setInterval(() => {
        checkTokenExpiration();
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [checkTokenExpiration, isAuthenticated]);

  return (
    <div
      className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-cover bg-center bg-fixed font-ABeeZee"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
        <Navbar />
          <div>
            <Outlet />
          </div>
        <Footer />
      </div>
  );
};

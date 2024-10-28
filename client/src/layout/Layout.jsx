import { Outlet } from 'react-router-dom';
import { Footer } from "../components/Footer.jsx";
import { Navbar } from "../components/Navbar.jsx";
import backgroundImage from '../assets/images/fondo_layout.svg'; 

const Layout = () => {
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
export default Layout;

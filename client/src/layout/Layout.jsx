import { Outlet } from 'react-router-dom';
import { Footer } from "../components/Footer.jsx";
import { Navbar } from "../components/Navbar.jsx";
import backgroundImage from '../assets/images/fondo_layout.png'; 

const Layout = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar /> {}
        <Outlet />
      <Footer /> {}
      </div>
  );
};
export default Layout;

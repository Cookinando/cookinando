import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer.jsx";
import { Navbar } from "../components/Navbar.jsx";
import backgroundImage from "../assets/images/fondo_layout.svg";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const Layout = () => {
  const { checkTokenExpiration, isAuthenticated, sessionExpired } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const intervalId = setInterval(() => {
        checkTokenExpiration();
      }, 600000);

      return () => clearInterval(intervalId);
    }

    return;
  }, [checkTokenExpiration, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated && sessionExpired) {
      Swal.fire({
        title: "Su sesión ha expirado",
        text: "Por favor inicie sesión",
        icon: "error",
        customClass: {
          popup: "bg-dark-light text-light",
          title: "text-light font-bold text-lg",
          htmlContainer: "text-light text-sm",
          confirmButton:
            "bg-light-dark hover:bg-green-600 text-white font-semibold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      }).then(() => {
        navigate("/login");
      });
    }
  }, [isAuthenticated, sessionExpired, navigate]);

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

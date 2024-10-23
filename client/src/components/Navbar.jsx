import logo from '../assets/images/cookinando_logo.png';
// import React, { createContext, useContext } from 'react'; 
import  { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export const Navbar = () => {
  const auth = useAuth();
  const isAuthenticated = auth ? auth.isAuthenticated : true;

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
      navigate(path);
  };

  return (
    <nav class= " navbar flex justify-between lg:px-8" aria-label="Global">
         <div class= 'w-48 h-48'>
                        <img src={logo} alt='logo'/> 
                    </div>
        <ul class="flex space-x-6 mt-10">
            {!isAuthenticated && (
                <>
                    {/* Página Principal sin logar*/}
                    {location.pathname === "/" && (
                        <>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/login")}>Iniciar sesión</a></li>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/signup")}>Registrase</a></li>
                        </>
                    )}

                    {/* Página de Login*/}
                    {location.pathname === "/login" && (
                        <>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/")}>Inicio</a></li>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/signup")}>Registrarse</a></li>
                        </>
                    )}

                    {/* Página de Sign Up*/}
                    {location.pathname === "/signup" && (
                        <>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/")}>Inicio</a></li>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/login")}>Inciar sesión</a></li>
                        </>
                    )}
                </>
            )}

            {isAuthenticated && (
                <>
                    {/* Página Principal con login*/}
                    {(location.pathname === "/") && (
                        <>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/about")}>Sobre Nosotros</a></li>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/contact")}>Contacto</a></li>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/login")}>Cerrar Sesión</a></li>
                        </>
                    )}

                    {/* Página de ReceiptDetail*/}
                    {location.pathname.startsWith("/recetas/") && (
                        <>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/")}>Recetas</a></li>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/about")}>Sobre Nosotros</a></li>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/contact")}>Contacto</a></li>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/login")}>Cerrar Sesión</a></li>
                        </>
                    )} 

                    {/* Páginade About*/}
                    {location.pathname === "/about" && (
                        <>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/")}>Recetas</a></li>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/contact")}>Contacto</a></li>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/login")}>Cerrar Sesión</a></li>
                        </>
                    )}

                    {/* Página de Contacto*/}
                    {location.pathname === "/contact" && (
                        <>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/")}>Recetas</a></li> 
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/about")}>Sobre Nosotros</a></li>
                            <li class= "text-[#BEBDA7]"><a onClick={() => handleNavigation("/login")}>Cerrar Sesión</a></li>
                        </>
                    )}
                </>
            )}
        </ul> 
    </nav>
  );
};
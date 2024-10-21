import logo from '../assets/images/cookinando_logo.png';
import React, { createContext, useContext, useState, useNavigate } from 'react'; 
import { useAuth } from '../context/AuthContext';


export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = (path) => {
      navigate(path);
  };

  return (
    <nav className="navbar">
        <ul>
            {!isAuthenticated && (
                <>
                    {/* Página Principal sin logar*/}
                    {location.pathname === "/" && (
                        <>
                            <li><button onClick={() => handleNavigation("/login")}>Iniciar sesión</button></li>
                            <li><button onClick={() => handleNavigation("/signup")}>Registrase</button></li>
                        </>
                    )}

                    {/* Página de Login: mostrar Inicio y Sign Up */}
                    {location.pathname === "/login" && (
                        <>
                            <li><button onClick={() => handleNavigation("/")}>Inicio</button></li>
                            <li><button onClick={() => handleNavigation("/signup")}>Sign Up</button></li>
                        </>
                    )}

                    {/* Página de Sign Up: mostrar Inicio y Login */}
                    {location.pathname === "/signup" && (
                        <>
                            <li><button onClick={() => handleNavigation("/")}>Inicio</button></li>
                            <li><button onClick={() => handleNavigation("/login")}>Login</button></li>
                        </>
                    )}
                </>
            )}

            {/* Si estás autenticado */}
            {isAuthenticated && (
                <>
                    {/* Página Principal y de Recetas: mostrar Sobre Nosotros, Recetas, Contacto y Logout */}
                    {(location.pathname === "/" || location.pathname.includes("/recetas")) && (
                        <>
                            <li><button onClick={() => handleNavigation("/about")}>Sobre Nosotros</button></li>
                            <li><button onClick={() => handleNavigation("/recetas")}>Recetas</button></li>
                            <li><button onClick={() => handleNavigation("/contact")}>Contacto</button></li>
                            <li><button onClick={logout}>Cerrar Sesión</button></li>
                        </>
                    )}

                    {/* Página de Contacto: mostrar Sobre Nosotros, Recetas y Logout */}
                    {location.pathname === "/contact" && (
                        <>
                            <li><button onClick={() => handleNavigation("/about")}>Sobre Nosotros</button></li>
                            <li><button onClick={() => handleNavigation("/recetas")}>Recetas</button></li>
                            <li><button onClick={logout}>Cerrar Sesión</button></li>
                        </>
                    )}
                </>
            )}
        </ul>
    </nav>
);
};

// export const Navbar = () => {
//   const { isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleNavigation = (path) => {
//       navigate(path);
//   };
//     return (
//         <nav class= "flex justify-between lg:px-8" aria-label="Global">
//         <div class= 'w-48 h-48'>
//           <img src={logo} alt='logo'/> 
//         </div>
//         <ul class="flex space-x-6 mt-10">
//           <li class= "text-[#BEBDA7]">
//             Sobre Nosotros
//           </li>
//           <li class= "text-[#BEBDA7]">
//            Recetas
//           </li>
//           <li class= "text-[#BEBDA7]">
//             Contacto
//           </li>
//           <li class= "text-[#BEBDA7]">
//             Iniciar Sesión
//           </li>
//           <li class= "text-[#BEBDA7]">
//            Registrarse
//           </li>
//         </ul>
//       </nav>
//     );
//   };
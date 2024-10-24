import logo from '../assets/images/cookinando_logo.png';
import  { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import profile from '../assets/images/icon_profile.svg';


export const Navbar = () => {
  const auth = useAuth();
  const isAuthenticated = auth ? auth.isAuthenticated : true;

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
      navigate(path);
  };

  return (
    <nav className= " navbar flex justify-between lg:px-8" aria-label="Global">
         <div className= 'w-48 h-48'>
                        <img src={logo} alt='logo'/> 
                    </div>
        <ul className="flex space-x-6 mt-10">
            {!isAuthenticated && (
                <>
                    {/* Página Principal sin logar*/}
                    {location.pathname === "/" && (
                        <>
                            <li className= "text-light pointer-events-auto"><a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/login")}>Iniciar sesión</a></li>
                            <li className= "text-light pointer-events-auto"><a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/signup")}>Registrase</a></li>
                        </>
                    )}

                    {/* Página de Login*/}
                    {location.pathname === "/login" && (
                        <>
                            <li className= "text-light pointer-events-auto"><a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/")}>Recetas</a></li>
                            <li className= "text-light pointer-events-auto"><a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/signup")}>Registrarse</a></li>
                        </>
                    )}

                    {/* Página de Sign Up*/}
                    {location.pathname === "/signup" && (
                        <>
                            <li className= "text-light pointer-events-auto"><a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/")}>Recetas</a></li>
                            <li className= "text-light pointer-events-auto"><a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/login")}>Inciar sesión</a></li>
                        </>
                    )}
                </>
            )}

            {isAuthenticated && (
                <>
                    {/* Página Principal con login*/}
                    {(location.pathname === "/") && (
                        <>
                            <li className= "text-light pointer-events-auto"><a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/login")}>Cerrar Sesión</a></li>
                            <li className= "pointer-events-auto"> <a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/profile")}> <img className= "h-5" src={profile} alt="Profile icon" /></a></li>
                        </>
                    )}

                    {/* Página de ReceiptDetail*/}
                    {location.pathname.startsWith("/recipe/") && (
                        <>
                            <li className= "text-light pointer-events-auto"><a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/")}>Recetas</a></li>
                            <li className= "text-light pointer-events-auto"><a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/login")}>Cerrar Sesión</a></li>
                            <li className="pointer-events-auto"><a onClick={() => handleNavigation("/profile")}> <img className= "h-5" src={profile} alt="Profile icon" /></a></li>
                        </>
                    )} 

                    {/* Página de Profile*/}
                    {location.pathname === "/profile" && (
                        <>
                            <li className= "text-light pointer-events-auto"><a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/")}>Recetas</a></li>
                            <li className= "text-light pointer-events-auto"><a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/login")}>Cerrar Sesión</a></li>
                        </>
                    )}
                </>
            )}
        </ul> 
    </nav>
  );
};
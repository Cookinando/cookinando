import logo from '../assets/images/cookinando_logo.png';
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
                            <li className= "text-light"><a onClick={() => handleNavigation("/login")}>Iniciar sesión</a></li>
                            <li className= "text-light"><a onClick={() => handleNavigation("/signup")}>Registrase</a></li>
                        </>
                    )}

                    {/* Página de Login*/}
                    {location.pathname === "/login" && (
                        <>
                            <li className= "text-light"><a onClick={() => handleNavigation("/")}>Inicio</a></li>
                            <li className= "text-light"><a onClick={() => handleNavigation("/signup")}>Registrarse</a></li>
                        </>
                    )}

                    {/* Página de Sign Up*/}
                    {location.pathname === "/signup" && (
                        <>
                            <li className= "text-light"><a onClick={() => handleNavigation("/")}>Inicio</a></li>
                            <li className= "text-light"><a onClick={() => handleNavigation("/login")}>Inciar sesión</a></li>
                        </>
                    )}
                </>
            )}

            {isAuthenticated && (
                <>
                    {/* Página Principal con login*/}
                    {(location.pathname === "/") && (
                        <>
                            <li className= "text-light"><a onClick={() => handleNavigation("/about")}>Sobre Nosotros</a></li>
                            <li className= "text-light"><a onClick={() => handleNavigation("/contact")}>Contacto</a></li>
                            <li className= "text-light"><a onClick={() => handleNavigation("/login")}>Cerrar Sesión</a></li>
                        </>
                    )}

                    {/* Página de ReceiptDetail*/}
                    {location.pathname.startsWith("/recipe/") && (
                        <>
                            <li className= "text-light"><a onClick={() => handleNavigation("/")}>Recetas</a></li>
                            <li className= "text-light"><a onClick={() => handleNavigation("/about")}>Sobre Nosotros</a></li>
                            <li className= "text-light"><a onClick={() => handleNavigation("/contact")}>Contacto</a></li>
                            <li className= "text-light"><a onClick={() => handleNavigation("/login")}>Cerrar Sesión</a></li>
                        </>
                    )} 

                    {/* Páginade About*/}
                    {location.pathname === "/about" && (
                        <>
                            <li className= "text-light"><a onClick={() => handleNavigation("/")}>Recetas</a></li>
                            <li className= "text-light"><a onClick={() => handleNavigation("/contact")}>Contacto</a></li>
                            <li className= "text-light"><a onClick={() => handleNavigation("/login")}>Cerrar Sesión</a></li>
                        </>
                    )}

                    {/* Página de Contacto*/}
                    {location.pathname === "/contact" && (
                        <>
                            <li className= "text-light"><a onClick={() => handleNavigation("/")}>Recetas</a></li> 
                            <li className= "text-light"><a onClick={() => handleNavigation("/about")}>Sobre Nosotros</a></li>
                            <li className= "text-light"><a onClick={() => handleNavigation("/login")}>Cerrar Sesión</a></li>
                        </>
                    )}
                </>
            )}
        </ul> 
    </nav>
  );
};
import { useState } from 'react';
import logo from '../assets/images/cookinando_logo.png';
import hamburguer from '../assets/images/icon_hamburger_menu.svg';
import  { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import profile from '../assets/images/icon_profile.svg';
import closeIcon from '../assets/images/close_icon.svg';


export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); 
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
        setMenuOpen(false); 
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);
    return (
        <nav className={`navbar flex justify-between lg:flex-row lg:px-8 items-start ${menuOpen ? 'bg-transparent fixed inset-0' : ''}`} aria-label="Global">
            <div className={`lg:w-48 lg:h-48 w-32 h-32 ${menuOpen ? 'hidden' : 'block'}`}>
                <img src={logo} alt='logo'/> 
            </div>
            <button
                className="lg:hidden block m-5 mt-7 z-60 relative" 
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
            <img src={hamburguer} alt=""/>
            </button>

            {/* Menú */}
            <ul
                className={`${
                    menuOpen ? 'bg-dark w-scree fixed inset-0 flex flex-col justify-center items-center z-50' : 'hidden'
                } lg:flex lg:space-x-6 lg:mt-10 flex flex-col lg:flex-row space-y-4 lg:space-y-0`}
            >
                {!isAuthenticated && (
                    <>
                        <li className= "pointer-events-auto w-screen flex justify-center lg:hidden"> <a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("#")}> <img className= "h-5" src={closeIcon} alt="Profile icon" /></a></li>
                        <li className= "text-light pointer-events-auto"><a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/")}>Recetas</a></li>
                        <li className= "text-light pointer-events-auto"><a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/login")}>Iniciar sesión</a></li>
                        <li className= "text-light pointer-events-auto"><a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/signup")}>Registrase</a></li>
                    </>
                )}
                {isAuthenticated && (

                    <>
                        <li className= "pointer-events-auto w-screen flex justify-center lg:hidden"> <a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("#")}> <img className= "h-5" src={closeIcon} alt="Profile icon" /></a></li>
                        <li className= "text-light pointer-events-auto"><a className="cursor-pointer hover:text-gray-300" 
                            onClick={() => {
                            logout();     
                            handleNavigation("/login")}}>Cerrar Sesión</a></li>
                        <li className= "pointer-events-auto"> <a className="cursor-pointer hover:text-gray-300" onClick={() => handleNavigation("/profile")}> <img className= "h-5" src={profile} alt="Profile icon" /></a></li>
                    </>
                )}
            </ul> 
        </nav>
    );
    };
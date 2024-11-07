import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import profile from '../assets/images/icon_profile.svg';
import closeIcon from '../assets/images/close_icon.svg';
import logo from '../assets/images/cookindando_logo2.png';
import hamburguer from '../assets/images/icon_hamburger_menu.svg';


export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); 
    const { isAuthenticated, logout } = useAuth();
    

    const toggleMenu = () => setMenuOpen(!menuOpen);
    return (
        <nav className={`navbar flex justify-between lg:flex-row lg:px-8 items-start ${menuOpen ? 'bg-transparent fixed inset-0' : ''}`} aria-label="Global">
            <div className={`w-36 h-36 p-5 lg:mt-8 lg:p-0 ${menuOpen ? 'hidden' : 'block'}`}>
                <img src={logo} alt='logo'/> 
            </div>
            <button
                className="lg:hidden block m-5 mt-7 z-60 relative" 
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
            <img src={hamburguer} alt=""/>
            </button>

           
            <ul
                className={`${
                    menuOpen ? 'lg:bg-transparent bg-dark w-scree fixed inset-0 flex flex-col lg:flex-row justify-center lg:justify-end items-center lg:items-start lg:mb-5  z-50' : 'hidden'
                } lg:flex lg:space-x-6 lg:mt-10 flex flex-col lg:flex-row space-y-4 lg:space-y-0`}
            >
                {!isAuthenticated && (
                    <>
                        <li className= "pointer-events-auto w-screen flex justify-center lg:hidden"> <Link to="#" className="cursor-pointer hover:text-gray-300" onClick={() => setMenuOpen(false)}> <img className= "h-5" src={closeIcon} alt="Profile icon" /></Link></li>
                        <li className= "text-light pointer-events-auto"><Link to="/"className="cursor-pointer hover:text-gray-300" onClick={() => setMenuOpen(false)}>Recetas</Link></li>
                        <li className= "text-light pointer-events-auto"><Link to="/login" className="cursor-pointer hover:text-gray-300" onClick={() => setMenuOpen(false)}>Iniciar sesión</Link></li>
                        <li className= "text-light pointer-events-auto"><Link to="/signup" className="cursor-pointer hover:text-gray-300" onClick={() => setMenuOpen(false)}>Registrarse</Link></li>
                    </>
                )}
                {isAuthenticated && (
                    <>
                        <li className= "pointer-events-auto w-screen flex justify-center lg:hidden"> <Link to="#" className="cursor-pointer hover:text-gray-300" onClick={() => setMenuOpen(false)}> <img className= "h-5" src={closeIcon} alt="Profile icon" /></Link></li>
                        <li className= "text-light pointer-events-auto"><Link to="/"className="cursor-pointer hover:text-gray-300" onClick={() => setMenuOpen(false)}>Recetas</Link></li>
                        <li className= "text-light pointer-events-auto"><Link to= "/login" className="cursor-pointer hover:text-gray-300" 
                            onClick={() => {
                            logout();     
                            setMenuOpen(false)}}>Cerrar Sesión</Link></li>
                        <li className= "pointer-events-auto"> <Link to="auth/profile" className="cursor-pointer hover:text-gray-300" onClick={() => setMenuOpen(false)}> <img className= "h-5" src={profile} alt="Profile icon" /></Link></li>
                    </>
                )}
            </ul> 
        </nav>
    );
    };
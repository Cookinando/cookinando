import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import profile from "../assets/images/icon_profile.svg";
import closeIcon from "../assets/images/close_icon.svg";
import logo from "../assets/images/cookindando_logo2.png";
import hamburguer from "../assets/images/icon_hamburger_menu.svg";

export const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [isScrolled, setIsScrolled] = useState(false);
	const { isAuthenticated, logout } = useAuth();

	useEffect(() => {
		const handleScroll = () => {
		  const currentScrollPosition = window.scrollY;
		  setScrollPosition(currentScrollPosition);
		  setIsScrolled(currentScrollPosition > 1);
		};

		window.addEventListener("scroll", handleScroll);
	
		return () => {
		  window.removeEventListener("scroll", handleScroll);
		};
	  }, []);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
		<nav
			className={`navbar flex justify-between md:flex-row md:px-8 items-start sticky top-0 z-50 transition-colors duration-300 ${
				menuOpen ? "bg-transparent fixed inset-0" : ""
			} ${isScrolled ? "bg-dark bg-opacity-90" : "bg-transparent"}`}
			aria-label="Global">
			<div
				className={`w-36  ${
					menuOpen ? "hidden" : "block"
				} ${isScrolled ? "h-12 p-5 md:pt-[0.65rem]" : "md:h-16 p-5 md:mt-8 md:p-0"}`}>
				<Link
					to="/"
					className="hover:opacity-70 duration-300 ease-in-out">
					<img src={logo} alt="logo" />
				</Link>
			</div>
			<button
				className="md:hidden block m-5 mt-7 z-60 relative"
				onClick={toggleMenu}
				aria-label="Toggle menu">
				<img src={hamburguer} alt="" />
			</button>

			<ul
				className={`${
					menuOpen
						? "md:bg-transparent bg-dark w-screen fixed inset-0 flex flex-col md:flex-row justify-center md:justify-end items-center md:items-start md:mb-5 z-50"
						: "hidden"
				} md:flex md:space-x-6 flex flex-col md:flex-row space-y-4 md:space-y-0 ${isScrolled ? "md:mt-4" : "md:mt-10"}`}>
				{!isAuthenticated && (
					<>
						<li className="pointer-events-auto w-screen flex justify-center md:hidden">
							{" "}
							<Link
								to="#"
								className="cursor-pointer hover:text-gray-300"
								onClick={() => setMenuOpen(false)}>
								{" "}
								<img
									className="h-5"
									src={closeIcon}
									alt="Close icon"
								/>
							</Link>
						</li>
						<li className="text-light pointer-events-auto">
							<Link
								to="/"
								className="cursor-pointer hover:text-gray-300"
								onClick={() => setMenuOpen(false)}>
								Home
							</Link>
						</li>
						<li className="text-light pointer-events-auto">
							<Link
								to="/login"
								className="cursor-pointer hover:text-gray-300"
								onClick={() => setMenuOpen(false)}>
								Iniciar sesión
							</Link>
						</li>
						<li className="text-light pointer-events-auto">
							<Link
								to="/signup"
								className="cursor-pointer hover:text-gray-300"
								onClick={() => setMenuOpen(false)}>
								Registrarse
							</Link>
						</li>
					</>
				)}
				{isAuthenticated && (
					<>
						<li className="pointer-events-auto w-screen flex justify-center md:hidden">
							{" "}
							<Link
								to="#"
								className="cursor-pointer hover:text-gray-300"
								onClick={() => setMenuOpen(false)}>
								{" "}
								<img
									className="h-5"
									src={closeIcon}
									alt="Profile icon"
								/>
							</Link>
						</li>
						<li className="text-light pointer-events-auto">
							<Link
								to="/"
								className="cursor-pointer hover:text-gray-300"
								onClick={() => setMenuOpen(false)}>
								Home
							</Link>
						</li>
						<li className="text-light pointer-events-auto">
							<Link
								to="/login"
								className="cursor-pointer hover:text-gray-300"
								onClick={() => {
									logout();
									setMenuOpen(false);
								}}>
								Cerrar Sesión
							</Link>
						</li>
						<li className="pointer-events-auto">
							{" "}
							<Link
								to="auth/profile"
								className="cursor-pointer hover:opacity-70 duration-300 ease-in-out"
								onClick={() => setMenuOpen(false)}>
								{" "}
								<img
									className="h-5"
									src={profile}
									alt="Profile icon"
								/>
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		return Boolean(localStorage.getItem("authToken"));
	});
	const [user, setUser] = useState(null);
	const [isAdmin, setIsAdmin] = useState(() => {
		return Boolean(localStorage.getItem("isAdmin"));
	});
	const [sessionExpired, setSessionExpired] = useState(false);

	const login = async (token, role) => {
		const expirationTime = (new Date().getTime() + 7200000).toString();
		localStorage.setItem("authToken", token);
		localStorage.setItem("tokenExpiration", expirationTime);
		if (role === "admin") {
			localStorage.setItem("isAdmin", true);
			setIsAdmin(true);
		}
		setIsAuthenticated(true);
		setSessionExpired(false);
		decodeTokenAndSetUser(token);
	};

	const logout = (expired = false) => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("isAdmin");
		localStorage.removeItem("tokenExpiration");
		setIsAuthenticated(false);
		setUser(null);
		setIsAdmin(false);
		setSessionExpired(expired);
	};

	const decodeTokenAndSetUser = (token) => {
		try {
			const decoded = jwtDecode(token);
			setUser({
				id: decoded.id,
				username: decoded.username,
				email: decoded.email,
				role: decoded.role,
			});
		} catch (error) {
			console.error("Error decoding token", error);
			logout();
		}
	};

	const checkTokenExpiration = () => {
		const tokenExpiration = localStorage.getItem("tokenExpiration");
		const currentTime = new Date().getTime().toString();

		if (tokenExpiration && currentTime > tokenExpiration) {
			console.log("Token expired during check");
			logout(true);
		} else {
			console.log("Token still valid during check");
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		const isAdmin = localStorage.getItem("isAdmin");
		if (token) {
			checkTokenExpiration();
			setIsAuthenticated(true);
			decodeTokenAndSetUser(token);
			if (isAdmin) {
				setIsAdmin(true);
			}
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				setUser,
				login,
				logout,
				isAdmin,
				checkTokenExpiration,
				sessionExpired,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

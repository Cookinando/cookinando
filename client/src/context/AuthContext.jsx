import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('authToken');
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        const currentTime = new Date().getTime().toString();
        
        if (!token || currentTime > tokenExpiration) {
            console.log('Token missing or expired during initialization'); 
        }
        console.log('Token valid during initialization'); 
        return true;
    });

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(() => Boolean(localStorage.getItem('isAdmin')));

    const login = async (token, role) => {
        const expirationTime = (new Date().getTime() + 10000).toString(); 
        localStorage.setItem("authToken", token);
        localStorage.setItem("tokenExpiration", expirationTime);

        if (role === 'admin') {
            localStorage.setItem("isAdmin", "true");
            setIsAdmin(true);
        }

        setIsAuthenticated(true);
        decodeTokenAndSetUser(token);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("tokenExpiration");
        setIsAuthenticated(false);
        setUser(null);
        setIsAdmin(false);
        console.log('Logged out and redirected to login page'); 
        window.location.href = '/';
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
            console.log('Token expired during check'); 
            logout();
        } else {
            console.log('Token still valid during check'); 
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }
        } else {
            checkTokenExpiration();
            setIsAuthenticated(true);
            decodeTokenAndSetUser(token);
            if (localStorage.getItem("isAdmin") === "true") {
                setIsAdmin(true);
            }

            const interval = setInterval(checkTokenExpiration, 1000);

            return () => clearInterval(interval);
        }
    },[]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
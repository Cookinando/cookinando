import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (token) => {
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true);
        decodeTokenAndSetUser(token);
    };

    const logout = () => {
        localStorage.removeItem("authToken"); 
        setIsAuthenticated(false);
        setUser(null);
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

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true);
            decodeTokenAndSetUser(token); 
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

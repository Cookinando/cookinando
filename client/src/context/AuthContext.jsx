import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
      return Boolean(localStorage.getItem('authToken'));
    });
    
    const [user, setUser] = useState(null);

    const [ isAdmin, setIsAdmin ] = useState(() => {
        return Boolean(localStorage.getItem('isAdmin'));
    });

    const login = async (token, role) => {
        localStorage.setItem("authToken", token);
        if (role === 'admin') {
            localStorage.setItem("isAdmin", true);
            setIsAdmin(true)
        }
        setIsAuthenticated(true);
        decodeTokenAndSetUser(token);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("isAdmin")
        setIsAuthenticated(false);
        setUser(null);
        setIsAdmin(false)
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
        const isAdmin = localStorage.getItem("isAdmin");
        if (token) {
            setIsAuthenticated(true);
            decodeTokenAndSetUser(token); 
            if (isAdmin) {
                setIsAdmin(true);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setUser, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

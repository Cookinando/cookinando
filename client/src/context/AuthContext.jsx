import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
      return Boolean(localStorage.getItem('authToken'));
    });
    
    const [user, setUser] = useState(null);

    const [userRole, setUserRole] = useState(null);

    const [ isAdmin, setIsAdmin] = useState(() => {
        return Boolean(localStorage.getItem('role'));
    });

    const login = async (token, role) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("role", role);
        setIsAuthenticated(true);
        decodeTokenAndSetUser(token);
        setUserRole(role);
    };

    // const isAdmin = userRole === 'admin';

    const logout = () => {
        localStorage.removeItem("authToken"); 
        setIsAuthenticated(false);
        setUser(null);
        setUserRole(null);
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
        const role = localStorage.getItem("role");
        if (token) {
            setIsAuthenticated(true);
            decodeTokenAndSetUser(token); 
            if (role === 'admin') {
                setIsAdmin(true);
            }
        }
       
        
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

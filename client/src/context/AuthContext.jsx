import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = () => {
        setIsAuthenticated(true);
        fetchUser(); 
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null); 
    };

    const fetchUser = async () => {
        const userData = {
            username: "testuser",
            email: "testuser@example.com",
            isAdmin: true,
        };
        setUser(userData);
    };

    useEffect(() => {
        
        if (isAuthenticated) {
            fetchUser();
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

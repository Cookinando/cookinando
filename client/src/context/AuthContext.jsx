import React, { createContext, useContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Función para iniciar sesión
    const login = async (token) => {
        localStorage.setItem("authToken", token); // Guarda el token en localStorage
        setIsAuthenticated(true);
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem("authToken"); // Elimina el token de localStorage
        setIsAuthenticated(false);
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true); // Verifica si hay un token y establece la autenticación
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

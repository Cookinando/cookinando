import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

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
        decodeTokenAndSetUser(token); // Decodifica el token y establece el usuario
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem("authToken"); // Elimina el token de localStorage
        setIsAuthenticated(false);
        setUser(null);
    };

    // Decodifica el token para extraer los datos del usuario
    const decodeTokenAndSetUser = (token) => {
        try {
            const decoded = jwtDecode(token); // Decodifica el token
            setUser({
                username: decoded.username,
                email: decoded.email,
                role: decoded.role, // Asegúrate de que el token incluya el rol
            });
        } catch (error) {
            console.error("Error decoding token", error);
            logout(); // Cierra sesión si el token no es válido
        }
    };

    // Efecto para verificar si hay un token al cargar la aplicación
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true);
            decodeTokenAndSetUser(token); // Decodifica el token y establece el usuario
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

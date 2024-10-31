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
        await fetchUser(); // Carga los datos del usuario
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem("authToken"); // Elimina el token de localStorage
        setIsAuthenticated(false);
        setUser(null);
    };

    // Función para obtener los datos del usuario
    const fetchUser = async () => {
        // Aquí puedes hacer una llamada a la API para obtener los datos del usuario autenticado
        const userData = {
            username: "testuser",
            email: "testuser@example.com",
            isAdmin: true,
        };
        setUser(userData);
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true); // Verifica si hay un token y establece la autenticación
            fetchUser(); // Carga los datos del usuario
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

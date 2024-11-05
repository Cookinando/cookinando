import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth(); // useAuth retorna si el usuario está autenticado

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};


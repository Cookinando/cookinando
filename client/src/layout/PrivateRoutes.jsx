import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};


export const PrivateAdminRoutes = () => {
    const { isAuthenticated, isAdmin } = useAuth();

    return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};


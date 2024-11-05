import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export const PrivateLayout = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const PrivateAdminLayout = () => {
    const { isAdmin } = useAuth();
    return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};


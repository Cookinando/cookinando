import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};


export const PrivateAdminRoutes = () => {
    return user.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
};


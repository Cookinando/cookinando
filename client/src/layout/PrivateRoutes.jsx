import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export const PrivateRoutes = ({children}) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};


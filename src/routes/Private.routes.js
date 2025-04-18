import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoutes = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    if (isAuthenticated) return children;
    else return <Navigate to={`/auth/login?to=${encodeURI(location.pathname)}`} />
}

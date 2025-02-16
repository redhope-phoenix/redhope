import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

export const PreloginRoutes = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated) return <Navigate to={'*'} />
    else return children;
}

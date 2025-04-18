import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';
import { ErrorPage } from '../pages/error-page/ErrorPage';

export const PreloginRoutes = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated) return <ErrorPage />
    else return children;
}

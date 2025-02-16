import React, { createContext, useEffect, useState } from 'react'
import axios from '../configs/axios-configs';
import { Spinner } from '../components/loaders/Spinner';
import { useCurrentUser } from '../hooks/current-user';
import "../styles/utils.css"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get("/user/check-auth")
                    .then(res => setIsAuthenticated(res?.data?.data?.isAuthenticated))
            } catch (error) {
                console.error(error);
                setIsAuthenticated(false);

            }
        }

        checkAuth();
    }, []);
    // fetch current user
    const currentUser = useCurrentUser();
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, currentUser }}>
            {isAuthenticated === null ? <LoadPage /> : children}
        </AuthContext.Provider>
    )
}

const LoadPage = () => {
    return (
        <div style={{ width: "100vw", height: "100vh", flexDirection: "column" }} className='d-flex align-items-center justify-content-center ph-blink-anim'>
            <img src={require("../assets/img/redhope-short.png")} alt="" width={150} />
            <div>Please wait...</div>
        </div>
    )
}

export default AuthContext;
import React from 'react'
import "./authPage.style.css"
import { NavLink, Outlet } from 'react-router-dom'
import { PopInput } from '../../components/inputs/PopInput'

export const AuthnticationPage = () => {
    return (
        <div className='container ph-auth-page-container'>
            <div className='ph-auth-box'>
                <div className='ph-auth-page-nav'>
                    <NavLink to="signup">
                        <button className='ph-auth-nav-opt'>Sign up</button>
                    </NavLink>
                    <NavLink to="login">
                        <button className='ph-auth-nav-opt'>Log in</button>
                    </NavLink>
                </div>
                <div className='ph-auth-outlet-container'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export const LoginPage = () => {
    return (
        <>
            <form action="">
                <div className='mb-2'><PopInput placeholder='Enter your email' type='email' /></div>
                <div className='mb-2'><PopInput placeholder='Enter your password' type='password' /></div>
            </form>
            <div className='align-self-end'>
                <button className="ph-btn ph-btn-primary ph-auth-btn">Login</button>
            </div>
        </>
    )
}

export const SignupPage = () => {
    return (
        <>
            <form action="">
                <div className='mb-2'><PopInput placeholder='Enter your Fullname' /></div>
                <div className='mb-2'><PopInput placeholder='Enter your email' type='email' /></div>
                <div className='mb-2'><PopInput placeholder='Enter your password' type='password' /></div>
            </form>
            <div className='align-self-end'>
                <button className="ph-btn ph-btn-primary ph-auth-btn">Register account</button>
            </div>
        </>
    )
}

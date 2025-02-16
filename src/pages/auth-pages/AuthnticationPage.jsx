import React, { useContext, useEffect, useState } from 'react'
import "./authPage.style.css"
import { Link, NavLink, Outlet, useSearchParams } from 'react-router-dom'
import { PopInput } from '../../components/inputs/PopInput'
import { Spinner } from '../../components/loaders/Spinner'
import axios from '../../configs/axios-configs'
import { toast } from 'react-toastify'
import isAdult from '../../utils/checkDOB'
import AuthContext from '../../contexts/AuthContext'

export const AuthnticationPage = () => {
    const [params] = useSearchParams();
    const redirectUri = params.get("to");
    return (
        <div className='container ph-auth-page-container'>
            <div className='ph-auth-box'>
                <div className='d-flex justify-content-center' style={{ padding: "1em" }}>
                    <img src={require("../../assets/img/redhope-logo.png")} alt="" width={200} />
                </div>
                <div className='ph-auth-page-nav'>
                    <NavLink to={redirectUri ? `signup?to=${redirectUri}` : "signup"}>
                        <button className='ph-auth-nav-opt'>Sign up</button>
                    </NavLink>
                    <NavLink to={redirectUri ? `login?to=${redirectUri}` : "login"}>
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
    const [loading, setLoading] = useState(false);
    // input data
    const [input, setInput] = useState({});
    const [params] = useSearchParams();
    const redirectUri = params.get("to");
    const handlLogin = async () => {
        if (!input?.email && !input?.password) {
            toast.error("All fields are requird");
            return;
        }
        setLoading(true);
        await axios.post("/user/login", input)
            .then(() => {
                window.location.href = redirectUri ? `${window.location.origin}${decodeURI(redirectUri)}` : window.location.origin;
            })
            .catch((error) => {
                if (error.response.status === 402) toast.error("User does not exist")
                else if (error.response.status === 403) toast.error("Incorrect password")
                console.log(error);
            })

        setLoading(false);
    }

    // document title
    useEffect(() => {
        document.title = "Login - Redhope"
    }, []);

    return (
        <>
            <form action="">
                <div className='mb-2'><PopInput placeholder='Enter your email' type='email' onChange={e => setInput({ ...input, email: e })} /></div>
                <div className='mb-2'><PopInput placeholder='Enter your password' type='password' onChange={e => setInput({ ...input, password: e })} /></div>
            </form>
            <div className='align-self-end'>
                <button className="ph-btn ph-btn-primary ph-auth-btn" disabled={loading} onClick={handlLogin}>{loading ? <Spinner /> : "Login"}</button>
            </div>
        </>
    )
}

export const SignupPage = () => {
    const [input, setInput] = useState({});
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();
    const redirectUri = params.get("to");
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleSignUp = async () => {
        if (input.userName?.length < 3) {
            toast.error("Username must contains atleast 3 charecters");
            return;
        }
        else if (input.password?.length < 5) {
            toast.error("Password must contains atleast 5 charecters")
            return;
        }
        if (!input.email) {
            toast.error("Email is required")
            return
        }
        if (!input.dateOfBirth || !isAdult(input?.dateOfBirth)) {
            toast.warn("User must be 18 or above");
            return;
        }
        try {
            setLoading(true);
            await axios.post("/user/register", input)
                .then(async () => {
                    await axios.post("/user/login", input)
                        .then(() => {
                            window.location.href = redirectUri ? `${window.location.origin}${redirectUri}` : window.location.origin;
                        })
                })
        } catch (error) {
            if (error?.response?.status === 402) toast.error("User already exists. Try to login.");
            console.log(error);

        }
        setLoading(false);
    }
    // document title
    useEffect(() => {
        document.title = "Sign up - Redhope"
    }, []);

    return (
        <>
            <form action="">
                <div className='mb-2'><PopInput placeholder='Enter your full name' onChange={e => setInput({ ...input, userName: e })} /></div>
                <div className='mb-2'><PopInput placeholder='Enter your email' type='email' onChange={e => setInput({ ...input, email: e })} /></div>
                <div className='mb-2'><PopInput placeholder='Enter your password' type='password' onChange={e => setInput({ ...input, password: e })} /></div>
                <div className='mb-2'>
                    <h6 className='mb-0 px-2'>Date of birth</h6>
                    <input type="date" name="" id="" onChange={e => setInput({ ...input, dateOfBirth: e.target.value })} placeholder='Date of birth'/>
                </div>
                <div>By continuing you are accepting our <Link to={'/terms'} className='ph-url-colored'>Terms & conditions</Link></div>
            </form>
            <div className='align-self-end'>
                <button className="ph-btn ph-btn-primary ph-auth-btn" disabled={loading} onClick={handleSignUp}>{loading ? <Spinner /> : "Register account"}</button>
            </div>
        </>
    )
}

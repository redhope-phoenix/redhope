import React, { useContext, useState } from 'react'
import "./navbar.style.css"
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from '../dropdown/Dropdown';
import { toast } from 'react-toastify';
import axios from '../../configs/axios-configs';
import AuthContext from '../../contexts/AuthContext';
import aiSvg from "../../assets/svg/doctor-ai.svg"
import ThemeContext from '../../contexts/ThemeContext';

export const Navbar = () => {
    const navigate = useNavigate();
    // handle nav dropdown
    const [openDropDown, setOpenDropDown] = useState(false);
    // current user 
    const { currentUser } = useContext(AuthContext);
    return (
        <header>
            <nav className="ph-navbar">
                <div>
                    <Link to="/">
                        <img src={require("../../assets/img/redhope-logo.png")} alt="" width={120} />
                    </Link>
                </div>
                <div className="ph-nav-opt-box">
                    <button className="ph-nav-btn " onClick={() => navigate("/health-assistant")} title='Health assistant'><img src={aiSvg} width={30} /></button>
                    <button className="ph-nav-btn " onClick={() => navigate("/notifications")}><i className="ri-notification-4-line fs-5"></i></button>
                    <div>
                        <button className="ph-nav-btn" onClick={(e) => { e.stopPropagation(); setOpenDropDown(!openDropDown) }}>
                            <img src={currentUser?.avatar || require("../../assets/img/profile-logo.png")} alt="" className='rounded-5' width={40} />
                        </button>
                        <div className='d-flex justify-content-end'>
                            <NavOptDropDown openState={openDropDown} onClose={() => setOpenDropDown(false)} currentUser={currentUser} />
                        </div>
                    </div>
                </div>
            </nav>

        </header >
    )
}

const NavOptDropDown = ({ openState, onClose }) => {
    const navigate = useNavigate();
    const { currentUser, isAuthenticated } = useContext(AuthContext)
    // handle log out
    const [logoutLoad, setLogoutLoad] = useState(false);
    const handleLogout = async () => {
        setLogoutLoad(true)
        await axios.get("/user/logout")
            .then(() => window.location.reload())
            .catch(err => toast.error("Unable to logout now!"))

        setLogoutLoad(false);
    }

    // handle theme change
    const { theme, setTheme } = useContext(ThemeContext);

    const handleThemeChange = (e) => {
        const theme = e.target.value;
        setTheme(theme);
    }

    return (
        <Dropdown openState={openState} onClose={onClose} closeOnBackClick >
            <div className='ph-nav-dropdown-content'>
                {isAuthenticated ?
                    <>
                        <div className='ph-nav-dropdown-profile-box d-flex align-items-center gap-2 mb-3' onClick={() => { navigate('/profile/requests'); onClose() }}>
                            <img src={currentUser?.avatar || require("../../assets/img/profile-logo.png")} alt="" width={50} className='rounded-5' />
                            <div>{currentUser?.userName}</div>
                        </div>
                        <div className='mb-3'>
                            <button className="ph-btn text-danger" onClick={handleLogout} disabled={logoutLoad} >
                                <span><i className="ri-logout-box-line"></i></span>
                                <span>{logoutLoad ? "Loging out..." : "Log out"}</span>
                            </button>
                        </div>
                    </> :
                    <div className='ph-nav-dropdown-profile-box d-flex align-items-center gap-2 mb-3 p-2 ph-btn-shadow text-primary' onClick={() => { navigate('/auth/login'); onClose() }}>
                        <span><i className="ri-login-box-line"></i></span>
                        <span>Signin</span>
                    </div>
                }
                <div className='d-flex justify-content-center mb-3'>
                    <div className='ph-nav-theme-opt-box'>
                        <label htmlFor="ph-theme-opt-1" className={`ph-theme-opt ${theme === "light" && "ph-theme-opt-active"}`} >
                            <input type="radio" name="ph-theme-opt" id="ph-theme-opt-1" className='d-none' value={"light"} onChange={handleThemeChange} />
                            <span className='ph-theme-opt-label'><i className="ri-sun-fill"></i></span>
                        </label>
                        <label htmlFor="ph-theme-opt-2" className={`ph-theme-opt ${theme === "dark" && "ph-theme-opt-active"}`}>
                            <input type="radio" name="ph-theme-opt" id="ph-theme-opt-2" className='d-none' value={"dark"} onChange={handleThemeChange} />
                            <span className='ph-theme-opt-label'><i className="ri-moon-fill"></i></span>
                        </label>
                        <label htmlFor="ph-theme-opt-3" className={`ph-theme-opt ${theme === "system" && "ph-theme-opt-active"}`}>
                            <input type="radio" name="ph-theme-opt" id="ph-theme-opt-3" className='d-none' value={"system"} onChange={handleThemeChange} />
                            <span className='ph-theme-opt-label'><i className="ri-device-fill"></i></span>
                        </label>
                    </div>
                </div>
                <div>
                    <div>
                        <Link to="/privacy" onClick={onClose} className="ph-url-colored">Privacy policy</Link>
                    </div>
                    <div>
                        <Link to="/terms" onClick={onClose} className="ph-url-colored">Terms & conditions</Link>
                    </div>
                </div>
            </div>
        </Dropdown>
    )
}

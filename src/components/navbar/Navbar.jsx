import React, { useState } from 'react'
import "./navbar.style.css"
import { useNavigate } from 'react-router-dom'
import { Dropdown } from '../dropdown/Dropdown';

export const Navbar = () => {
    const navigate = useNavigate();
    // handle nav dropdown
    const [openDropDown, setOpenDropDown] = useState(false);
    return (
        <header>
            <nav class="ph-navbar">
                <div>
                    <h5>Redhope</h5>
                </div>
                <div class="ph-nav-opt-box">
                    <button class="ph-nav-btn " onClick={() => navigate("/notifications")}><i class="ri-notification-4-line fs-5"></i></button>
                    <div>
                        <button class="ph-nav-btn" onClick={(e) => { e.stopPropagation(); setOpenDropDown(!openDropDown) }}>
                            <img src={require("../../assets/img/profile-logo.png")} alt="" className='rounded-5' width={40} />
                        </button>
                        <div className='d-flex justify-content-end'>
                            <NavOptDropDown openState={openDropDown} onClose={() => setOpenDropDown(false)} />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const NavOptDropDown = ({ openState, onClose }) => {
    const navigate = useNavigate();
    return (
        <Dropdown openState={openState} onClose={onClose} closeOnBackClick >
            <div className='ph-nav-dropdown-content'>
                <div className='ph-nav-dropdown-profile-box d-flex align-items-center gap-2 mb-3' onClick={() => { navigate('/profile/requests'); onClose() }}>
                    <img src={require("../../assets/img/profile-logo.png")} alt="" width={50} className='rounded-5' />
                    <div>Priyam Chakrabarty</div>
                </div>
                <div className='mb-3'>
                    <button className="ph-btn text-danger">
                        <span><i class="ri-logout-box-line"></i></span>
                        <span>Logout</span>
                    </button>
                </div>
                <div>
                    <div>
                        <a href="" className="ph-url-colored">Privacy policy</a>
                    </div>
                    <div>
                        <a href="" className="ph-url-colored">Terms & conditions</a>
                    </div>
                </div>
            </div>
        </Dropdown>
    )
}

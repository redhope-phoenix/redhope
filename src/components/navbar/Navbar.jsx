import React from 'react'
import "./navbar.style.css"
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate = useNavigate();
    return (
        <header>
            <nav class="ph-navbar">
                <div>
                    <h5>Redhope</h5>
                </div>
                <div class="ph-nav-opt-box">
                    <button class="ph-nav-btn "><i class="ri-notification-4-line fs-5"></i></button>
                    <button class="ph-nav-btn" onClick={() => navigate("/profile")}>
                        <img src={require("../../assets/img/profile-logo.png")} alt="" className='rounded-5' width={40} />
                    </button>
                </div>
            </nav>
        </header>
    )
}

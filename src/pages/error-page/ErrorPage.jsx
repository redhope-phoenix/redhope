import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {
    const navigate = useNavigate();
    // document title
    useEffect(() => {
        document.title = "Page not found for - " + window.location.pathname
    }, []);

    return (
        <div className='container'>
            <div className='d-flex flex-column align-items-center'>
                <div className='hb-error-img-box'><img src={require("../../assets/img/error-page.gif")} alt="" /></div>
                <div className='mb-3'><h2>OOPS! Page not found</h2></div>
                <div className='d-flex gap-3'>
                    <button className="ph-btn ph-btn-primary" onClick={() => window.location.reload()}><span><i class="ri-refresh-line"></i></span><span>Refresh</span></button>
                    <button className="ph-btn ph-btn-shadow" onClick={() => navigate("/")}>Back to Home</button>
                </div>
            </div>
        </div>
    )
}

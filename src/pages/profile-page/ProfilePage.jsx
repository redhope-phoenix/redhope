import React from 'react'
import "./profile.style.css"
import { CampaignItem } from '../../components/campaign-item/CampaignItem'
import { NavLink, Outlet } from 'react-router-dom'

export const ProfilePage = () => {
    return (
        <div className='container'>
            <section className='ph-profile-img-sec'>
                <div className='ph-profile-img-box mb-3'>
                    <img src={require("../../assets/img/profile-logo.png")} alt="" />
                </div>
                <div>
                    <div><h5>Priyam Chakrabarty</h5></div>
                    <div>priyam420@chakra.com</div>
                    <div className='mb-3'>+919907304214</div>
                    <div>
                        <button className="ph-btn ph-btn-primary"><span><i class="ri-pencil-line"></i></span><span>Edit profile</span></button>
                    </div>
                </div>
            </section>
            <section className='ph-user-details-sec mb-5'>
                <div className='ph-user-det-line'>
                    <div><strong>Blood group</strong></div>
                    <div><span>B+</span></div>
                </div>
                <div className='ph-user-det-line'>
                    <div><strong>Address</strong></div>
                    <div><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fugit, quibusdam possimus quod eligendi soluta nam alias pariatur itaque natus!</span></div>
                </div>
            </section>

            <section>
                <div className='ph-profile-nav'>
                    <NavLink to="requests">
                        <button className='ph-profile-nav-opt'>
                            Requests
                        </button>
                    </NavLink>
                    <NavLink to="contributions">
                        <button className='ph-profile-nav-opt'>
                            Contributions
                        </button>
                    </NavLink>
                </div>
                <div className='px-2'>
                    <Outlet />
                </div>
            </section>
        </div>
    )
}

export const ProfileRequestPage = () => {
    return (
        <div>
            <div className='mb-3'>
                <button className='ph-btn ph-request-btn'><span>Request for a Blood Donation</span><span><i class="ri-arrow-right-wide-line"></i></span></button>
            </div>
            <div className='hb-profile-request-list'>
                <RequestItem />
                <RequestItem />
                <RequestItem />
                <RequestItem />
            </div>
        </div>
    )
}

const RequestItem = () => {
    return (
        <div className='ph-request-item'>
            <div className='ph-request-item-det-box'>
                <div><strong>Request Id </strong><span>ui234yui23y4ui324y</span></div>
                <div><strong>Date </strong><span>12/2/2024</span></div>
                <div><strong>Blood group </strong><span>B+</span></div>
            </div>
            <div className='mb-2'>
                <div>Send to 100 peoples</div>
                <div>Response by 20 peoples</div>
            </div>
            <div>
                <button className="ph-btn ph-btn-shadow"><span><i class="ri-information-2-line"></i></span><span>View Details</span></button>
            </div>
        </div>
    )
}

export const ProfileContributionPage = () => {
    return (
        <div>
            <div className='mb-3'>
                <button className='ph-btn ph-request-btn'><span>Contribute a Campaign awareness</span><span><i class="ri-arrow-right-wide-line"></i></span></button>
            </div>
            <div className='ph-profile-campaign-list'>
                <CampaignItem />
                <CampaignItem />
                <CampaignItem />
            </div>
        </div>
    )
}

import React from 'react'
import "./home.style.css"
import { CampaignItem } from '../../components/campaign-item/CampaignItem'

export const Home = () => {
    return (
        <div className='container'>
            <div class="ph-request-btn-box my-4 mb-5">
                <button className='ph-btn ph-request-btn'><span>Request for a Blood Donation</span><span><i class="ri-arrow-right-wide-line"></i></span></button>
            </div>
            <div>
                <div class="text-center mb-4 ">
                    <h5>Campaigns</h5>
                </div>
                <div>
                    <div>
                        <h6 className='mb-3'>Today's Camps</h6>
                        <div class="ph-camps-list">
                            <CampaignItem />
                            <CampaignItem />
                            <CampaignItem />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

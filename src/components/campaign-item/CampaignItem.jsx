import React from 'react'
import "./campaign-item.style.css"

export const CampaignItem = () => {
    return (
        <li class="ph-camp-card">
            <div class="ph-camp-card-img-box"><img src={require("../../assets/img/sample-img.jpg")} alt="" /></div>
            <div class="ph-camp-info-box">
                <div>Lorem ipsum dolor sit.</div>
                <div>
                    <strong>Date - </strong>
                    <span>17/02/25</span>
                </div>
                <div>
                    <strong>Venue - </strong>
                    <span>Jolu</span>
                </div>
            </div>
            <div className='ph-camp-item-menue'>
                <button className="ph-btn ph-btn-primary"><span>View camp</span></button>
            </div>
        </li>
    )
}

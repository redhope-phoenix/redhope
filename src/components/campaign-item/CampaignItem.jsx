import React from 'react'
import "./campaign-item.style.css"
import { formatDate } from '../../utils/date-converter'
import { useNavigate } from 'react-router-dom'

export const CampaignItem = ({ data }) => {
    const navigate = useNavigate();
    return (
        <li className="ph-camp-card">
            <div className="ph-camp-card-img-box"><img src={data?.leaflet} alt="" /></div>
            <div className="ph-camp-info-box">
                <div>{data?.title}</div>
                <div>
                    <strong>Date - </strong>
                    <span>{formatDate(data?.date)?.formattedDate}</span>
                </div>
                <div>
                    <strong>Pincode - </strong>
                    <span>{data?.pincode}</span>
                </div>
            </div>
            <div className='ph-camp-item-menue'>
                <button className="ph-btn ph-btn-primary" onClick={() => navigate(`/campaign/${data?._id}`)}><span>View camp</span></button>
            </div>
        </li>
    )
}

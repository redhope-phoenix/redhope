import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../configs/axios-configs';
import { formatDate } from '../../utils/date-converter';
import { PopupBox } from '../../components/popup-box/PopupBox';
import { toast } from 'react-toastify';
import AuthContext from '../../contexts/AuthContext';
import shareContent from '../../utils/share-function';
import { TableLoader } from '../../components/loaders/TableLoader';

export const CampaignViewPage = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const params = useParams();
    const { campaignId } = params;
    // get campaign data
    const [campaign, setCampaign] = useState(null);
    useEffect(() => {
        const fetchCamp = async () => {
            try {
                await axios.get(`/campaign/get-campaign/${campaignId}`)
                    .then((res) => {
                        setCampaign(res.data?.data)
                    })
            } catch (error) {
                navigate("/*");
            }
        }

        if (campaignId) fetchCamp();
    }, [campaignId])

    // remove popup
    const [removePopup, setRemovePopup] = useState(false);

    // report popup
    const [openReportPopup, setOpenReportPopup] = useState(false);

    // handle share function
    const handleShare = () => {
        shareContent("Visit this campaign.", "", window.location.href);
    }

    // document title
    useEffect(() => {
        document.title = campaign ? `Redhope campaign - ${campaign?.title}` : "Loading..."
    }, [campaign]);

    return (
        <div className='container'>
            <h5 className='mb-3'>{campaign?.title}</h5>
            <div className='ph-d-flex-wrap gap-3 mb-4'>
                <button className="ph-btn ph-btn-primary" onClick={handleShare}><span><i className="ri-share-forward-line"></i></span><span>Share</span></button>
                <button className="ph-btn ph-btn-shadow" onClick={() => setOpenReportPopup(true)}><span><i className="ri-information-2-line"></i></span><span>Report abuse</span></button>
                {currentUser?._id === campaign?.userId && <button className="ph-btn ph-btn-danger" onClick={() => setRemovePopup(true)}><span>Remove campaign</span></button>}
            </div>
            {campaign?.description && <div className='mb-4'>
                <h6>Campaign description</h6>
                <pre>{campaign?.description}</pre>
            </div>}
            <div className='mb-4'>
                <h6>Campaign details</h6>
                {campaign && <div className='ph-table'>
                    <div><strong>Date </strong><span>{formatDate(campaign?.date)?.formattedDate}</span></div>
                    <div><strong>Time </strong><span>{formatDate(campaign?.date)?.formattedTime}</span></div>
                    <div><strong>Address </strong><span>{campaign?.address?.addressLine}, {campaign?.address?.district}, {campaign?.address?.state}</span></div>
                    <div><strong>Pin code </strong><span>{campaign?.pincode}</span></div>
                    {campaign?.contactNo && <div><strong>Contact no </strong><span>{campaign?.contactNo}</span></div>}
                    {campaign?.registrationLink && <div><strong>Register on </strong><span><a href={campaign?.registrationLink} className='ph-url-colored text-break' target='_blank'>{campaign?.registrationLink}</a></span></div>}
                </div>}
                {!campaign && <TableLoader length={4} />}
            </div>
            {campaign?.leaflet && <div className='ph-campaign-img-box'>
                <h6>Read the leaflet</h6>
                <img src={campaign?.leaflet} alt="" />
            </div>}

            <RemoveConfirmPopup openState={removePopup} onClose={() => setRemovePopup(false)} campaignId={campaignId} />
            <ReportPopup openState={openReportPopup} onClose={() => setOpenReportPopup(false)} campaignId={campaignId} />
        </div>
    )
}

const RemoveConfirmPopup = ({ openState, onClose, onConfirm, campaignId }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleCancel = async () => {
        try {
            setLoading(true);
            await axios.get(`/campaign/remove-campaign/${campaignId}`)
                .then(() => {
                    toast.success("Campaign removed successfully");
                    navigate("/profile/contributions")
                    onClose();
                })
        } catch (error) {
            toast.error("Cannot remove campaign now");
        }
        setLoading(false);
    }

    return (
        <PopupBox openState={openState} onClose={onClose} className='p-3' closeOnBackClick>
            <div className='mb-3'>
                <pre>After remove, it can not be restore.<br />
                    Still do you want to remove it?
                </pre>
            </div>
            <div className='d-flex gap-2 justify-content-end'>
                <button className="ph-btn" onClick={onClose}>Close</button>
                <button className="ph-btn ph-btn-danger" onClick={handleCancel} disabled={loading}>{loading ? "Removing..." : "Remove"}</button>
            </div>
        </PopupBox>
    )
}

const ReportPopup = ({ openState, onClose, onConfirm, campaignId }) => {
    const [loading, setLoading] = useState(false);
    // help handler
    const handelReport = async () => {
        try {
            setLoading(true);
            await axios.post(`/campaign/campaign-report/${campaignId}`)
                .then(() => {
                    toast.success("Thanks for your kind feedback!");

                })
        } catch (error) {
            if (error?.response?.status === 402) toast.warn("You have already reported in this campaign");
            else toast.error("Unable send report");
        }
        setLoading(false);
        onClose();
    }

    return (
        <PopupBox openState={openState} onClose={onClose} className='p-3' closeOnBackClick>
            <div className='mb-3'>
                <pre>Your report will make impact to this campaign.<br />
                    Do you want to continue?
                </pre>
            </div>
            <div className='d-flex gap-2 justify-content-end'>
                <button className="ph-btn" onClick={onClose}>Close</button>
                <button className="ph-btn ph-btn-primary" onClick={handelReport} disabled={loading}>{loading ? "Creating report..." : "Confirm report"}</button>
            </div>
        </PopupBox>
    )
}

import React, { useEffect, useState } from 'react'
import "./profile.style.css"
import { CampaignItem } from '../../components/campaign-item/CampaignItem'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../../hooks/current-user'
import axios from '../../configs/axios-configs'
import { Spinner } from '../../components/loaders/Spinner'
import blankPageSvg from "../../assets/svg/blank-page.svg"
import { formatDate } from '../../utils/date-converter'
import { TableLoader } from '../../components/loaders/TableLoader'
import { BoxLoader } from '../../components/loaders/box-loaders'

export const ProfilePage = () => {
    const navigate = useNavigate();
    // current user details
    const currentUser = useCurrentUser();

    // document title
    useEffect(() => {
        document.title = currentUser ? `Redhope - ${currentUser?.userName}` : "Loading..."
    }, [currentUser]);

    const [navTop, setNavTop] = useState(null);
    useEffect(() => {
        setNavTop(document.getElementsByTagName("header")[0].clientHeight);
    })

    return (
        <div className='container'>
            <section className='ph-profile-img-sec'>
                <div className='ph-profile-img-box mb-3'>
                    <img src={currentUser?.avatar || require("../../assets/img/profile-logo.png")} alt="" />
                </div>
                {currentUser ?
                    <div className='ph-profile-user-gen-det-box'>
                        <div><h5>{currentUser?.userName}</h5></div>
                        <div className='word-break'>{currentUser?.email}</div>
                        <div className='mb-3'>{currentUser?.phoneNo}</div>
                        <div>
                            <button className="ph-btn ph-btn-primary" onClick={() => navigate("/profile-edit")}><span><i className="ri-pencil-line"></i></span><span>Edit profile</span></button>
                        </div>
                    </div> :
                    <div>
                        <BoxLoader />
                        <BoxLoader />
                        <BoxLoader />
                    </div>
                }
            </section>
            {currentUser ? <section className='ph-user-details-sec mb-5'>
                {currentUser?.dateOfBirth && <div className='ph-user-det-line'>
                    <div><strong>Date of birth</strong></div>
                    <div><span>{formatDate(currentUser?.dateOfBirth)?.formattedDate}</span></div>
                </div>}
                {currentUser?.bloodGroup && <div className='ph-user-det-line'>
                    <div><strong>Blood group</strong></div>
                    <div><span>B+</span></div>
                </div>}
                {currentUser?.address && <div className='ph-user-det-line'>
                    <div><strong>Address</strong></div>
                    <div><span>{currentUser?.address?.addressLine}, {currentUser?.address?.district}, {currentUser?.address?.state} - {currentUser?.pincode}</span></div>
                </div>}
            </section> :
                <section className='mb-5'>
                    <TableLoader length={3} />
                </section>
            }

            <section>
                <div className='ph-profile-nav' style={{ top: navTop }}>
                    <NavLink to="requests">
                        <button className='ph-profile-nav-opt'>
                            My requests
                        </button>
                    </NavLink>
                    <NavLink to="contributions">
                        <button className='ph-profile-nav-opt'>
                            My contributions
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
    const navigate = useNavigate();
    // get request data
    const [requestList, setRequestList] = useState(null);
    useEffect(() => {
        const fetchRequest = async () => {
            try {
                await axios.get("/request/user-requests")
                    .then((res) => setRequestList(res.data?.data))
            } catch (error) {

            }
        }

        fetchRequest();
    }, []);
    return (
        <div>
            <div className='mb-3'>
                <button className='ph-btn ph-request-btn ph-btn-primary' onClick={() => navigate("/create-request")}><span>Request for a blood donation</span><span><i className="ri-arrow-right-wide-line"></i></span></button>
            </div>
            <div className='hb-profile-request-list'>
                {requestList === null && <div className='text-center d-flex justify-content-center' style={{ width: "100%" }}><Spinner width={40} colorCode={1} /></div>}
                {requestList?.length === 0 && <div className='d-flex flex-column align-items-center' style={{ width: "100%" }}>
                    <div><img src={blankPageSvg} alt="" width={100} /></div>
                    <div>No requests found!</div>
                </div>}
                {requestList?.map((item, index) => {
                    return <RequestItem key={index} data={item} />
                })}
            </div>
        </div>
    )
}

const RequestItem = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div className='ph-request-item'>
            <div className='ph-request-item-det-box'>
                <div><strong>Request Id </strong><span className='ph-f-sm'>{data?._id}</span></div>
                <div><strong>Date </strong><span>{formatDate(data?.date)?.formattedDate}</span></div>
                <div><strong>Blood group </strong><span>{data?.bloodGroup}</span></div>
            </div>
            <div className='mb-2'>
                <div>Send to {data?.reachedTo} peoples</div>
                <div>Respond by {data?.approvedBy} peoples</div>
            </div>
            <div>
                <button className={`ph-btn ph-btn-shadow ${!data?.isActive && (data?.isFulfilled ? "text-success" : "text-danger")}`} disabled={!data?.isActive} onClick={() => navigate(`/request/${data?._id}`)}>
                    <span>{data?.isFulfilled ? <i className="ri-checkbox-circle-fill"></i> : <i className="ri-information-2-line"></i>}</span>
                    <span>{!data?.isActive ? data?.isFulfilled ? "Request fulfilled" : "Request canceled" : "View Details"}</span>
                </button>
            </div>
        </div>
    )
}

export const ProfileContributionPage = () => {
    const navigate = useNavigate();
    const [campaignList, setCampaignList] = useState(null);
    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                await axios.get("/campaign/user-campaigns")
                    .then((res) => setCampaignList(res.data?.data))
            } catch (error) {

            }
        }

        fetchCampaign();
    }, []);
    return (
        <div>
            <div className='mb-3'>
                <button className='ph-btn ph-request-btn ph-btn-primary' onClick={() => navigate('/create-campaign')}><span>Contribute a campaign awareness</span><span><i className="ri-arrow-right-wide-line"></i></span></button>
            </div>
            <div className='ph-profile-campaign-list'>
                {campaignList === null && <div className='text-center d-flex justify-content-center' style={{ width: "100%" }}><Spinner width={40} colorCode={1} /></div>}
                {campaignList?.length === 0 && <div className='d-flex flex-column align-items-center' style={{ width: "100%" }}>
                    <div><img src={blankPageSvg} alt="" width={100} /></div>
                    <div>No campaigns found!</div>
                </div>}
                {campaignList?.map((item, index) => {
                    return <CampaignItem key={index} data={item} />
                })}
            </div>
        </div>
    )
}

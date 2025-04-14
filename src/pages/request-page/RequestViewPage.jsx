import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./requestPage.style.css"
import axios from '../../configs/axios-configs';
import { toast } from 'react-toastify';
import { PopupBox } from '../../components/popup-box/PopupBox';
import AuthContext from '../../contexts/AuthContext';
import shareContent from '../../utils/share-function';
import blankPageSvg from "../../assets/svg/blank-page.svg"
import { Spinner } from '../../components/loaders/Spinner';
import { formatDate } from '../../utils/date-converter';
import { TableLoader } from '../../components/loaders/TableLoader';

export const RequestViewPage = () => {
    const navigate = useNavigate();
    const { currentUser, isAuthenticated } = useContext(AuthContext);
    const params = useParams();
    const requestId = params?.reqestId;
    const [request, setRequest] = useState(null);
    useEffect(() => {
        const fetchRequest = async () => {
            try {
                await axios.get(`/request/get-request?requestId=${requestId}&userId=${currentUser?._id}`)
                    .then((res) => {
                        setRequest(res.data?.data)
                    })
            } catch (error) {
                navigate("/*")
            }
        }
        if (requestId && ((isAuthenticated && currentUser) || (!isAuthenticated && !currentUser))) fetchRequest();
    }, [requestId, currentUser]);

    const [requestCreator, setRequestCreator] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                await axios.get(`/user/get-user/${request?.requestedBy}`)
                    .then((res) => {
                        setRequestCreator(res.data?.data)
                    })
            } catch (error) {

            }
        }

        if (request) fetchUser();
    }, [request])

    // update request status
    const [isFulfilled, setIsFulfilled] = useState(false);
    const [isActive, setIsActive] = useState(true);
    useEffect(() => {
        setIsFulfilled(request?.isFulfilled);
        setIsActive(request?.isActive);
    }, [request])

    const [loading, setLoading] = useState(false);

    // handle fulfill popup
    const [openFulfillPopup, setOpenFulfillPopup] = useState(false);
    // handle cancel popup
    const [openCancelConfirm, setOpenCancelConfirm] = useState(false);

    // handle share function
    const handleShare = () => {
        shareContent("Urgent blood donation required.", `Help ${request?.applicant} by donating blood.`, window.location.href);
    }

    // handle popup open buttons
    const handleOpenButton = (action) => {
        if (isAuthenticated) action();
        else navigate(`/auth/login?to=${window.location.pathname}`)
    }

    // help popup
    const [openHelpPopup, setHelpPopup] = useState(false);

    // report popup
    const [openReportPopup, setOpenReportPopup] = useState(false);

    // fetch helper list
    const [helperList, setHelperList] = useState(null);
    useEffect(() => {
        const fetchList = async () => {
            try {
                await axios.get(`/request/helper-list/${requestId}`)
                    .then((res) => {
                        setHelperList(res.data?.data)
                    })

            } catch (error) {

            }
        }

        if (requestId && request?.requestedBy === currentUser?._id) fetchList();
    }, [requestId, currentUser, request])

    // document title
    useEffect(() => {
        document.title = "Request - Redhope"
    }, []);

    return (
        <div className='container'>
            <h5 className='mb-4'>Urgent blood required</h5>
            <div className='d-flex gap-2 align-items-center mb-4'>
                <img src={requestCreator?.avatar || require("../../assets/img/profile-logo.png")} alt="" width={50} className='rounded-5' />
                <div>{requestCreator?.userName}</div>
            </div>
            <div className="mb-4">
                <h6 className='mb-2'>Requirements</h6>
                {request && <div className='ph-table'>
                    <div><strong>Blood group </strong><span>{request?.bloodGroup}</span></div>
                    <div><strong>Date </strong><span>{formatDate(request?.date)?.formattedDate}</span></div>
                    {request?.reason && <div><strong>Reason </strong><span><pre>{request?.reason}</pre></span></div>}
                </div>}
                {!request && <TableLoader length={3} />}
            </div>
            <div className='mb-5'>
                <h6 className='mb-2'>Contact details</h6>
                {request && <div className='ph-table'>
                    <div><strong>Applicant </strong><span>{request?.applicant}</span></div>
                    <div><strong>Address </strong><span>{`${request?.address?.addressLine}, ${request?.address?.district}, ${request?.address?.state}.`}</span></div>
                    <div><strong>Pin code </strong><span>{request?.pincode}</span></div>
                    <div><strong>Contact no </strong><span>{request?.phoneNo}</span></div>
                </div>}
                {!request && <TableLoader length={4} />}
            </div>
            {currentUser?._id === request?.requestedBy ?
                <div className='ph-d-flex-wrap gap-3 mb-5'>
                    <button className="ph-btn ph-btn-primary" onClick={() => setOpenFulfillPopup(true)} disabled={!isActive || loading}>
                        <span><i className={`ri-checkbox-circle-${isFulfilled ? "fill" : "line"}`}></i></span>
                        <span>{isFulfilled ? "Request fulfilled" : "Mark as fulfilled"}</span>
                    </button>
                    <button className="ph-btn ph-btn-shadow" onClick={handleShare} disabled={!isActive}><span><i className="ri-share-forward-line"></i></span></button>
                    <button className="ph-btn ph-btn-shadow text-danger" onClick={() => setOpenCancelConfirm(true)} disabled={!isActive || loading}><span><i className="ri-information-2-line"></i></span><span>Cancel request</span></button>
                </div> :
                <div className='ph-d-flex-wrap gap-3 mb-2'>
                    <button className="ph-btn ph-btn-primary" onClick={() => handleOpenButton(() => setHelpPopup(true))}>
                        <span><i className="ri-hand-heart-line"></i></span>
                        <span>Help {request?.applicant}</span>
                    </button>
                    <button className="ph-btn ph-btn-shadow" onClick={handleShare}><span><i className="ri-share-forward-line"></i></span></button>
                    <button className="ph-btn ph-btn-shadow" onClick={() => handleOpenButton(() => setOpenReportPopup(true))}><span><i className="ri-information-2-line"></i></span><span>Report abuse</span></button>
                </div>
            }

            {currentUser?._id === request?.requestedBy &&
                <div>
                    <h6 className='mb-3'>Helpers list</h6>
                    <div>
                        {!helperList && <div className='text-center d-flex justify-content-center' style={{ width: "100%" }}><Spinner width={40} colorCode={1} /></div>}
                        {
                            helperList?.length === 0 && <div className='text-center'>
                                <div><img src={blankPageSvg} alt="" width={100} /></div>
                                <div>No helps found for this request. <br /> Further helps will be send to your mail or notification.</div>
                            </div>
                        }
                        {helperList?.map((item, index) => {
                            return <HelperItem data={item} key={index} />
                        })}
                    </div>
                </div>
            }
            <MarkVerifyPopup openState={openFulfillPopup} onClose={() => setOpenFulfillPopup(false)} onConfirm={e => { setIsActive(e.isActive); setIsFulfilled(e.isFulfilled) }} requestId={requestId} />
            <CancelConfirmPopup openState={openCancelConfirm} onClose={() => setOpenCancelConfirm(false)} onConfirm={() => setIsActive(false)} requestId={requestId} />
            <HelpSendPopUp openState={openHelpPopup} onClose={() => setHelpPopup(false)} requestId={requestId} />
            <ReportPopup openState={openReportPopup} onClose={() => setOpenReportPopup(false)} requestId={requestId} />
        </div>
    )
}

const MarkVerifyPopup = ({ openState, onClose, onConfirm, requestId }) => {
    const [loading, setLoading] = useState(false);
    const handleFulfillRequest = async () => {
        try {
            setLoading(true);
            await axios.get(`/request/fulfill-request/${requestId}`)
                .then(() => {
                    toast.success("Congratulations!! Fulfillment successfull!");
                    onConfirm({ isActive: false, isFulfilled: true });
                    onClose();
                })
        } catch (error) {
            toast.error("Unable to fulfill the request");
        }
        setLoading(false);
    }

    return (
        <PopupBox openState={openState} onClose={onClose} className='p-3' closeOnBackClick>
            <div className='mb-3'>
                <pre>After that the request will not visible to others<br />
                    Still do you want to fulfill it?
                </pre>
            </div>
            <div className='d-flex gap-2 justify-content-end'>
                <button className="ph-btn" onClick={onClose}>Close</button>
                <button className="ph-btn ph-btn-primary" onClick={handleFulfillRequest} disabled={loading}>{loading ? "Updating..." : "Fulfill request"}</button>
            </div>
        </PopupBox>
    )
}

const CancelConfirmPopup = ({ openState, onClose, onConfirm, requestId }) => {
    const [loading, setLoading] = useState(false);
    const handleCancel = async () => {
        try {
            setLoading(true);
            await axios.get(`/request/deactive-request/${requestId}`)
                .then(() => {
                    toast.success("Request canceled successfully");
                    onConfirm();
                    onClose();
                })
        } catch (error) {
            toast.error("Cannot deactive request now");
        }
        setLoading(false);
    }

    return (
        <PopupBox openState={openState} onClose={onClose} className='p-3' closeOnBackClick>
            <div className='mb-3'>
                <pre>After the cancelation the request will be removed.<br />
                    Still do you want to cancel it?
                </pre>
            </div>
            <div className='d-flex gap-2 justify-content-end'>
                <button className="ph-btn" onClick={onClose}>Close</button>
                <button className="ph-btn ph-btn-danger" onClick={handleCancel} disabled={loading}>{loading ? "Updating..." : "Confirm cancel"}</button>
            </div>
        </PopupBox>
    )
}

const HelpSendPopUp = ({ openState, onClose, onConfirm, requestId }) => {
    const [loading, setLoading] = useState(false);
    // help handler
    const handleHelp = async () => {
        try {
            setLoading(true);
            await axios.post(`/request/create-help/${requestId}`)
                .then(() => {
                    toast.success("Congratulations! Your help suucessfully send.");

                })
        } catch (error) {
            if (error.response.status === 402) toast.warn("You have already helped in this request");
            if (error.response.status === 403) toast.warn("Complete your profile to send help!");
            else toast.error("Unable send help");
        }
        setLoading(false);
        onClose();
    }

    return (
        <PopupBox openState={openState} onClose={onClose} className='p-3' closeOnBackClick>
            <div className='mb-3'>
                <pre>After this your contact informations will be shared to the request person.<br />
                    Do you want to continue?
                </pre>
            </div>
            <div className='d-flex gap-2 justify-content-end'>
                <button className="ph-btn" onClick={onClose}>Close</button>
                <button className="ph-btn ph-btn-primary" onClick={handleHelp} disabled={loading}>{loading ? "Sending help..." : "Confirm help"}</button>
            </div>
        </PopupBox>
    )
}

const ReportPopup = ({ openState, onClose, onConfirm, requestId }) => {
    const [loading, setLoading] = useState(false);
    // help handler
    const handelReport = async () => {
        try {
            setLoading(true);
            await axios.post(`/request/request-report/${requestId}`)
                .then(() => {
                    toast.success("Thanks for your kind feedback!");

                })
        } catch (error) {
            if (error.response.status === 402) toast.warn("You have already reported in this request");
            else toast.error("Unable send report");
        }
        setLoading(false);
        onClose();
    }

    return (
        <PopupBox openState={openState} onClose={onClose} className='p-3' closeOnBackClick>
            <div className='mb-3'>
                <pre>Your report will make impact to this request.<br />
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

const HelperItem = ({ data }) => {
    const [contactPopup, setConatctPopup] = useState(false);
    const { helperDetails, helperContactInfo } = data;
    return (
        <div className='ph-helper-item'>
            <div>
                <h6 className='mb-0'>{helperDetails?.userName}</h6>
                <div><strong>Blood group</strong> <span>{helperDetails?.bloodGroup}</span></div>
            </div>
            <div>
                <button className="ph-btn ph-btn-primary" onClick={() => setConatctPopup(true)}>Contact details</button>
            </div>
            <ContactDetailsPopup openState={contactPopup} onClose={() => setConatctPopup(false)} data={data} />
        </div>
    )
}

const ContactDetailsPopup = ({ openState, onClose, data }) => {
    const { helperDetails, helperContactInfo } = data;
    return (
        <PopupBox openState={openState} onClose={onClose} closeOnBackClick pauseScroll className='ph-contact-details-popup'>
            <div className='ph-popup-close-btn-box'>
                <button className="ph-btn fs-5" onClick={onClose}><i className="ri-close-large-line"></i></button>
            </div>
            <div className='ph-helper-conatct-box'>
                <div className='mb-3'><img src={helperDetails?.avatar || require("../../assets/img/profile-logo.png")} alt="" width={150} /></div>
                <h6 className='mb-3'>{helperDetails?.userName}</h6>
                <div className='mb-4 ph-table'>
                    <div><strong>Blood group</strong><span>{helperDetails?.bloodGroup}</span></div>
                    <div><strong>Address</strong><span>{`${helperContactInfo?.address?.addressLine}, ${helperContactInfo?.address?.district}, ${helperContactInfo?.address?.state}`}</span></div>
                    <div><strong>Pincode</strong><span>{helperContactInfo?.pincode}</span></div>
                </div>
                <div className='d-flex gap-2'>
                    <a href={`tel:${helperContactInfo?.phoneNo}`} className='ph-url'>
                        <button className="ph-btn ph-btn-primary"><span><i className="ri-phone-line"></i></span> <span>Place a call</span></button>
                    </a>
                    <a href={`mailto:${helperContactInfo?.email}?subject=${encodeURI("Enquiry about blood donation request help")}`} className='ph-url'>
                        <button className="ph-btn ph-btn-shadow"><span><i className="ri-mail-line"></i></span> <span>Send email</span></button>
                    </a>
                </div>
            </div>
        </PopupBox>
    )
}
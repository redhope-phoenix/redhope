import React, { useContext, useEffect, useState } from 'react'
import { PopInput } from '../../components/inputs/PopInput'
import { useCurrentUser } from '../../hooks/current-user';
import axios from '../../configs/axios-configs';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

export const RequestDonatePage = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    // states for inputs
    const [contactInfo, setContactInfo] = useState({});
    const [requirement, setRequirement] = useState({});
    const [commitCheck, setCommitCheck] = useState(false);
    useEffect(() => {
        if (currentUser) {
            setContactInfo({ ...contactInfo, applicant: currentUser?.userName, email: currentUser?.email, phoneNo: currentUser?.phoneNo, address: currentUser?.address, pincode: currentUser?.pincode });
            setRequirement({ ...requirement, bloodGroup: currentUser?.bloodGroup });
        }
    }, [currentUser]);
    // send request
    const [loading, setLoading] = useState(false);
    const handleRequestSend = async () => {
        try {
            setLoading(true);
            await axios.post("/request/create-request", { requestedBy: currentUser?._id, ...contactInfo, ...requirement, date: requirement?.date })
                .then((res) => {
                    toast.success("Request submitted successfully");
                    navigate(`/request/${res.data?.data?.id}`);
                })
        } catch (error) {
            toast.error("Please fill all the given fields");
        }
        setLoading(false);
    }

    // document title
    useEffect(() => {
        document.title = "Create donation request - Redhope"
    }, []);

    return (
        <div className='container'>
            <div className='mb-4'>
                <h5>Request for a Blood donation</h5>
                <p>Create a application to request for a urgent blood donation. <Link to={`/health-assistant?prompt=${encodeURI("How blood donation request works in redhope.")}`} className='ph-url-colored'>Learn more</Link></p>
            </div>

            <div>
                <form action="">
                    <div className='mb-3'>
                        <h6>Contact details</h6>
                        <div className='mb-2'>
                            <PopInput placeholder='Applicant full name' value={contactInfo?.applicant} onChange={e => setContactInfo({ ...contactInfo, applicant: e })} />
                        </div>
                        <div className='mb-2'>
                            <PopInput placeholder='Phone number (+91)' type='number' value={contactInfo?.phoneNo} onChange={e => setContactInfo({ ...contactInfo, phoneNo: e })} />
                        </div>
                        <div className='mb-2'>
                            <PopInput placeholder='Email id' type='email' value={contactInfo?.email} onChange={e => setContactInfo({ ...contactInfo, email: e })} />
                        </div>
                        <div className='mb-2'>
                            <PopInput placeholder='Address line 1' type='text' value={contactInfo?.address?.addressLine} onChange={e => setContactInfo({ ...contactInfo, address: { ...contactInfo?.address, addressLine: e } })} />
                        </div>
                        <div className='mb-2 d-flex gap-2'>
                            <PopInput placeholder='District' type='text' className='ph-form-input-3-width' value={contactInfo?.address?.district} onChange={e => setContactInfo({ ...contactInfo, address: { ...contactInfo?.address, district: e } })} />
                            <PopInput placeholder='State' type='text' className='ph-form-input-3-width' value={contactInfo?.address?.state} onChange={e => setContactInfo({ ...contactInfo, address: { ...contactInfo?.address, state: e } })} />
                            <PopInput placeholder='Nationality' type='text' value='India' disabled={true} className='ph-form-input-3-width' />
                        </div>
                        <div className='mb-2'>
                            <PopInput placeholder='Postal code' type='number' value={contactInfo?.pincode} onChange={e => setContactInfo({ ...contactInfo, pincode: e })} />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h6>Requirements</h6>
                        <div className='mb-2'>
                            <PopInput placeholder='Blood group ( eg. B+ )' type='text' value={requirement?.bloodGroup} onChange={e => setRequirement({ ...requirement, bloodGroup: e?.trim().toUpperCase() })} style={{ textTransform: "uppercase" }} />
                        </div>
                        <div>
                            <textarea className='ph-textarea' placeholder='Write a reason for this requirement' style={{ minHeight: "10em" }} onChange={e => setRequirement({ ...requirement, reason: e.target.value })} />
                        </div>
                        <div>
                            <h6>Required within date</h6>
                            <input type="date" placeholder='Request within date' name="" min={new Date().toISOString().split("T")[0]} onChange={(e) => setRequirement({ ...requirement, date: e.target.value })} />
                        </div>
                    </div>
                </form>
            </div>
            <div className='mb-3'>
                <div className='d-flex gap-2 mb-2'>
                    <input type="checkbox" name="" id="commit-check-box" onChange={e => setCommitCheck(e.target.checked)} />
                    <label htmlFor='commit-check-box' className='m-0'>I commit that all the given informations are correct.</label>
                </div>
                <div>
                    <button className="ph-btn ph-btn-primary py-2 px-4" disabled={!commitCheck || loading} onClick={handleRequestSend}>{loading ? "Sending request..." : "Submit request"}</button>
                </div>
            </div>

        </div>
    )
}

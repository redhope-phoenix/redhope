import React, { useEffect, useState } from 'react'
import { PopInput } from '../../components/inputs/PopInput'
import { useCurrentUser } from '../../hooks/current-user';
import { toast } from 'react-toastify';
import axios from '../../configs/axios-configs';
import isAdult from '../../utils/checkDOB';
import { CropperPopup } from '../../components/popup-box/CropperPopup';
import { Spinner } from '../../components/loaders/Spinner';

export const ProfileEditPage = () => {
    const currentUser = useCurrentUser();
    const [loading, setLoading] = useState(false);
    // user details section
    const [avatar, setAvatar] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    const [bloodGroup, setBloodGroup] = useState("");
    const [contactInfo, setContactInfo] = useState({});
    useEffect(() => {
        if (currentUser) {
            setAvatar(currentUser?.avatar);
            setUserDetails({ ...userDetails, userName: currentUser.userName, email: currentUser.email, dateOfBirth: currentUser.dateOfBirth });
            setBloodGroup(currentUser?.bloodGroup || "");
            setContactInfo({ ...contactInfo, phoneNo: currentUser?.phoneNo, address: currentUser?.address, pincode: currentUser?.pincode })
        }
    }, [currentUser]);

    // profile image update
    const [cropperOpen, setCropperOpen] = useState(false);
    const [inputImg, setInputImg] = useState(null);
    const [imgLoading, setImgLoading] = useState(false);

    const handleImgInput = (e) => {
        const file = e.target.files[0];
        if (!file || file.size > 10485760) {
            toast.warn("Image size must be within 10mb");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setInputImg(reader.result);
            setCropperOpen(true);
        };
        reader.readAsDataURL(file);

    }

    const handleCrop = async (file) => {

        try {
            setImgLoading(true);
            await axios.patch("/user/update-avatar", { avatar: file }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(() => {
                    setAvatar(URL.createObjectURL(file));
                    toast.success("Profile updated successfully");
                    setInputImg(null)
                })
        } catch (error) {
            console.log(error);
            toast.error("Unable to update profile picture")
        }
        setImgLoading(false);
    }

    // upadte user details
    const handleUpdateUserdetails = async () => {
        if (userDetails.userName?.length < 3) {
            toast.error("User name length must be atleast 3");
            return;
        } else if (!userDetails?.email) {
            toast.error("Email is required");
            return;
        } else if (!isAdult(userDetails?.dateOfBirth)) {
            toast.error("User age must be 18 or above");
            return;
        }
        try {
            setLoading(true);
            await axios.patch("/user/update-user", userDetails)
                .then(() => toast.success("User details updated"))
        } catch (error) {
            if (error.response.status === 402) toast.warn("Email is already in use!");
        }
        setLoading(false);
    }

    // update contact info
    const handleContactInfoUpdate = async () => {
        try {
            setLoading(true);
            await axios.patch("/user/update-contact", contactInfo)
                .then(() => toast.success("Contact details updated"))
        } catch (error) {

        }
        setLoading(false);
    }

    // update blood group
    const handleBloodGroupUpdate = async () => {
        if (!bloodGroup) toast.error("Blood group is required");
        try {
            setLoading(true);
            await axios.patch("/user/update-bloodgroup", { bloodGroup })
                .then(() => toast.success("Blood group updated"))
        } catch (error) {

        }
        setLoading(false);
    }

    // handle user details simultaneously
    // const handleUpdateUser = () => {
    //     if (bloodGroup){
    //     handleBloodGroupUpdate();
    //     }
    //     if (contactInfo) {
    //         handleContactInfoUpdate();
    //     }
    // }

    // password change function
    const [password, setPassword] = useState({ currentPassword: "", newPassword: "" });
    const handlePasswordChange = async () => {
        if (password.newPassword?.length < 5) {
            toast.error("Minimum allowed password length is 5");
            return;
        }
        try {
            setLoading(true);
            await axios.patch("/user/update-password", password)
                .then(() => {
                    toast.success("Password updated")
                })

        } catch (error) {
            if (error.response.status === 402) toast.error("Incorrect current password");
        }

        setLoading(false);
    }

    // document title
    useEffect(() => {
        document.title = "Edit profile - Redhope"
    }, []);

    return (
        <div className='container'>
            <h5 className='mb-4'>Update your profile</h5>
            <section className='ph-profile-edit-section mb-3'>
                <h6 className='mb-3'>General details</h6>
                <div className='ph-profile-edit-img-box d-flex align-items-center gap-3 mb-3'>
                    <div className='d-flex align-items-center justify-content-center'>
                        <img src={avatar || require("../../assets/img/profile-logo.png")} alt="" style={{ filter: imgLoading ? "blur(5px)" : "blur(0)" }} />
                        {imgLoading && <div style={{ position: "absolute" }}><Spinner colorCode={1} width={70} /></div>}
                    </div>
                    <div>
                        <label htmlFor="profile-img-input">
                            <div className='ph-btn ph-btn-shadow'><i className="ri-camera-fill fs-5"></i></div>
                            <input type="file" name="" id="profile-img-input" className='d-none' multiple={false} accept='image/*' onChange={handleImgInput} />
                        </label>
                    </div>
                </div>
                <div className='mb-2'>
                    <PopInput placeholder='Full name' value={userDetails?.userName} onChange={e => setUserDetails({ ...userDetails, userName: e })} />
                </div>
                <div className='mb-2'>
                    <PopInput placeholder='Email' value={userDetails?.email} onChange={e => setUserDetails({ ...userDetails, email: e })} />
                </div>
                <div className='mb-3'>
                    <input type='date' value={userDetails?.dateOfBirth} onChange={e => setUserDetails({ ...userDetails, dateOfBirth: e })} />
                </div>
                <div className='d-flex justify-content-end'>
                    <button className="ph-btn ph-btn-primary" onClick={handleUpdateUserdetails} disabled={loading}>Save changes</button>
                </div>
            </section>

            <section className='mb-3 ph-profile-edit-section'>
                <h6 className='mb-3'>Health details</h6>
                <div className='mb-3'>
                    <PopInput placeholder='Blood group (eg. B+)' value={bloodGroup} onChange={e => setBloodGroup(e?.trim().toUpperCase())} style={{ textTransform: "uppercase" }} />
                </div>
                <div className='d-flex justify-content-end'>
                    <button className="ph-btn ph-btn-primary" onClick={handleBloodGroupUpdate} disabled={loading}>Save changes</button>
                </div>
            </section>

            <section className='mb-3 ph-profile-edit-section'>
                <h6 className='mb-3'>Contact details</h6>
                <div className='mb-2'>
                    <PopInput placeholder='Phone number (+91)' type='number' value={contactInfo?.phoneNo} onChange={e => setContactInfo({ ...contactInfo, phoneNo: e })} />
                </div>
                <div className='mb-2'>
                    <PopInput placeholder='Address line 1' value={contactInfo?.address?.addressLine} onChange={e => setContactInfo({ ...contactInfo, address: { ...contactInfo?.address, addressLine: e } })} />
                </div>
                <div className='mb-3 d-flex gap-2'>
                    <PopInput placeholder='District' className='ph-form-input-3-width' value={contactInfo?.address?.district} onChange={e => setContactInfo({ ...contactInfo, address: { ...contactInfo?.address, district: e } })} />
                    <PopInput placeholder='State' className='ph-form-input-3-width' value={contactInfo?.address?.state} onChange={e => setContactInfo({ ...contactInfo, address: { ...contactInfo?.address, state: e } })} />
                    <PopInput placeholder='Nationality' value='India' disabled className='ph-form-input-3-width' />
                </div>
                <div className='mb-2'>
                    <PopInput placeholder='Pin code' type='number' value={contactInfo?.pincode} onChange={e => setContactInfo({ ...contactInfo, pincode: e })} />
                </div>
                <div className='d-flex justify-content-end'>
                    <button className="ph-btn ph-btn-primary" onClick={handleContactInfoUpdate} disabled={loading}>Save changes</button>
                </div>
            </section>

            <section className='mb-3 ph-profile-edit-section'>
                <h6 className='mb-3'>Change password</h6>
                <div className='mb-2'>
                    <PopInput placeholder='Current password' type='password' onChange={e => setPassword({ ...password, currentPassword: e })} />
                </div>
                <div className='mb-3'>
                    <PopInput placeholder='New password' type='password' onChange={e => setPassword({ ...password, newPassword: e })} />
                </div>
                <div className='d-flex justify-content-end'>
                    <button className="ph-btn ph-btn-primary" onClick={handlePasswordChange} disabled={loading}>Save changes</button>
                </div>
            </section>

            <CropperPopup openState={cropperOpen} onClose={() => setCropperOpen(false)} imgSrc={inputImg} onCrop={handleCrop} />
        </div>
    )
}

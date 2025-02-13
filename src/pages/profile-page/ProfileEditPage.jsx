import React from 'react'
import { PopInput } from '../../components/inputs/PopInput'

export const ProfileEditPage = () => {
    return (
        <div className='container'>
            <h5 className='mb-4'>Update your profile</h5>
            <section className='ph-profile-edit-section mb-3'>
                <h6 className='mb-3'>General details</h6>
                <div className='ph-profile-edit-img-box d-flex align-items-center gap-3 mb-3'>
                    <img src={require("../../assets/img/profile-logo.png")} alt="" />
                    <div>
                        <label htmlFor="profile-img-input">
                            <div className='ph-btn ph-btn-shadow'><i class="ri-camera-fill fs-5"></i></div>
                            <input type="file" name="" id="profile-img-input" className='d-none' multiple={false} accept='image/*' />
                        </label>
                    </div>
                </div>
                <div className='mb-2'>
                    <PopInput placeholder='Full name' />
                </div>
                <div className='mb-3'>
                    <PopInput placeholder='Email' />
                </div>
                <div className='d-flex justify-content-end'>
                    <button className="ph-btn ph-btn-primary">Save changes</button>
                </div>
            </section>

            <section className='mb-3 ph-profile-edit-section'>
                <h6 className='mb-3'>Health details</h6>
                <div className='mb-3'>
                    <PopInput placeholder='Blood group (B+)' />
                </div>
                <div className='d-flex justify-content-end'>
                    <button className="ph-btn ph-btn-primary">Save changes</button>
                </div>
            </section>

            <section className='mb-3 ph-profile-edit-section'>
                <h6 className='mb-3'>Contact details</h6>
                <div className='mb-2 ph-d-grid-2__first-prior gap-2 align-items-center'>
                    <PopInput placeholder='Phone number (+91)' type='number' />
                    <div><button className="ph-btn ph-btn-primary">Verify</button></div>
                </div>
                <div className='mb-2'>
                    <PopInput placeholder='Address line 1' />
                </div>
                <div className='mb-3 d-flex gap-2'>
                    <PopInput placeholder='District' className='ph-form-input-3-width' />
                    <PopInput placeholder='State' className='ph-form-input-3-width' />
                    <PopInput placeholder='Nationality' value='India' disabled className='ph-form-input-3-width' />
                </div>
                <div className='mb-2'>
                    <PopInput placeholder='Pin code' type='number' />
                </div>
                <div className='d-flex justify-content-end'>
                    <button className="ph-btn ph-btn-primary">Save changes</button>
                </div>
            </section>

            <section className='mb-3 ph-profile-edit-section'>
                <h6 className='mb-3'>Change password</h6>
                <div className='mb-2'>
                    <PopInput placeholder='Current password' type='password' />
                </div>
                <div className='mb-3'>
                    <PopInput placeholder='New password' type='password' />
                </div>
                <div className='d-flex justify-content-end'>
                    <button className="ph-btn ph-btn-primary">Save changes</button>
                </div>
            </section>
        </div>
    )
}

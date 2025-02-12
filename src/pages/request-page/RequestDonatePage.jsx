import React from 'react'
import { PopInput } from '../../components/inputs/PopInput'

export const RequestDonatePage = () => {
    return (
        <div className='container'>
            <div className='mb-4'>
                <h5>Request for a Blood donation</h5>
                <p>Create a application to request for a urgent blood donation. <a href="" className='ph-url-colored'>Learn more</a></p>
            </div>

            <div>
                <form action="">
                    <div className='mb-3'>
                        <h6>Contact details</h6>
                        <div className='mb-2'>
                            <PopInput placeholder='Applicant full name' />
                        </div>
                        <div className='mb-2'>
                            <PopInput placeholder='Phone number (+91)' type='number' />
                        </div>
                        <div className='mb-2'>
                            <PopInput placeholder='Email id' type='email' />
                        </div>
                        <div className='mb-2'>
                            <PopInput placeholder='Address line 1' type='text' />
                        </div>
                        <div className='mb-2 d-flex gap-2'>
                            <PopInput placeholder='District' type='text' className='ph-form-input-3-width' />
                            <PopInput placeholder='State' type='text' className='ph-form-input-3-width' />
                            <PopInput placeholder='Nationality' type='text' value='India' disabled={true} className='ph-form-input-3-width' />
                        </div>
                        <div className='mb-2'>
                            <PopInput placeholder='Postal code' type='number' />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h6>Donation details</h6>
                        <div className='mb-2'>
                            <PopInput placeholder='Blood group ( eg. B+ )' type='text' />
                        </div>
                        <div>
                            <h6>Required within date</h6>
                            <input type="date" name="" />
                        </div>
                    </div>
                </form>
            </div>
            <div className='mb-3'>
                <div className='d-flex gap-2 mb-2'>
                    <input type="checkbox" name="" id="commit-check-box" />
                    <label htmlFor='commit-check-box' className='m-0'>I commit that all the given inforfations are correct.</label>
                </div>
                <div>
                    <button className="ph-btn ph-btn-primary py-2 px-4">Submit request</button>
                </div>
            </div>

        </div>
    )
}

import React from 'react'
import "./campaign.style.css"
import { PopInput } from '../../components/inputs/PopInput'
import addImgSvg from "../../assets/svg/add-image.svg"

export const CreateCampaign = () => {
    return (
        <div className='container'>
            <div className='mb-3'>
                <h5>Share your nearby health campaign</h5>
                <p>Help others in your locality by awaring them about upcoming health campaign</p>
            </div>
            <div className='mb-3'>
                <form action="">
                    <div>
                        <div className='mb-2'>
                            <PopInput placeholder='Campaign title' />
                        </div>
                        <div className='mb-2'>
                            <PopInput placeholder='Address line 1' />
                        </div>
                        <div className='mb-2 d-flex gap-2'>
                            <PopInput placeholder='District' className='ph-form-input-3-width' />
                            <PopInput placeholder='State' className='ph-form-input-3-width' />
                            <PopInput placeholder='Nationality' value='India' disabled className='ph-form-input-3-width' />
                        </div>
                        <div className='mb-2'>
                            <PopInput placeholder='Pin code' type='Number' />
                        </div>
                        <div className='mb-2'>
                            <PopInput placeholder='Contact no. ( If aplicable )' type='Number' />
                        </div>
                        <div className='mb-2 d-flex gap-2'>
                            <div className='ph-form-input-2-width'>
                                <h6>Campaign date</h6>
                                <input type="date" name="" id="" />
                            </div>
                            <div className='ph-form-input-2-width'>
                                <h6>Campaign time</h6>
                                <input type="time" name="" id="" />
                            </div>
                        </div>
                        <div className='mb-2'>
                            <textarea name="" id="" placeholder='Write about the campaign'></textarea>
                        </div>
                        <div>
                            <label htmlFor="leaflate-uploader" className='ph-campaign-leaflate-uploader'>
                                <div><img src={addImgSvg} alt="" width={100} /></div>
                                <div>Upload a leaflate of the campaign. Filesize within 10mb</div>
                                <input type="file" accept='image/*' multiple={false} id='leaflate-uploader' className='d-none' />
                            </label>
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
                    <button className="ph-btn ph-btn-primary py-2 px-4">Share campaign</button>
                </div>
            </div>
        </div>
    )
}

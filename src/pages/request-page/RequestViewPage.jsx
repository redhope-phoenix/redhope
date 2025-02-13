import React from 'react'

export const RequestViewPage = () => {
    return (
        <div className='container'>
            <h5 className='mb-4'>Urgent blood required</h5>
            <div className='d-flex gap-2 align-items-center mb-4'>
                <img src={require("../../assets/img/profile-logo.png")} alt="" width={50} className='rounded-5' />
                <div>Priyam Chakrabarty</div>
            </div>
            <div className='mb-2'><span><i class="ri-information-2-line text-success"></i></span> <span>Required within 12/11/2024</span></div>
            <div className='mb-5 ph-table'>
                <div><strong>Blood group </strong><span>B+</span></div>
                <div><strong>Date </strong><span>12/11/20</span></div>
                <div><strong>Address </strong><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, enim?</span></div>
                <div><strong>Pin code </strong><span>735102</span></div>
                <div><strong>Contact no </strong><span>5645646546</span></div>
            </div>
            <div className='ph-d-flex-wrap gap-3 mb-2'>
                <button className="ph-btn ph-btn-primary">
                    <span><i class="ri-hand-heart-line"></i></span>
                    <span>Help Priyam Chakrabarty</span>
                </button>
                <button className="ph-btn ph-btn-shadow"><span><i class="ri-share-forward-line"></i></span></button>
                <button className="ph-btn ph-btn-shadow"><span><i class="ri-information-2-line"></i></span><span>Report abuse</span></button>
            </div>
        </div>
    )
}

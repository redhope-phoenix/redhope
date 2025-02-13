import React from 'react'

export const CampaignViewPage = () => {
    return (
        <div className='container'>
            <h5 className='mb-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, et?</h5>
            <div className='ph-d-flex-wrap gap-3 mb-4'>
                <button className="ph-btn ph-btn-primary"><span><i class="ri-share-forward-line"></i></span><span>Sahre</span></button>
                <button className="ph-btn ph-btn-shadow"><span><i class="ri-information-2-line"></i></span><span>Report abuse</span></button>
            </div>
            <div className='mb-4'>
                <h6>Campaign description</h6>
                <pre>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate, commodi similique! Nostrum accusantium excepturi nobis maiores accusamus consequuntur sit, earum porro saepe blanditiis. Corrupti provident in odit eaque hic a?</pre>
            </div>
            <div className='mb-4'>
                <h6>Campaign details</h6>
                <div className='ph-table'>
                    <div><strong>Date </strong><span>12/11/20</span></div>
                    <div><strong>time </strong><span>12:20</span></div>
                    <div><strong>Address </strong><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, enim?</span></div>
                    <div><strong>Pin code </strong><span>735102</span></div>
                    <div><strong>Contact no </strong><span>5645646546</span></div>
                </div>
            </div>
            <div className='ph-campaign-img-box'>
                <h6>Read the leaflate</h6>
                <img src={require("../../assets/img/sample-img.jpg")} alt="" />
            </div>
        </div>
    )
}

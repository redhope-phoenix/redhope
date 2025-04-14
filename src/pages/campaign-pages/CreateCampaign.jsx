import React, { useEffect, useState } from 'react'
import "./campaign.style.css"
import { PopInput } from '../../components/inputs/PopInput'
import addImgSvg from "../../assets/svg/add-image.svg"
import { SelectionInput } from '../../components/inputs/SelectionInput'
import { useNavigate } from 'react-router-dom'
import axios from '../../configs/axios-configs'
import { toast } from 'react-toastify'

export const CreateCampaign = () => {
    const navigate = useNavigate();
    // states for inputs
    const [campaignInfo, setCampaignInfo] = useState({});
    const [contactInfo, setContactInfo] = useState({});
    const [leaflet, setLeaflet] = useState(null);
    const [commitCheck, setCommitCheck] = useState(false);

    // upload campaign 
    const [loading, setLoading] = useState(false);
    const handleUploadCampaign = async () => {
        if (!commitCheck) return;
        try {
            setLoading(true);
            await axios.post("/campaign/create-campaign", { ...campaignInfo, ...contactInfo, date: `${campaignInfo?.date}T${campaignInfo?.time}`, leaflet: leaflet }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((res) => {
                    toast.success("Campaign created successfully");
                    navigate(`/campaign/${res.data?.data?.id}`)
                })
        } catch (error) {
            if (error.response.status === 400) toast.error("Please fillup all required fields")

        }
        setLoading(false);
    }

    // document title
    useEffect(() => {
        document.title = "Create new campaign - Redhope";
    }, []);

    // camaign categories
    const campCategories = [
        "Genereal health camp",
        "Blood donation camp",
        "Eye check up camp",
        "Dental check up camp",
        "Alternative Medicine & Wellness Camps",
        "Child & Maternal Health Camps",
        "Health Education & Awareness Camps",
    ]

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
                            <PopInput placeholder='Campaign title' onChange={e => setCampaignInfo({ ...campaignInfo, title: e })} />
                        </div>
                        <div className='mb-2'>
                            <SelectionInput placeholder='Select a category' list={campCategories} onChange={e => setCampaignInfo({ ...campaignInfo, category: e })} />
                        </div>
                        <div className='mb-2'>
                            <PopInput placeholder='Address line 1' onChange={e => setContactInfo({ ...contactInfo, address: { ...contactInfo?.address, addressLine: e } })} />
                        </div>
                        <div className='mb-2 d-flex gap-2'>
                            <PopInput placeholder='District' className='ph-form-input-3-width' onChange={e => setContactInfo({ ...contactInfo, address: { ...contactInfo?.address, district: e } })} />
                            <PopInput placeholder='State' className='ph-form-input-3-width' onChange={e => setContactInfo({ ...contactInfo, address: { ...contactInfo?.address, state: e } })} />
                            <PopInput placeholder='Nationality' value='India' disabled className='ph-form-input-3-width' />
                        </div>
                        <div className='mb-2'>
                            <PopInput placeholder='Pin code' type='Number' onChange={e => setContactInfo({ ...contactInfo, pincode: e })} />
                        </div>
                        <div className='mb-2'>
                            <PopInput placeholder='Contact no. (Optional)' type='Number' onChange={e => setContactInfo({ ...contactInfo, contactNo: e })} />
                        </div>
                        <div className='mb-2 d-flex gap-2'>
                            <div className='ph-form-input-2-width'>
                                <h6>Campaign date</h6>
                                <input type="date" name="" placeholder='Campaign date' id="" min={new Date().toISOString().split("T")[0]} onChange={e => setCampaignInfo({ ...campaignInfo, date: e.target.value })} />
                            </div>
                            <div className='ph-form-input-2-width'>
                                <h6>Campaign time</h6>
                                <input type="time" name="" id="" placeholder='Campaign time' onChange={e => setCampaignInfo({ ...campaignInfo, time: e.target.value })} />
                            </div>
                        </div>
                        <div className='mb-2'>
                            <textarea name="" id="" className='ph-textarea' placeholder='Write about the campaign' onChange={e => setCampaignInfo({ ...campaignInfo, description: e.target.value })}></textarea>
                        </div>
                        <div className='mb-2'>
                            <PopInput placeholder='Registration form link (Optional)' type='text' onChange={e => setContactInfo({ ...contactInfo, registrationLink: e })} />
                        </div>
                        <div>
                            <label htmlFor="leaflet-uploader" className='ph-campaign-leaflet-uploader px-2'>
                                {leaflet ?
                                    <div className='ph-campaign-upload-img-box'>
                                        <img src={URL.createObjectURL(leaflet)} alt="" />
                                        <div className='ph-campaign-upload-change-btn'><span><i className="bi bi-hand-index-thumb"></i></span> Click to change image</div>
                                    </div> :
                                    <>
                                        <div><img src={addImgSvg} alt="" width={100} /></div>
                                        <div className='text-center'>Upload a leaflet of the campaign. Filesize within 10mb</div>
                                    </>}
                                <input type="file" accept='image/*' multiple={false} id='leaflet-uploader' className='d-none'
                                    onChange={e => {
                                        const file = e.target.files[0];
                                        if (file?.size <= 10485760) {
                                            setLeaflet(file);
                                        } else toast.warn("Maximum acceptable file size is 10mb")
                                    }}
                                />
                            </label>
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
                    <button className="ph-btn ph-btn-primary py-2 px-4" onClick={handleUploadCampaign} disabled={!commitCheck || loading}>{loading ? "Creating campaign..." : "Share campaign"}</button>
                </div>
            </div>
        </div>
    )
}

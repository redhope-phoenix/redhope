import React, { use, useContext, useEffect, useState } from 'react'
import "./home.style.css"
import { CampaignItem } from '../../components/campaign-item/CampaignItem'
import axios from '../../configs/axios-configs';
import { formatDate } from '../../utils/date-converter';
import { Spinner } from '../../components/loaders/Spinner';
import blankPageSvg from "../../assets/svg/blank-page.svg"
import { useNavigate } from 'react-router-dom';
import { Dropdown } from '../../components/dropdown/Dropdown';
import AuthContext from '../../contexts/AuthContext';
import { useCurrentUser } from '../../hooks/current-user';
import donationSvg from "../../assets/svg/donation-logo.svg"
import campaignSvg from "../../assets/svg/campaign-logo.svg"
import assistantSvg from "../../assets/svg/doctor-ai.svg"

export const Home = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    // handle filter
    const [openFilter, setOpenFilter] = useState(false);
    const filterList = [
        {
            name: "My location",
            value: "pincode"
        },
        {
            name: "All campaigns",
            value: "all"
        }
    ]

    const [filter, setFilter] = useState(filterList[1]);

    // handle feed
    const [campaignList, setCampaignList] = useState(null);
    useEffect(() => {
        const fetchList = async () => {
            try {
                setCampaignList(null)
                await axios.get(`/campaign/campaign-feed?filter=${filter?.value}&pincode=${currentUser?.pincode || undefined}`)
                    .then(res => {
                        setCampaignList(res?.data?.data);
                    })
            } catch (error) {

            }
        }
        fetchList();
    }, [filter, currentUser]);

    // separates for todays campaigns
    const [todaysCampaignList, setTodaysCampaignList] = useState(null);
    useEffect(() => {
        if (campaignList) {
            setTodaysCampaignList(campaignList.filter(e => formatDate(e.date)?.formattedDate === formatDate(Date.now())?.formattedDate))
        }
    }, [campaignList])

    const [otherCampaignList, setOtherCampaignList] = useState(null);
    useEffect(() => {
        if (campaignList) {
            setOtherCampaignList(campaignList.filter(e => formatDate(e.date)?.formattedDate !== formatDate(Date.now())?.formattedDate))
        }
    }, [campaignList]);



    // document title
    useEffect(() => {
        document.title = "Redhope - sharing lives"
    }, []);

    return (
        <div className='container'>
            <div className="my-4 mb-5">
                <div className="text-center mb-4 ">
                    <h5>Services</h5>
                </div>
                <div className='ph-service-list'>
                    <div className='ph-service-item' onClick={() => navigate("/create-request")}>
                        <div className='d-flex justify-content-center'><img src={donationSvg} alt="" /></div>
                        <div className='text-center'>Request for donation</div>
                    </div>

                    <div className='ph-service-item' onClick={() => navigate("/create-campaign")}>
                        <div className='d-flex justify-content-center'><img src={campaignSvg} alt="" /></div>
                        <div className='text-center'>Contribute campaign</div>
                    </div>

                    <div className='ph-service-item' onClick={() => navigate("/health-assistant")}>
                        <div className='d-flex justify-content-center'><img src={assistantSvg} alt="" /></div>
                        <div className='text-center'>Health assistant</div>
                    </div>
                </div>

            </div>
            <div className='mb-4'>
                <div className="text-center mb-4 ">
                    <h5>Campaigns</h5>
                </div>
                <div className='d-flex align-items-center gap-3 mb-3 ph-feed-filter-btn' onClick={(e) => { e.stopPropagation(); setOpenFilter(!openFilter) }}>
                    <div><strong>Filter</strong><span><i className="ri-arrow-right-s-fill"></i></span></div>
                    <div>
                        <div>{filter.name}</div>
                        <div>
                            <Dropdown openState={openFilter} onClose={() => setOpenFilter(false)} closeOnBackClick>
                                <div>
                                    {filterList.map((item, index) => {
                                        return <div key={index} onClick={() => { setFilter(item); setOpenFilter(false) }} className={`ph-filter-opt ${filter?.value === item?.value && "ph-filter-opt-active"}`}>{item.name}</div>
                                    })}
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div>
                    {campaignList === null && <div className='text-center d-flex justify-content-center' style={{ width: "100%" }}><Spinner width={40} colorCode={1} /></div>}
                    {campaignList?.length === 0 && <div className='d-flex flex-column align-items-center' style={{ width: "100%" }}>
                        <div><img src={blankPageSvg} alt="" width={100} /></div>
                        <div>No campaigns found!</div>
                    </div>}
                    {todaysCampaignList?.length > 0 &&
                        <div className='mb-4'>
                            <h6 className='mb-3'>Today's Camps</h6>
                            <div className="ph-camps-list">
                                {todaysCampaignList?.map((item, index) => {
                                    return <CampaignItem key={index} data={item} />
                                })}
                            </div>
                        </div>
                    }
                    {otherCampaignList?.length > 0 &&
                        <div>
                            {todaysCampaignList?.length>0 && <h6 className='mb-3'>Other Camps</h6>}
                            <div className="ph-camps-list">
                                {otherCampaignList?.map((item, index) => {
                                    return <CampaignItem key={index} data={item} />
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className="ph-request-btn-box my-4 mb-5">
                <button className='ph-btn ph-request-btn ph-btn-shadow' onClick={() => navigate("/create-campaign")}><span>Contribute a campaign</span><span><i className="ri-arrow-right-wide-line"></i></span></button>
            </div>
        </div>
    )
}

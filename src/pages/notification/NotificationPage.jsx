import React, { useEffect, useState } from 'react'
import "./notification.style.css"
import axios from '../../configs/axios-configs';
import blankPageSvg from "../../assets/svg/blank-page.svg"
import { Spinner } from '../../components/loaders/Spinner';
import { formatDate } from '../../utils/date-converter';
import { useNavigate } from 'react-router-dom';

export const NotificationPage = () => {
    const [notificationList, setNotificationList] = useState(null);
    useEffect(() => {
        const fetchNotificationList = async () => {
            try {
                await axios.get("/user/get-notifications")
                    .then((res) => {
                        setNotificationList(res.data?.data)
                    })
            } catch (error) {

            }
        }
        fetchNotificationList();
    }, [])

    // document title
    useEffect(() => {
        document.title = "Notifications - Redhope"
    }, []);

    return (
        <div className='container'>
            <h5 className='mb-4'>Notifications</h5>
            <div>
                {!notificationList && <div className='text-center d-flex justify-content-center' style={{ width: "100%" }}><Spinner width={40} colorCode={1} /></div>}
                {notificationList?.length === 0 && <div className='text-center'>
                    <div><img src={blankPageSvg} alt="" width={100} /></div>
                    <div>No notifications found!</div>
                </div>}
                {notificationList?.map((item, index) => {
                    return <NotificationItem data={item} key={index} />
                })}
            </div>
        </div>
    )
}

const NotificationItem = ({ data }) => {
    const navigate = useNavigate();
    return (
        <div className='ph-notification-item'>
            <div className='ph-f-sm mb-1'>
                <span>{formatDate(data?.createdAt)?.formattedDate}</span>
                <span><i className="bi bi-dot"></i></span>
                <span>{formatDate(data?.createdAt)?.formattedTime}</span>
            </div>
            <div>
                <h6 className='mb-1'>{data?.title}</h6>
            </div>
            <div className='mb-2'>
                <pre className='ph-notification-body'>{data?.body}</pre>
            </div>
            <div>
                {data?.actions?.map((item, index) => {
                    return <button className="ph-btn ph-btn-shadow" onClick={() => navigate(item?.navigate)} key={index}>{item?.name}</button>
                })}
            </div>
        </div>
    )
}

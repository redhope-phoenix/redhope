import React from 'react'
import "./notification.style.css"

export const NotificationPage = () => {
    return (
        <div className='container'>
            <h5 className='mb-4'>Notifications</h5>
            <div>
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
            </div>
        </div>
    )
}

const NotificationItem = () => {
    return (
        <div className='ph-notification-item'>
            <div className='ph-f-sm mb-2'>
                <span>12/04/2024</span>
                <span><i className="bi bi-dot"></i></span>
                <span>12:04</span>
            </div>
            <div>
                <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>
            </div>
            <div>
                <pre className='ph-notification-body'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque aut inventore obcaecati iste pariatur non alias ut praesentium, veniam maiores. Omnis dolore, animi doloremque deserunt, expedita vel voluptate soluta ipsa et excepturi maxime officiis tempora quasi, quia sit illum in.</pre>
            </div>
        </div>
    )
}

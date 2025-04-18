import React from 'react'

export const TableLoader = ({ length = 3 }) => {
    return (
        <div>
            {
                Array.from({ length: length }).map((_, index) => {
                    return (
                        <div className='ph-t-loader-set' key={index}>
                            <div className='ph-t-loader-key' style={{ animationDelay: `${index * 100}ms` }} ></div>
                            <div className='ph-t-loader-value' style={{ animationDelay: `${index * 100}ms` }} ></div>
                        </div>
                    )
                })
            }

        </div>
    )
}

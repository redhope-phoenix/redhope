import React from 'react'
import "./spinner.style.css"

export const Spinner = ({ width = 25, colorCode = 0 }) => {
    const colors = ["#ffff", "#039a30"]
    return (
        <div className="loader" style={{ width, height:width, background: colors[colorCode] }}></div>
    )
}

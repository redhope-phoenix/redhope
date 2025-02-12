import React, { useEffect, useState } from 'react'
import { Dropdown } from '../dropdown/Dropdown'
import parse from "html-react-parser"
import DOMPurify from 'dompurify'

export const SelectionInput = ({ list = [], value = '', placeholder = '', onChange }) => {
    // handle dropdown
    const [openDropDown, setOpenDropDown] = useState(false);
    const handleOpenDropDown = e => {
        e.stopPropagation();
        setOpenDropDown(!openDropDown)
    }
    // handle menu selection
    const [selection, setSelection] = useState(value);

    const handleSelection = (text) => {
        setSelection(text);
        setOpenDropDown(false);
        // onChange(selection);
    }

    return (
        <div className='ph-section-input'>
            <div className={`ph-selection-preview ${openDropDown && "ph-slection-clicked"}`} onClick={handleOpenDropDown}>
                <span>{parse(DOMPurify.sanitize(selection || placeholder || "Select"))}</span>
                <span style={{ display: "block", rotate: openDropDown ? "180deg" : "0deg", transition: "rotate 0.2s" }}><i class="ri-arrow-down-s-line"></i></span>
            </div>
            {list?.length != 0 && <div className='d-flex justify-content-center'>
                <Dropdown className='ph-selection-drop-down' openState={openDropDown} closeOnBackClick onClose={() => setOpenDropDown(false)}>
                    <ul>
                        {
                            list?.map((item, index) => {
                                return <li key={index} className={`ph-btn-linear ${selection === item && "ph-btn-linear-active"}`} onClick={() => handleSelection(item)}>{parse(DOMPurify.sanitize(item || ''))}</li>
                            })
                        }
                    </ul>
                </Dropdown>
            </div>}
        </div>
    )
}

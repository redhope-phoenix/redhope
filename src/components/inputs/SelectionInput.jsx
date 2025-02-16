import React, { useEffect, useState } from 'react'
import { Dropdown } from '../dropdown/Dropdown'

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
        if (onChange) {
            onChange(text);
        }
    }

    return (
        <div className='ph-section-input'>
            <div className={`ph-selection-preview ${openDropDown && "ph-slection-clicked"}`} onClick={handleOpenDropDown}>
                <span>{selection || placeholder || "Select"}</span>
                <span style={{ display: "block", rotate: openDropDown ? "180deg" : "0deg", transition: "rotate 0.2s" }}><i class="ri-arrow-down-s-line"></i></span>
            </div>
            {list?.length != 0 && <div className='d-flex justify-content-center'>
                <Dropdown className='ph-selection-drop-down' openState={openDropDown} closeOnBackClick onClose={() => setOpenDropDown(false)}>
                    <ul>
                        {
                            list?.map((item, index) => {
                                return <li key={index} className={`${selection === item && "ph-selection-active"}`} onClick={() => handleSelection(item)}>{item}</li>
                            })
                        }
                    </ul>
                </Dropdown>
            </div>}
        </div>
    )
}

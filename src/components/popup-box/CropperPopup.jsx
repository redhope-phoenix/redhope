import React, { useRef } from 'react'
import { PopupBox } from './PopupBox'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export const CropperPopup = ({ openState, onClose, imgSrc, onCrop }) => {
    const cropperRef = useRef(null);
    const handleCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => {
                const file = new File([blob], "Cropped-img.jpg", { type: blob.type });
                onCrop(file);
                onClose();
            })
        }
    };
    return (
        <PopupBox openState={openState} onClose={onClose} className='ph-cropbox-popup'>
            <div className='ph-crop-popup-content-box'>
                <div className='justify-self-center'>
                    <Cropper
                        src={imgSrc}
                        ref={cropperRef}
                        aspectRatio={1}
                        guides={true}
                        className='ph-cropper-box'
                    />
                </div>
                <div className='d-flex p-3 justify-content-end'>
                    <button className="ph-btn" onClick={onClose}>Cancel</button>
                    <button className="ph-btn ph-btn-primary" onClick={handleCrop}>Crop & Save</button>
                </div>
            </div>
        </PopupBox>
    )
}

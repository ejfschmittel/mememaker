import React from "react"
import "../styles/components/image-upload.scss"
const ImageUpload = ({image, onChange}) => {

    const src = image ? image.src : null;

    return (
        <label className="image-upload">
            <input type="file" accept="image/*"   name="image" className="image-upload__input" onChange={onChange}  />
            <img className="image-upload__img" src={src} />
        </label>
    )
}

export default ImageUpload;
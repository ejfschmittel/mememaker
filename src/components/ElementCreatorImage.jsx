import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {createImageObject} from "../redux/canvasObjects/canvasOjbects.actions"
import ImageUpload from "./ImageUpload";
import FaceExtractor from "./FaceExtractor";
import {loadImage} from "../utils/images.utils"


const ImageCreator = () => {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const [isLoadingImage, setIsLoadingImage] = useState(null)

    const [faceImages, setFaceImages] = useState([])


    const onImageChange = async (e) => {
        console.log("load image")
        const loadedImage = await loadImage(e.target.files[0])
        setImage(loadedImage)
    }

    const addImageToCanvas = () => {
        dispatch(createImageObject(image))
    }

    return (
        <div className="ui-panel">
            <ImageUpload image={image} onChange={onImageChange} />
            <button className="button button--main mt--1" onClick={addImageToCanvas}>Add Image To Canvas</button>
            
            <FaceExtractor image={image} />
        </div>
    )
}

export default ImageCreator
import React, {useContext, useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import { createImageObject } from "../redux/canvasObjects/canvasOjbects.actions"
import {loadImage} from "../utils/images.utils"

import CanvasObjectContext from "../contexts/CanvasObjectContext";

// render face and button to add to canvas
const FaceImageDisplay = ({img}) => {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)

    useEffect(() => {
        getImage(img);
    }, [img])

    const getImage = async (img) => {
        const image = await loadImage(img)
        setImage(image)
    }


    const addImageToCanvas = () =>{
        dispatch(createImageObject(image))
    }

    return (
        <div className="face-image" onClick={addImageToCanvas}>
            <div className="face-image__img-container">
                <img src={image?.src} className="face-image__img"/>
            </div>
           
        </div>
    )
}

export default FaceImageDisplay

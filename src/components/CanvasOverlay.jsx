import React, {useState, useContext} from "react"
import {loadImageFromURL} from "../utils/images.utils"
import CanvasObjectContext from "../contexts/CanvasObjectContext";

/*
    select start image
        - white background
        - pre selected image
        - custom image


    resize canvas:

*/
import "../styles/components/canvas-overlay.scss"
import "../styles/components/image-overview-selector.scss"

import { useDispatch } from "react-redux";
import {hideOverlay, setCanvasSize, setBaseImage} from "../redux/canvas/canvas.actions"

const MEME_TEMPLATES_PATH = process.env.PUBLIC_URL + "/meme_templates/"
const MEME_TEMPLATES_LIST = [
    "TwoButtons.png",
    "ChangeMyMind.png",
    "DistractedBoyfriend.png",
    "LeftExitOffRamp.png",
    "RunningAwayBalloon.png",
]

const memeTemplatePaths = MEME_TEMPLATES_LIST.map((imgName) => MEME_TEMPLATES_PATH + imgName )




const CanvasStartOverlay = ({show}) => {
    const dispatch = useDispatch();
   

    

    const onImageClick = async (img) => {
        // check if image is url or file url
        const image = await loadImageFromURL(img)

        dispatch(setCanvasSize(image.width, image.height))
        dispatch(setBaseImage(image))
     
    }

    return (
        <div className="canvas-overlay" style={show ? null : {display: "none"}}>
            <div className="canvas-overlay__choose-img">
                <ImageOverviewAndSelector images={memeTemplatePaths} onImageClick={onImageClick} />
            </div>
            <div className="canvas-overlay__without-img">
                <button className="button button--main">Continue with white background</button>
            </div>
        </div>
    )
}






const ImageOverviewAndSelector = ({images, onImageClick}) => {


    return (
        <div className="image-overview-selector">
            <label className="image-overview-selector__label image-overview-selector__item">
                <input type="file" className="image-overview-selector__input" />
                Select custom image
            </label>

            {images.map((imgPath) => {
                return (
                <div className="image-overview-selector__item" onClick={() => onImageClick(imgPath)}>
                    <img src={imgPath}/>
                </div>)
            })} 

            
        </div>
    )
}




export default CanvasStartOverlay
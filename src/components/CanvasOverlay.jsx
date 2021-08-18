import React, {useState, useContext} from "react"
import {loadImageFromURL} from "../utils/images.utils"

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
    "BikeFall.png",
    "OneDoesNotSimply.png",
    "IsThisAPigeon.png",
    "EpicHandshaker.png",
    "ExpandingBrain.png",
    "Mocking Spongebob.png",
    "SadPabloEscobar.png",
    "BatmanSlappingRobin.png",
    "GrusPlan.png",
    "Draw25.png",
    "BuffDogeVS.png",
    "BernieSupport.png"
]

const memeTemplatePaths = MEME_TEMPLATES_LIST.map((imgName) => MEME_TEMPLATES_PATH + imgName )




const CanvasStartOverlay = ({show}) => {
    const dispatch = useDispatch();
   

    

    const onImageClick = async (img) => {
        // check if image is url or file url
        const image = await loadImageFromURL(img)

        console.log("loaded image")
        console.log(image)
        console.log(image.width, image.height)
        dispatch(setCanvasSize(image.width, image.height))
        dispatch(setBaseImage(image))
     
    }

    const setWhiteBackground = () => {
        dispatch(setCanvasSize(600, 400))
        dispatch(setBaseImage(null))
    }

    return (
        <div className="canvas-overlay" style={show ? null : {display: "none"}}>
            <div className="canvas-overlay__choose-img">
                <ImageOverviewAndSelector images={memeTemplatePaths} onImageClick={onImageClick} />
            </div>
            <div className="canvas-overlay__without-img">
                <button className="button button--main" onClick={setWhiteBackground}>Continue with white background</button>
            </div>
        </div>
    )
}






const ImageOverviewAndSelector = ({images, onImageClick}) => {


    const onCustomImageSelect = async (e) => {
        const imagePath = URL.createObjectURL(e.target.files[0]);

        const files = e.target.files

        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                onImageClick(fr.result);
                
            }
            fr.readAsDataURL(files[0]);
        }
    

    }

    return (
        <div className="image-overview-selector">
            <label className="image-overview-selector__label image-overview-selector__item">
                <input type="file" className="image-overview-selector__input" onChange={onCustomImageSelect}/>
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
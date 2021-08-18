import React, {useContext} from "react"
import { useSelector, useDispatch } from "react-redux"

import {setActiveObject, deleteObject} from "../redux/canvasObjects/canvasOjbects.actions"
import {showOverlay} from "../redux/canvas/canvas.actions"
import "../styles/components/canvas-object-label.scss"
import "../styles/components/base-image-display.scss"

const CanvasElementOverviewUI = () => {
   
    const baseImage = useSelector((state) => state.canvas.baseImage)
    const activeObject = useSelector((state) => state.canvasObjects.activeObject)
    const canvasObjects = useSelector((state) => state.canvasObjects.objects)
    const canvasObjectList = useSelector((state) => state.canvasObjects.objectList) 


    return (
        <div className="overview-ui">
            <BaseImageDisplay />
            <div className="object-labels"> 
                {canvasObjectList.length == 0 && (<div>Canvas Element Overview</div>)}
                {canvasObjectList.map((objectID) => {
                    const obj = canvasObjects[objectID];
                    return <CanvasObjectLabel object={obj} active={activeObject == obj.id}/>
                })}
            </div>
        </div>
    )
}

// change, size of canvas
const BaseImageDisplay = () => {
    const dispatch = useDispatch();
    const canvasDimensions = useSelector((state) => ({width: state.canvas.width, height: state.canvas.height}))
    const baseImage = useSelector(state => state.canvas.baseImage)


    let name = "None";
    if(baseImage){
        const splitPath = baseImage.src.split("/");
        name = splitPath[splitPath.length-1]
    }

    const openBaseImageOverlay = () => {
        dispatch(showOverlay())
    }
   
    return (
        <div className="base-image-display"> 
            <div className="base-image-display__img-container">

                {baseImage ? 
                <img className="base-image-display__img" src={baseImage.src}/>    
                :
                null
                }
                
            </div>
            <div className="base-image-display__info">
                <div className="base-iamge-display__info-text">BaseImage: {name}</div>
                <div>Dimensions: {canvasDimensions.width} x {canvasDimensions.height}</div>
            </div>
            <button className="button button--main mt--1" onClick={openBaseImageOverlay}>Change Base Image</button>
        </div>
    )
}

const CanvasObjectLabel = ({object, active}) => {
    const dispatch = useDispatch()

    const activeObject = () => {
        if(active == false){
            dispatch(setActiveObject(object.id))
        }
    }

    const dispatchDeleteObject = () => {
        // 
        dispatch(deleteObject(object.id))
    }

    return (
        <div className={`object-label ${active && "object-label--active"}`} onClick={activeObject}>

            <div className="object-label__info">
                <div className="object-label__type">
                    [{object.type}]
                </div>

                <div className="object-label__content">
                    {object.text}
                </div>

             
            </div>

            <button className="object-label__delete" onClick={dispatchDeleteObject}>
                Delete
            </button>
        </div>
    )
}

export default CanvasElementOverviewUI
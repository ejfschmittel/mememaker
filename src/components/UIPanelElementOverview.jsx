import React, {useContext} from "react"
import { useSelector, useDispatch } from "react-redux"

import CanvasObjectContext from "../contexts/CanvasObjectContext"
import "../styles/components/canvas-object-label.scss"


const CanvasElementOverviewUI = () => {
   
    const baseImage = useSelector((state) => state.canvas.baseImage)
    const activeObject = useSelector((state) => state.canvasObjects.activeObject)
    const canvasObjects = useSelector((state) => state.canvasObjects.objects)
    const canvasObjectList = useSelector((state) => state.canvasObjects.objectList) 


    return (
        <div className="overview-ui object-labels">
            
            {canvasObjectList.map((objectID) => {
                const obj = canvasObjects[objectID];
                return <CanvasObjectLabel object={obj} active={activeObject == obj.id}/>
            })}
        </div>
    )
}

const CanvasObjectLabel = ({object, active}) => {
  

    const activeObject = () => {
       
    }

    const deleteObject = () => {

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

            <button className="object-label__delete" onClick={deleteObject}>
                Delete
            </button>
        </div>
    )
}

export default CanvasElementOverviewUI
import React, {useContext} from "react"

import CanvasObjectContext from "../contexts/CanvasObjectContext"
import "../styles/components/canvas-object-label.scss"
const CanvasElementOverviewUI = () => {
    const {objects, objectList} = useContext(CanvasObjectContext)


    return (
        <div className="overview-ui object-labels">
            {
                objectList.length == 0 ? 
                (<div>Add new elements</div>)
                :
                objectList.map(objectID => {
                    const object = objects[objectID];
                    if(object === undefined) return;
                    return <CanvasObjectLabel key={`label-${objectID}`} object={objects[objectID]} />
                })
            }
        </div>
    )
}

const CanvasObjectLabel = ({object}) => {
    const {setActiveObject, activeObject, deleteObject} = useContext(CanvasObjectContext)
    console.log(object)
    const onClick = () => {
        setActiveObject(object.id)
    }

    return (
        <div className={`object-label ${activeObject == object.id && "object-label--active"}`} onClick={onClick}>

            <div className="object-label__info">
                <div className="object-label__type">
                    [{object.type}]
                </div>

                <div className="object-label__content">
                    {object.text}
                </div>

             
            </div>

            <button className="object-label__delete" onClick={() => deleteObject(object.id)}>
                Delete
            </button>
        </div>
    )
}

export default CanvasElementOverviewUI
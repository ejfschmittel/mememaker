import React, {useContext} from "react"
import {useSelector} from "react-redux"
import {CANVAS_OBJECT_TYPES} from "../redux/canvasObjects/canvasObjects.types"

import TextEditor from "./ElementEditorText"
import ImageEditor from "./ElementEditorImage"

const CurrentlySelectedElementUI = () => {
    const activeObject = useSelector((state) => state.canvasObjects.activeObject)
    const objects = useSelector((state) => state.canvasObjects.objects)


    const renderActiveObjectEdtior = (activeObject) => {
        const obj = objects[activeObject];
        switch(obj?.type){
            case CANVAS_OBJECT_TYPES.TEXT:
                return <TextEditor object={obj} />
            case CANVAS_OBJECT_TYPES.IMAGE:
                return <ImageEditor object={obj} />
            default: 
                return null;
        }   
    }

    return (
        <div className="selected-ui">

            <div className="ui-component">

                {activeObject ? 
                   renderActiveObjectEdtior(activeObject)
                :
                    "Select an item to edit"
                }
                
            </div>
        </div>
    )
}

export default CurrentlySelectedElementUI
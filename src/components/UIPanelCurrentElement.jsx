import React, {useContext} from "react"
import CanvasObjectContext from "../contexts/CanvasObjectContext"

import FontEditor from "./FontEditor"

const CurrentlySelectedElementUI = () => {

    const {objects, objectList, activeObject} = useContext(CanvasObjectContext)

    return (
        <div className="selected-ui">

            <div className="editor">

                {activeObject ? 
                    <FontEditor object={objects[activeObject]} />
                :
                    "select an item to edit"
                }
                
            </div>
        </div>
    )
}

export default CurrentlySelectedElementUI
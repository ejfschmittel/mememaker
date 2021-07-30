import React, {useState, useContext, useEffect} from "react"

import { useDispatch } from "react-redux"
import {updateObject} from "../redux/canvasObjects/canvasOjbects.actions"
import {normalizeValues} from "../utils/math.utils"

const DefaultOptions = ({edited, onChange}) => {
    return (
    <div className="editor__row">
        <div className="editor__field">
            <label className="editor__label">x:</label>
            <input type="number" className="editor__input" name="x" value={edited?.x} onChange={onChange}/>
        </div>

        <div className="editor__field">
            <label className="editor__label">y:</label>
            <input type="number" className="editor__input" name="y" value={edited?.y} onChange={onChange}/>
        </div>

        <div className="editor__field">
            <label className="editor__label">rotation:</label>
            <input type="number" className="editor__input" name="rotation" value={edited?.rotation} onChange={onChange}/>
        </div>
    </div>
    )
}

/*
    attributes
    x,y,rotation
    width, height
*/




const ElementEditorImage = ({object}) => {
   const dispatch = useDispatch()

    const onChange = (e) => {

        dispatch(updateObject(object.id, {
            [e.target.name]: e.target.value
        }))
    }

    const normalizedObject = normalizeValues(object)
    
    return (
        <div>
           <DefaultOptions edited={normalizedObject} onChange={onChange} />
           <div className="editor__field">
                <label className="editor__label">width:</label>
                <input type="number" className="editor__input" name="width" value={normalizedObject?.width} onChange={onChange}/>
            </div>

            <div className="editor__field">
                <label className="editor__label">height:</label>
                <input type="number" className="editor__input" name="height" value={normalizedObject?.height} onChange={onChange}/>
            </div>
        </div>
    )
}

export default ElementEditorImage
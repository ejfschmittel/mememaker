import React, {useState, useContext, useEffect} from "react"

import { useDispatch } from "react-redux"
import {updateObject} from "../redux/canvasObjects/canvasOjbects.actions"

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
    
    return (
        <div>
           <DefaultOptions edited={object} onChange={onChange} />
           
        </div>
    )
}

export default ElementEditorImage
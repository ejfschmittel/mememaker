import React, {useState, useContext, useEffect} from "react"

import { useDispatch } from "react-redux"
import {updateObject} from "../redux/canvasObjects/canvasOjbects.actions"
import {normalizeValues} from "../utils/math.utils"

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

    const nObject = normalizeValues(object)
    
    return (
        <div className="image-editor">
            <label className="image-editor__label-x">x:</label>
            <input type="number" className="image-editor__input-x" name="x" value={nObject?.x} onChange={onChange}/>

            <label className="image-editor__label-y">y:</label>
            <input type="number" className="image-editor__input-y" name="y" value={nObject?.y} onChange={onChange}/>

            <label className="image-editor__label-rotation">rotation:</label>
            <input type="number" className="image-editor__input-rotation" name="rotation" value={nObject?.rotation} onChange={onChange}/>

            <label className="image-editor__label-width">width:</label>
            <input type="number" className="image-editor__input-width" name="width" value={nObject?.width} onChange={onChange}/>

            <label className="image-editor__label-height">height:</label>
            <input type="number" className="image-editor__input-height" name="height" value={nObject?.height} onChange={onChange}/>
           
        </div>
    )
}

export default ElementEditorImage
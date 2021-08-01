import React, {useState, useContext, useEffect} from "react"
import CanvasObjectContext from "../contexts/CanvasObjectContext"
import { useDispatch } from "react-redux"
import {updateObject} from "../redux/canvasObjects/canvasOjbects.actions"
import{normalizeValues} from "../utils/math.utils"

/*
    attributes
    x,y,rotation
    text
    fontSize
    fill
    stroke,
    strokeWidth,
    font?

*/

const ElementEditorText = ({object}) => {
   const dispatch = useDispatch()

    const onChange = (e) => {

        dispatch(updateObject(object.id, {
            [e.target.name]: e.target.value
        }))
    }

    const nObject = normalizeValues(object)
    
    return (
        <div className="text-editor">
          <label className="text-editor__label-text">text:</label>
          <input type="text" className="text-editor__input-text" name="text" value={nObject?.text} onChange={onChange}/>

          <label className="text-editor__label-x">x:</label>
          <input type="number" className="text-editor__input-x" name="x" value={nObject?.x} onChange={onChange}/>

          <label className="text-editor__label-y">y:</label>
          <input type="number" className="text-editor__input-y" name="y" value={nObject?.y} onChange={onChange}/>

          <label className="text-editor__label-rotation">rotation:</label>
          <input type="number" className="text-editor__input-rotation" name="rotation" value={nObject?.rotation} onChange={onChange}/>

          <label className="text-editor__label-font-size">size:</label>
          <input type="number" className="text-editor__input-font-size" name="fontSize" value={nObject?.fontSize} onChange={onChange}/>

          <label className="text-editor__label-color">color:</label>
          <input type="color" className="text-editor__input-color" name="fill" value={nObject?.fill} onChange={onChange}/>

          <label className="text-editor__label-stroke-width">strokeWidth:</label>
          <input type="number" className="text-editor__input-stroke-width" name="strokeWidth" value={nObject?.strokeWidth} onChange={onChange}/>
           

          <label className="text-editor__label-stroke">stroke:</label>
          <input type="color" className="text-editor__input-stroke" name="stroke" value={nObject?.stroke} onChange={onChange}/>
        </div>
    )
}

export default ElementEditorText
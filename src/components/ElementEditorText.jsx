import React, {useState, useContext, useEffect} from "react"
import CanvasObjectContext from "../contexts/CanvasObjectContext"
import { useDispatch } from "react-redux"
import {updateObject} from "../redux/canvasObjects/canvasOjbects.actions"
/*
    x, y, rotation
    text, color, outline, outline color
    fontsize

*/
/*
    update on edit
*/
const useElementEditor = (original) => {
    const [edited, setEdited] = useState(original)


    return [edited]
}

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
    
    return (
        <div>
           <DefaultOptions edited={object} onChange={onChange} />


           <div className="editor__row">
                <div className="editor__field">
                    <label className="editor__label">text:</label>
                    <input type="text" className="editor__input" name="text" value={object?.text} onChange={onChange}/>
                </div>

                <div className="editor__field">
                    <label className="editor__label">fontSize:</label>
                    <input type="number" className="editor__input" name="fontSize" value={object?.fontSize} onChange={onChange}/>
                </div>

                <div className="editor__field">
                    <label className="editor__label">color:</label>
                    <input type="color" className="editor__input" name="fill" value={object?.fill} onChange={onChange}/>
                </div>

               
            </div>
           
        </div>
    )
}

export default ElementEditorText
import React from "react"


const defaultOptions = {
    x: 0,
    y: 0,
    rotation: 0,
}

const DefaultEditorFields = ({object, onChange}) => {
    return ( 
        <div className="editor__row">
            <div className="editor__field">
                <label className="editor__label">x:</label>
                <input type="number" className="editor__input" name="x" value={object?.x || defaultOptions.x} onChange={onChange}/>
            </div>

            <div className="editor__field">
                <label className="editor__label">y:</label>
                <input type="number" className="editor__input" name="y" value={object?.y || defaultOptions.y} onChange={onChange}/>
            </div>

            <div className="editor__field">
                <label className="editor__label">rotation:</label>
                <input type="number" className="editor__input" name="rotation" value={object?.rotation || defaultOptions.rotation} onChange={onChange}/>
            </div>
        </div>
    )
}

export default DefaultEditorFields;
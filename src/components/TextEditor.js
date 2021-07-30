import React from "react";

import DefaultEditorFields from "./DefaultEditorFields";

const defaultOptions = {
    text: "",
    fontSize: 24,
    color: "#0000000",
}

const TextEditor = ({object, onChange}) => {
    return(
        <div>
           <DefaultEditorFields object={object} onChange={onChange} />


           <div className="editor__row">
                <div className="editor__field">
                    <label className="editor__label">text:</label>
                    <input type="text" className="editor__input" name="text" value={object?.text || defaultOptions.text} onChange={onChange}/>
                </div>

                <div className="editor__field">
                    <label className="editor__label">fontSize:</label>
                    <input type="number" className="editor__input" name="fontSize" value={object?.fontSize  || defaultOptions.fontSize} onChange={onChange}/>
                </div>

                <div className="editor__field">
                    <label className="editor__label">color:</label>
                    <input type="color" className="editor__input" name="fill" value={object?.fill  || defaultOptions.color} onChange={onChange}/>
                </div>

               
            </div>
           
        </div>
    )
}

export default TextEditor
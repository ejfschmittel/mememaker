import React, {useState, useContext} from "react";

import { useDispatch } from "react-redux";
import {createTextObject} from "../redux/canvasObjects/canvasOjbects.actions"




const TextCreator = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState("")

    const onTextChange = (e) => {
        setText(e.target.value)
    }

    const onClick = () => {
        // add text element
        dispatch(createTextObject(text))
    }

    return (

        <div className="ui-component text-creator">
            <div className="text-creator__input-container">
                <input type="text" onChange={onTextChange} value={text} className="text-creator__input"/> 
            </div>
            <button className="button button--main mt--1" onClick={onClick}>Add Text To Canvas</button>
        </div>
    )
}

export default TextCreator
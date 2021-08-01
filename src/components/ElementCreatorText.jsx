import React, {useState, useContext} from "react";

import { useDispatch } from "react-redux";
import {createTextObject} from "../redux/canvasObjects/canvasOjbects.actions"

import Editor, {EditorField, EditorRow, EditorInput} from "./Editor";


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
        <Editor className="editor--min">
            <EditorRow>
                <EditorField>
                    <EditorInput type="text" onChange={onTextChange} value={text}/> 
                </EditorField>
            </EditorRow>
            <button className="button button--main mt--1" onClick={onClick}>Add Text To Canvas</button>
        </Editor>
    )
}

export default TextCreator
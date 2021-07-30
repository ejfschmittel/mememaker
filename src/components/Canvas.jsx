
import React, {useContext, useEffect, useRef, useState} from "react"
import { Stage, Container, Sprite, Text } from '@inlet/react-pixi';

import * as PIXI from "pixi.js"
import ObjectContainer from "../pixijs/ObjectContainer"; 
import {CANVAS_OBJECT_TYPES} from "../redux/canvasObjects/canvasObjects.types"
/*
    background image

    - more images
    - text
    - shapes?

    // draggable
    https://codesandbox.io/s/react-pixi-viewport-with-dragging-p4wve?from-embed=&file=/src/Draggable.tsx:140-153


    []

    {
        id: {
            selected: false
            type: "text" | "image" | "form"
            x: 
            y:
            rotation:
            width: 
            height: 
            anchor
            ?image
            ?fill
        }
    }

    [leveling]

*/
import "../styles/components/canvas.scss"
import CanvasStartOverlay from "./CanvasOverlay";
import {app, setUpApp, render} from "../pixijs/PixiApp"


import {useDispatch, useSelector} from "react-redux"

import Viewport from "./Viewport";


const Canvas = () => {
    const canvasRef = useRef()
    const dispatch = useDispatch()
    const canvasSize = useSelector((state) => ({width: state.canvas.width, height: state.canvas.height}))
    const showOverlay = useSelector((state) => state.canvas.showOverlay)
    const baseImage = useSelector((state) => state.canvas.baseImage)
    const canvasObjects = useSelector((state) => state.canvasObjects.objects)
    const canvasObjectList = useSelector((state) => state.canvasObjects.objectList)


    useEffect(() => {
        // set up pixi js

        
        setUpApp(canvasRef.current, canvasSize)
       
    },[])






    console.log(canvasObjectList)
    console.log(canvasObjects)

    return (
        <div className="canvas">
            <CanvasStartOverlay show={showOverlay} />
            <div style={{width: canvasSize.width, height: canvasSize.height}} ref={canvasRef} ></div>
        </div>
    )
}



export default Canvas;
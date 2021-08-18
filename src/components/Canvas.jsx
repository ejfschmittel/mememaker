
import React, {useContext, useEffect, useRef, useState} from "react"


import "../styles/components/canvas.scss"
import CanvasStartOverlay from "./CanvasOverlay";
import {app, setUpApp, render} from "../pixijs/PixiApp"


import {useDispatch, useSelector} from "react-redux"
import {setCanvas} from "../redux/canvas/canvas.actions"



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
        dispatch(setCanvas(canvasRef.current))
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

import React, {useContext, useEffect, useRef, useState} from "react"
import { Stage, Container, Sprite, Text, render } from '@inlet/react-pixi';

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
import {app} from "../pixijs/PixiApp"
import CanvasObjectContext from "../contexts/CanvasObjectContext"

import {useDispatch, useSelector} from "react-redux"

import Viewport from "./Viewport";
import { setActiveObject, updateObject, updatePosition } from "../redux/canvasObjects/canvasOjbects.actions";


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

        canvasRef.current.appendChild(app.view)
    },[])

    

    const activateObject = (id) => {
        dispatch(setActiveObject(id))
    }

    const updatePosition = (id, x, y) => {
        if(x >= 0 && x <= canvasSize.width && y >= 0 && y <= canvasSize.height){
            dispatch(updateObject(id, {x,y}))
        }
        
    }


    const renderCanvasObject = (object) => {
        console.log(object)
        switch(object.type){
            
            case CANVAS_OBJECT_TYPES.TEXT:
                return (
                    <ObjectContainer id={object.id} x={object.x} y={object.y} rotation={object?.rotation} activateObject={activateObject} updatePosition={updatePosition}>
                        <Text text={object.text} style={new PIXI.TextStyle({
                            fill: object.fill ? PIXI.utils.string2hex(object.fill) : 0x000000,                     
                            stroke: object.stroke ? PIXI.utils.string2hex(object.stroke) : 0x000000,                                      
                            strokeThickness: object?.strokeWidth || 0,
                        })} />
                    </ObjectContainer>  
                )

            default:
                return null;
        }
    }


    console.log(canvasObjectList)
    console.log(canvasObjects)

    return (
        <div className="canvas">
            <CanvasStartOverlay show={showOverlay} />
            <div ref={canvasRef}></div>
            {/*<Stage  options={{ backgroundColor: 0xffffff}} width={canvasSize.width} height={canvasSize.height}>
                {/*<Viewport width={canvasSize.width} height={canvasSize.height}> 
                    {baseImage && (<Sprite image={baseImage.src}/> )}
                    {canvasObjectList.map((id) => {
                        console.log("rendering canvas object")
                        console.log(id)
                        const canvasObject = renderCanvasObject(canvasObjects[id])
                        console.log(canvasObjects)
                        return canvasObject
                    })}
               </Viewport>
            </Stage>*/}
        </div>
    )
}



export default Canvas;
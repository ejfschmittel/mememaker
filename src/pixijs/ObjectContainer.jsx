import React, {useContext, useState, useRef, useEffect} from "react"
import { Stage, Container, Sprite, Text, Graphics } from '@inlet/react-pixi';
import CanvasObjectContext, { CanvasOjbectContextProvider } from "../contexts/CanvasObjectContext";
import * as PIXI from "pixi.js"


import {setActiveObject} from "../redux/canvasObjects/canvasOjbects.actions"

// https://codesandbox.io/s/react-pixi-viewport-with-dragging-forked-x1vpf?file=/src/Draggable.tsx

const ObjectContainer = ({children, activateObject, updatePosition, id, ...props}) => {

    const containerRef = useRef()
    const [dimensions, setDimensions] = useState({width: 0,height: 0})

    useEffect(() => {
        setDimensions({width: containerRef.current.width, height: containerRef.current.height})
    }, [containerRef.current])


    const onDragStart = (event) => {
        activateObject(id);
        const sprite = event.currentTarget;
        const viewport = sprite.parent;
  
        sprite.alpha = 0.8;
        sprite.data = event.data;
        sprite.dragging = true;
        
    };

    const onDragMove = (event) => {
        const sprite = event.currentTarget;
        if (sprite.dragging) {
          const newPosition = sprite?.data.getLocalPosition(sprite.parent);
          updatePosition(id, newPosition.x, newPosition.y)
        }
      };

    const onDragEnd = (event) => {
        const sprite = event.currentTarget;
        const viewport = sprite.parent; 
        sprite.alpha = 1;
        sprite.dragging = false; 
        
      };

  
    const padding = 3;
    const draw = g => {
 
            g.clear()   
            g.lineStyle(2, 0x00000, 1)
            g.moveTo( 0, 0)
            g.lineTo(0, dimensions.height )
            g.lineTo(dimensions.width , dimensions.height)
            g.lineTo(dimensions.width , 0)
            g.lineTo(0, 0 )
    }



     
   

    return (
       
        <Container 
            interactive
            buttonMode={true}
            ref={containerRef}
            anchor={.5}
            {...props}
            interactive
            pointerdown={onDragStart}
            pointerup={onDragEnd}
            pointerupoutside={onDragEnd}
            pointermove={onDragMove}
            >
            <Graphics draw={draw} > </Graphics>
            {children}
           

        </Container>
    )
}

export default ObjectContainer
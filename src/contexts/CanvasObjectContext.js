import React, {createContext, useState} from "react"
import { Stage, Container, Sprite, Text } from '@inlet/react-pixi';
import * as PIXI from "pixi.js"
import ObjectContainer from "../pixijs/ObjectContainer";
import { v4 as uuidv4 } from 'uuid';
 const CanvasObjectContext = createContext({})




 const id = "id"

 const OBJECT_TYPE = {
     TEXT: "text",
     IMAGE: "image",
     GRAPHIC: "graphic"
 }

 const defaultObjects = {
    /*[id]: {
        id: id,
        type: "text",
        text: "test",
        x: 100,
        y: 100,
        rotation: .3,
        fontSize: 32,
        fill: "#ff0000",
    }*/
 };
 const defalutObjectList = [id]

 export const CanvasOjbectContextProvider = ({children}) => {
    const [canvasSize, setCanvasSize] = useState({width: 800, height: 600})
    const [objects, setObjects] = useState(defaultObjects)
    const [objectList, setObjectList] = useState(defalutObjectList)
    const [activeObject, setActiveObject] = useState(null)


    const getObject = (objectID) => objectID in objects ? objects[objectID] : null; 

    const renderObject = (objectID) => {
        console.log("renderobjects")
        const object = getObject(objectID)
        if(object){
            switch(object.type){
                case OBJECT_TYPE.TEXT:
                    console.log(object)
                    return (
                        <ObjectContainer id={object.id} setActiveObject={setActiveObject} x={object.x} y={object.y} rotation={object.rotation}>
                            <Text text={object.text} style={new PIXI.TextStyle({
                                fontSize: object?.fontSize,
                                fill: object?.fill
                            })} />
                        </ObjectContainer>    
                    )
                    case OBJECT_TYPE.IMAGE:
                        console.log(object)
                    
                        return (
                            <ObjectContainer id={object.id} setActiveObject={setActiveObject} x={object.x} y={object.y} rotation={object.rotation}>

                                <Sprite
                                    image={object.image}
                                    scale={{
                                        x: object.scale,
                                        y: object.scale,
                                    }}
                                />
                                    
                                
                            </ObjectContainer>    
                        )
                
                   

                default:
                    return null;
            }
        }
        return null;
    }

    const objectExists = (objectID) => objectID in objects

    const isSameObject = (obj1, obj2) => {
        return JSON.stringify(obj1) === JSON.stringify(obj2) 
    }

    const updateObject = (objectID, updatedObject) => {

        if(objectExists(objectID) && !isSameObject(updatedObject, objects[objectID])){
            console.log("passed checks")
            setObjects((old) => ({...old, [objectID]: updatedObject}))
        }
    }


    const deleteObject = (objectID) => {

        const newObjectList = objectList.filter((value) => value == objectID);
        setObjectList(newObjectList)
        if(activeObject == objectID){setActiveObject(null)}
        setObjects((old) => ({...old, [objectID]: undefined}))

      
    }

    const createObject = (object) => {
        console.log("create object")
        console.log(object)
        const uuid = uuidv4();
        const objectWidthID = {...object, id: uuid}
        setObjects((old) => ({...old, [uuid]: objectWidthID}))
        setObjectList((old) => [...old, uuid])
        setActiveObject(uuid)
    }


    const contextValue= {
        objects,
        objectList,
        renderObject,
        updateObject,
        activeObject,
        createObject,
        setActiveObject,
        deleteObject,
        canvasSize,
        setCanvasSize
    }

    console.log(contextValue)

    return (
        <CanvasObjectContext.Provider value={contextValue}>
            {children}
        </CanvasObjectContext.Provider>
    )
 }


 export default CanvasObjectContext
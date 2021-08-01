import * as PIXI from "pixi.js"
import {CANVAS_OBJECT_TYPES} from "../redux/canvasObjects/canvasObjects.types"
import store from "../redux/store"
import {updateObject, setActiveObject} from "../redux/canvasObjects/canvasOjbects.actions"
import {degreeToRadians} from "../utils/math.utils"

export let app;

export const setUpApp = (container, dimensions) => {
    if(app) return null; 

    app = new PIXI.Application({
        resizeTo: container, backgroundColor: 0x1099bb, resolution: 1, preserveDrawingBuffer: true
    });


    
    container.appendChild(app.view)  
  


}

let elements = {}
let displayBaseImage = null;

const displayObjectExists = (id) => {
    return id in elements
}

const setCanvasDimensions = (width, height) => {
    app.view.width = width;
    app.view.height = height;
    app.renderer.resize(width, height);
}






const createTextObject = (object) => {
    const text = new PIXI.Text(object.text, new PIXI.TextStyle({
        fill: object.fill ? PIXI.utils.string2hex(object.fill) : 0x000000,                     
        stroke: object.stroke ? PIXI.utils.string2hex(object.stroke) : 0x000000,                                      
        strokeThickness: object?.strokeWidth || 0,
    }))
    return text;
}

const createImageObject = (object) => {
    const image = PIXI.Sprite.from(object.src); 
    return image;
}

const createDisplayObject = (object) => {

    let displayObject = null;
    switch(object.type){
        case CANVAS_OBJECT_TYPES.IMAGE:
            displayObject = createImageObject(object);
            break;
        case CANVAS_OBJECT_TYPES.TEXT:
            displayObject = createTextObject(object);
            break;
        default:
            break;
    }


    if(displayObject == null) return;


    displayObject.interactive = true;
    displayObject.buttonMode = true;

    displayObject.anchor.set(.5,.5)

    const onDragMove = (event) => {
        const sprite = event.currentTarget 
        if (sprite.dragging) {
            const newPosition = sprite?.data.getLocalPosition(sprite.parent);
            store.dispatch(updateObject(object.id,{x: newPosition.x, y: newPosition.y}))
        }
    }

    const onDragEnd = (event) => {
        const movable = event.currentTarget
        movable.dragging = false;
        movable.alpha = 1;
    }

    const onDragStart = (event) => {

        const movable = event.currentTarget
        movable.data = event.data;
        movable.dragging = true;
        movable.alpha = .5;
        store.dispatch(setActiveObject(object.id))
       
    }

    displayObject    // events for drag start
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    // events for drag end
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    // events for drag move
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove);
    elements[object.id] = displayObject;
    app.stage.addChild(displayObject)
}

const updateImageDisplayObject = (object) => {
    const displayObject = elements[object.id];
    const scaleX = object.width/object.imageWidth || 1;
    const scaleY = object.height/object.imageHeight || 1;
    displayObject.scale.set(scaleX, scaleY)
}

const updateTextDisplayObject = (object) => {
    console.log(object)
    const displayObject = elements[object.id];
    displayObject.style = new PIXI.TextStyle({
        fontSize: parseInt(object?.fontSize) || 32,
        fill: object.fill ? PIXI.utils.string2hex(object.fill) : 0x000000,
        strokeThickness: object?.strokeWidth || 0,
        stroke: object.stroke ? PIXI.utils.string2hex(object.stroke) : 0x000000,
    })
    displayObject.text = object.text;
}

const updateDisplayObject = (object) => {
    const displayObject = elements[object.id];
    // general updates
    displayObject.position.set(object.x, object.y)
    displayObject.rotation = object?.rotation ?  degreeToRadians(object.rotation) : 0

    // specifci updates

    switch(object.type){
        case CANVAS_OBJECT_TYPES.IMAGE:
            updateImageDisplayObject(object)
            break;
        case CANVAS_OBJECT_TYPES.TEXT:
            updateTextDisplayObject(object)
            break;
        default:
            break;
    }
}



const renderObject = (object) => {
    if(displayObjectExists(object.id)){
        // update object
        updateDisplayObject(object)
    }else{
        // create object
        createDisplayObject(object)

    }


   
}


const renderBaseImage = (baseImage) => {
    
    if(baseImage && displayBaseImage == null){
        const imgSprite = PIXI.Sprite.from(baseImage.src);
        displayBaseImage = imgSprite;
        app.stage.addChild(imgSprite);
    }else if(baseImage == null && displayBaseImage){
        // remove base image
        app.stage.removeChild(baseImage);
        displayBaseImage = null;
    }


}

const resizeStage = ({width, height}) => {
    setCanvasDimensions(width, height)
}

export const render = () => {
    console.log("rerender")
   const state = store.getState();
   console.log(state)
   
   // render base image
   resizeStage(state.canvas)
   renderBaseImage(state.canvas.baseImage)
   
   const objectList = state.canvasObjects.objectList;
   const objects = state.canvasObjects.objects;

   objectList.forEach((objectID) => {
        // create or update
        const object = objects[objectID];
        // render object
        renderObject(object)
   })
   app.render(app.stage);
}

store.subscribe(render)





import * as PIXI from "pixi.js"
import {CANVAS_OBJECT_TYPES} from "../redux/canvasObjects/canvasObjects.types"
import store from "../redux/store"
import {updateObject} from "../redux/canvasObjects/canvasOjbects.actions"

export const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});

let elements = {}
let displayBaseImage = null;

const displayObjectExists = (id) => {
    return id in elements
}

const setCanvasDimensions = (width, height) => {

}



class ElementContainer extends PIXI.Container{
    constructor(){
        super()
    }
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


const updateDisplayObject = (object) => {
    const displayObject = elements[object.id];
    displayObject.position.set(object.x, object.y)
}



const renderObject = (object) => {
    if(displayObjectExists(object.id)){
        // update object
        updateDisplayObject(object)
    }else{
        // create object
        createDisplayObject(object)

    }
    console.log("render object")
    console.log(elements)
    console.log(app.stage.children)

   
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

const render = () => {
    console.log("rerender")
   const state = store.getState();
   
   // render base image

   renderBaseImage(state.canvas.baseImage)
   
   const objectList = state.canvasObjects.objectList;
   const objects = state.canvasObjects.objects;

   objectList.forEach((objectID) => {
        // create or update
        const object = objects[objectID];
        // render object
        renderObject(object)
   })
   
}

store.subscribe(render)





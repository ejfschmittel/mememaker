import types, {CANVAS_OBJECT_TYPES} from "./canvasObjects.types"

import { v4 as uuidv4 } from "uuid"

export const createTextObject = (text) => ({
    type: types.CREATE_CANVAS_OBJECT,
    payload: {
        // create uid
        id: uuidv4(),
        type: CANVAS_OBJECT_TYPES.TEXT,
        x: 0,
        y: 0,
        rotation: 0,
        text,
        fill: "#ffffff",
        stroke: "#000000",
        strokeWidth: 2,
        fontSize: 32,
    }
})

export const createImageObject = (image) => ({
    type: types.CREATE_CANVAS_OBJECT,
    payload: {
        // create uid
        id: uuidv4(),
        type: CANVAS_OBJECT_TYPES.IMAGE,
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
        rotation: 0,
        src: image.src,
        imageWidth: image.width,
        imageHeight: image.height,
    }
})


export const updateObject = (id, data) => ({
    type: types.UPDATE_CANVAS_OBJECT,
    payload: {
        id,
        data,
    }
})

export const setActiveObject = (objectID) => ({
    type: types.SET_ACTIVE_OBJECT,
    payload: objectID
})



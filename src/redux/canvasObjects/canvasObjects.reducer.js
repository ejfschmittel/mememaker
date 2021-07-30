
import types from "./canvasObjects.types"

const defaultState = {
    objectList: [],
    objects: {},
    activeObject: null,
}


const canvasObjectReducer = (state = {}, action) => {
    switch(action.type){
        case types.UPDATE_CANVAS_OBJECT:
            return {...state, ...action.data}
        default:
            return state
    }
}

const reducer = (state = defaultState, action) => {
    switch(action.type){
        case types.CREATE_CANVAS_OBJECT: 
            const canvasObject = action.payload
            const objectList = [...state.objectList, canvasObject.id]
            const objects = {...state.objects, [canvasObject.id]: canvasObject}
            return {objectList,objects, currentObject: canvasObject.id};
        case types.UPDATE_CANVAS_OBJECT:    
            console.log("update canvas object")
            console.log(action)
            return {...state, objects: {...state.objects, [action.payload.id]: {
                ...state.objects[action.payload.id],
                ...action.payload.data
            }}};

        
        case types.DELETE_CANVAS_OBJECT: 
            // remove from object list
            // remove from objects
            // remove currrent
            return state;

        case types.SET_ACTIVE_OBJECT:
            return {...state, activeObject: action.payload}
        default: 
            return state;
    }
}

export default reducer;

import types from "./canvasObjects.types"

const defaultState = {
    objectList: [],
    objects: {},
    activeObject: null,
}




const reducer = (state = defaultState, action) => {
    switch(action.type){
        case types.CREATE_CANVAS_OBJECT: 
            const canvasObject = action.payload
            const objectList = [...state.objectList, canvasObject.id]
            const objects = {...state.objects, [canvasObject.id]: canvasObject}
            return {objectList,objects, activeObject: canvasObject.id};
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
            return {
                ...state, 
                activeObject: state.activeObject == action.payload ? null : state.activeObject,
                objectList: state.objectList.filter((id) => id !== action.payload),
                objects: {
                    ...state.objects,
                    [action.payload]: { deleted:true }
                }
            };

        case types.SET_ACTIVE_OBJECT:
            return {...state, activeObject: action.payload}
        default: 
            return state;
    }
}

export default reducer;
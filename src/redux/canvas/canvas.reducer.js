
import types from "./canvas.types"

const defaultState = {
    baseImage: null,
    width: 600,
    height: 400,
    showOverlay: true,
}


const reducer = (state = defaultState, action) => {
    switch(action.type){

        case types.SET_CANVAS_SIZE: 
            return {...state, width: action.payload.width, height: action.payload.height};
        case types.SET_BASE_IMAGE:
            return {...state, showOverlay: false, baseImage: action.payload}
        case types.REMOVE_BASE_IMAGE:
            return {...state}

        case types.HIDE_OVERLAY:
            return {...state, showOverlay: false}
        case types.SHOW_OVERLAY:
            return {...state, showOverlay: true}
        default: 
            return state;
    }
}

export default reducer;
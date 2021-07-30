import types from "./canvas.types"

export const setCanvasSize = (width, height) => ({
    type: types.SET_CANVAS_SIZE,
    payload: {width, height}
})

export const hideOverlay = () => ({
    type: types.HIDE_OVERLAY
})

export const showOverlay = () => ({
    type: types.SHOW_OVERLAY
})

export const setBaseImage = (img) => ({
    type: types.SET_BASE_IMAGE,
    payload: img
})

export const setCanvas = (canvas) => ({
    type: types.SET_CANVAS,
    payload: canvas
})
import React, {useEffect, useRef, useState} from "react"
import * as tfjs from '@tensorflow/tfjs';
import * as bodyPix from "@tensorflow-models/body-pix"
import * as blazeface from "@tensorflow-models/blazeface"


import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';

import FaceImageDisplay from "./FaceImageDisplay";

import {canvasToBlob} from "../utils/images.utils"
import "../styles/components/face-extractor.scss"

import LoadingOverlay from "../components/LoadingOverlay"



let blazefaceModel = null;
let bodyPixModel = null;


const FaceExtractor = ({image}) => {
    const canvasRef = useRef()
    const [isLoading, setIsLoading] = useState(false)
    const [faceImages, setFaceImages] = useState([])

    const loadModels = async () => {
        console.log("loading models...")
        if(!blazefaceModel) blazefaceModel = await blazeface.load();
        if(!bodyPixModel) bodyPixModel = await bodyPix.load({         
            architecture: 'MobileNetV1',
            outputStride: 8,
            quantBytes: 4
        });
    }


    const startFaceExtraction = async () => {
        setIsLoading(true)
        await loadModels(image);
        const faces = await extractFaces(image)
        setFaceImages(faces)
        setIsLoading(false)
    }

    const extractFaces = async (img) => {
        console.log("extract Faces")
        const predictedFaceDimensions = await predictFaces(img)

        const faceImages = []
        for(let i = 0; i < predictedFaceDimensions.length; i++){

            console.log("face " + i)
            // crop image
            await cropFace(canvasRef.current, img, predictedFaceDimensions[i])
            
            // remove background
            await segmentFace(canvasRef.current)

            const faceImage = await canvasToBlob(canvasRef.current)
            faceImage.name =  `${image.name.split(".")[0]}-f-${i}.png`;
            faceImage.width =  canvasRef.current.width;
            faceImages.height =   canvasRef.current.height;
            faceImages.push(faceImage)
        }

        return faceImages;
    }

    const cropFace = async (canvas, img, predictions) => {
        canvas.width = predictions.width;
        canvas.height = predictions.height;

        const x = predictions.x ;
        const y = predictions.y ;
        const width = predictions.width;
        const height = predictions.height;
        
        const ctx = canvas.getContext("2d");   
        ctx.drawImage(img, x,y , width, height, 0, 0, canvas.width,  canvas.height)
    }

    const predictFaces = async (image) => {
        const returnTensors = false; // Pass in `true` to get tensors back, rather than values.
        const predictions = await blazefaceModel.estimateFaces(image, returnTensors);

        const predictionDimensions = []
        if (predictions.length > 0) {
            for (let i = 0; i < predictions.length; i++) {
                const start = predictions[i].topLeft;
                const end = predictions[i].bottomRight;
                const size = [end[0] - start[0], end[1] - start[1]];

                const startY = Math.max(start[1] - (size[1] / 1.3), 0)
                const startX = Math.max(start[0] - (size[0] / 4), 0)
                    
                predictionDimensions.push({
                    x: startX,
                    y: startY,
                    width:size[0] * 1.5,
                    height:size[1] * 1.7,
                })
            }
        }
        return predictionDimensions;
    }



    const segmentFace = async (canvas) => {
        const { data:map } = await bodyPixModel.segmentPerson(canvas);
        const ctx = canvas.getContext("2d")
        const { data:imgData } = ctx.getImageData(0, 0, canvas.width, canvas.height);

       
        const newImg = ctx.createImageData(canvas.width, canvas.height);
        const newImgData = newImg.data;

        for(let i=0; i<map.length; i++) {
            //The data array stores four values for each pixel
            const [r, g, b, a] = [imgData[i*4], imgData[i*4+1], imgData[i*4+2], imgData[i*4+3]];
            [
              newImgData[i*4],
              newImgData[i*4+1],
              newImgData[i*4+2],
              newImgData[i*4+3]
            ] = !map[i] ? [255, 255, 255, 0] : [r, g, b, a];
        }


        ctx.putImageData(newImg, 0, 0);
  
    }


    return (
        <div className="face-extractor">
            <button  onClick={startFaceExtraction} className="button button--main" disabled={image == null}>Extract Faces</button>

            <div className="face-extractor__display">
                <LoadingOverlay isLoading={isLoading}></LoadingOverlay>
                    <div className="face-extractor__list">
                        {faceImages.map((faceImage, idx) => {
                            return <FaceImageDisplay img={faceImage} key={`faceimage-${idx}`}/>
                        })}
                    </div>
                
            </div>
           
            <canvas ref={canvasRef} className="face-extractor__canvas"></canvas>
        </div>
    )
}   



export default FaceExtractor;
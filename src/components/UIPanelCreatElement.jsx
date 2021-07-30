import React, {useState} from "react"
import TextCreator from "./ElementCreatorText"
import ImageCreator from "./ElementCreatorImage"
import {app} from "../pixijs/PixiApp"

import { useSelector } from "react-redux"


const TAB = {
    IMAGE: "Image",
    TEXT: "text",
    GRAPHIC: "graphic"
}


const CreateElementUI = () => {
    const canvasRef = useSelector((state) => state.canvas.canvasRef)
    const [activeTab, setActiveTab] = useState(TAB.TEXT)


    const renderTab = () => {
        switch(activeTab){

            case TAB.IMAGE:
                return <ImageCreator />
            case TAB.TEXT: 
                return <TextCreator />
            default:
                <TextCreator />
        }
    }

    console.log("active tab")
    console.log(activeTab)

    const onDownloadClick = () => {
        if(app){
            console.log(app.view)
           /* var sourceCanvas = app.renderer.extract.canvas();
            var sourceContext = sourceCanvas.getContext('2d');
            var extractCanvas = document.createElement('canvas');
            var extractContext = extractCanvas.getContext('2d');
            var imageData = sourceContext.getImageData(0,0,100,100);

            extractCanvas.width = 100;
            extractCanvas.height = 100;
            extractContext.putImageData(imageData, 0, 0);
            console.log(extractContext.toDataURL())*/
           
           var link = document.createElement('a');
            link.download = 'filename.png';
           
            link.href = app.view.toDataURL("image/png")
            link.click();
            //window.location.href=link;*/
        }
    }

    return (
        <div className="create-ui">

            <div>
                <button className="button button--ui" onClick={onDownloadClick}>Download</button>
            </div>
            <div className="create-selector">
                
                <button className={`create-selector__btn ${activeTab == TAB.TEXT && "create-selector__btn--active"}`} onClick={() => setActiveTab(TAB.TEXT)}>
                    Text
                </button>

                <button className={`create-selector__btn ${activeTab == TAB.IMAGE && "create-selector__btn--active"}`} onClick={() => setActiveTab(TAB.IMAGE)}>
                    Image
                </button>

                <button className={`create-selector__btn ${activeTab == TAB.GRAPHIC && "create-selector__btn--active"}`} onClick={() => setActiveTab(TAB.GRAPHIC)}>
                    Graphic
                </button>

             
            </div>


            <div>
                {renderTab()}
            </div>
            
        </div>
    )
}

export default CreateElementUI
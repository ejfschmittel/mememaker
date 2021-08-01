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

           var link = document.createElement('a');
            link.download = 'meme.png';
           
            link.href = app.view.toDataURL("image/png")
            link.click();
        }
    }

    return (
        <div className="create-ui">

            <div>
                <button className="button button--ui button--download" onClick={onDownloadClick}>Download</button>
            </div>
            <div className="create-selector">
                
                <button className={`button button--ui ${activeTab == TAB.TEXT && "button--ui--active"}`} onClick={() => setActiveTab(TAB.TEXT)}>
                    Text
                </button>

                <button className={`button button--ui ${activeTab == TAB.IMAGE && "button--ui--active"}`} onClick={() => setActiveTab(TAB.IMAGE)}>
                    Image
                </button>

              

             
            </div>


            <div>
                {renderTab()}
            </div>
            
        </div>
    )
}

export default CreateElementUI
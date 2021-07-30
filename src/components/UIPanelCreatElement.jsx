import React, {useState} from "react"
import TextCreator from "./ElementCreatorText"
import ImageCreator from "./ElementCreatorImage"

const TAB = {
    IMAGE: "Image",
    TEXT: "text",
    GRAPHIC: "graphic"
}


const CreateElementUI = () => {

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

    return (
        <div className="create-ui">
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
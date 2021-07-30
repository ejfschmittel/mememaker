import React, {useState, useContext, useEffect} from "react"
import CanvasObjectContext from "../contexts/CanvasObjectContext"

/*
    x, y, rotation
    text, color, outline, outline color
    fontsize

*/
/*
    update on edit
*/
const useElementEditor = (original) => {
    const [edited, setEdited] = useState(original)


    return [edited]
}

const DefaultOptions = ({edited, onChange}) => {
    return (
    <div className="editor__row">
        <div className="editor__field">
            <label className="editor__label">x:</label>
            <input type="number" className="editor__input" name="x" value={edited?.x} onChange={onChange}/>
        </div>

        <div className="editor__field">
            <label className="editor__label">y:</label>
            <input type="number" className="editor__input" name="y" value={edited?.y} onChange={onChange}/>
        </div>

        <div className="editor__field">
            <label className="editor__label">rotation:</label>
            <input type="number" className="editor__input" name="rotation" value={edited?.rotation} onChange={onChange}/>
        </div>
    </div>
    )
}

const FontEditor = ({object}) => {
    const {updateObject} = useContext(CanvasObjectContext)
    const [edited, setEdited] = useState(object)

    const onChange = (e) => {
        console.log("onchange")
        console.log(object)
        setEdited((old) => ({...old, [e.target.name]: e.target.value}))
    }

    useEffect(() =>{
        if(object.id == edited.id)
            updateObject(object.id, edited);
    },[edited, object])



  
    
    return (
        <div>
           <DefaultOptions edited={edited} onChange={onChange} />


           <div className="editor__row">
                <div className="editor__field">
                    <label className="editor__label">text:</label>
                    <input type="text" className="editor__input" name="text" value={edited?.text} onChange={onChange}/>
                </div>

                <div className="editor__field">
                    <label className="editor__label">fontSize:</label>
                    <input type="number" className="editor__input" name="fontSize" value={edited?.fontSize} onChange={onChange}/>
                </div>

                <div className="editor__field">
                    <label className="editor__label">color:</label>
                    <input type="color" className="editor__input" name="fill" value={edited?.fill} onChange={onChange}/>
                </div>

               
            </div>
           
        </div>
    )
}

export default FontEditor
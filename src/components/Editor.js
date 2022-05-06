import ImageContainer from "./ImageContainer"
import { useState } from "react"
const Controls=({color,fontSize,onChangeColor,onChangeFontSize,text,setText})=>{
   
    return(
        
    <div className="control-container">
        <div className="text-container">
            <label htmlFor="">Your text</label>
            <input type="text"  value={text} onChange={(e)=>{setText(e.target.value)}}/>
        </div>
        <div className="color-picker">
        <label htmlFor="font-color">Color</label>

            <select name="color" id="color" value={color} onChange={onChangeColor}>
                <option value="white">White</option>
                <option value="black">Black</option>
            </select>
        </div>
        <div className="font-size-picker">
            <label htmlFor="font-size">FontSize</label>
        <select name="font-size" id="font-size"  value={fontSize} onChange={onChangeFontSize}>
                <option value="8px">8px</option>
                <option value="16px">16px</option>
                <option value="32px">32px</option>
                <option value="64px">64px</option>
                <option value="128px">128px</option>
            </select>
        </div>
    </div>
    )
}
const Editor=({selectedFile,handleSubmission,isLoading})=>{
    const [color,setColor] = useState("white")
    const [fontSize,setFontSize] = useState("64px")
    const [XY,setXY] = useState({x:0,y:0})
    const [text,setText]=useState("Your text!!")

    const handleClick=()=>{
        const data={
            position:XY,
            text,
            fontSize,
            color
        }
        handleSubmission(data)
    }
   
            return(
                <div className="editor-container">
                    <h1 className="editor-heading">Move the text at desired position</h1>
                    <ImageContainer selectedFile={selectedFile}  color={color}  fontSize={fontSize} setXY={setXY} text={text}  />
                    <Controls color={color} fontSize={fontSize} onChangeColor={(e)=>{setColor(e.target.value)}} onChangeFontSize={(e)=>{setFontSize(e.target.value)}} text={text}  setText={setText}/>
                    <button onClick={handleClick} className="submit-btn">{isLoading ? "Processing": "Submit and Download"}</button>
                </div>
            )
}   
export default Editor
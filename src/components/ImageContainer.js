import Draggable from "react-draggable";

import { useRef, useState, useEffect } from "react";
const ImageContainer = ({ text, selectedFile, color, fontSize, setXY }) => {
  const imageRef = useRef();
  const dragRef = useRef();
  const [naturalWidth, setNaturalWidth] = useState(1000);
  let adjustedFontSize =
    Math.floor(
      (parseInt(fontSize.split("px")[0]) * 1000) / parseInt(naturalWidth)
    ).toString() + "px";
  console.log(naturalWidth,adjustedFontSize);
  const getCoordinates = () => {
    const x = Math.floor(
      dragRef.current.getBoundingClientRect().left -
        imageRef.current.getBoundingClientRect().left
    )*naturalWidth/1000;
    const y = Math.floor(
      dragRef.current.getBoundingClientRect().top -
        imageRef.current.getBoundingClientRect().top
    )*naturalWidth/1000;
    setXY({ x: x, y: y });
  };
  return (
    <div className="image-container">
      <div className="image-wrapper">
        <img
          className="image"
          src={URL.createObjectURL(selectedFile)}
          alt=""
          ref={imageRef}
          onLoad={()=>{setNaturalWidth(imageRef.current.naturalWidth);}}
        />
        <div className="drag-parent">
          <Draggable
            scale={1}
            bounds="parent"
            onStop={() => {
              getCoordinates();
            }}
          >
            <div
              className="draggable-text"
              style={{ color: color, fontSize: adjustedFontSize ,borderColor:color=="white" ?"black" :"white"}}
              ref={dragRef}
            >
              {text}
            </div>
          </Draggable>
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;

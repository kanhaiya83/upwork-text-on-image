import { useState } from "react";
import Editor from "./Editor";
import InputContainer from "./InputContainer";
const Homepage = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [editedSrc, setEditedSrc] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = (data) => {
    const formData = new FormData();
    formData.append("positionX", data.position.x);
    formData.append("positionY", data.position.y);
    formData.append("text", data.text);
    formData.append("color", data.color);
    formData.append("fontSize", data.fontSize);
    formData.append("uploaded-image", selectedFile);
    setIsLoading(true);
    fetch("https://kanhaiya-text.herokuapp.com/upload", {
      method: "POST",
      body: formData,
      // headers:{
      //     "Content-Type": "multipart/form-data"
      // }
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setEditedSrc(url);
        setIsLoading(false);
        setIsEdited(true);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
      });
  };
  const handleDownload=()=>{}
  const handleEdit=()=>{setIsEdited(false);setEditedSrc("")}
  const handleUploadNew=()=>{setIsEdited(false);setIsFilePicked(false);setSelectedFile("")}
  const afterEdit = (
    <div className="editor-container">
      <h1 className="editor-heading">Image processed successfully!!!</h1>
      <div className="btn-group">
        <a className="btn" href={editedSrc} download onClick={handleDownload}>Download</a>{" "}
        <button className="btn" onClick={handleEdit}>Edit</button>
        <button className="btn"  onClick={handleUploadNew}>Upload New Image</button>
      </div>
      <img src={editedSrc} alt="" className="edited-image" />
      
    </div>
  );
  if (isFilePicked) {
    return (
      <>
        {isEdited ? (
          afterEdit
        ) : (
          <Editor
            selectedFile={selectedFile}
            handleSubmission={handleSubmission}
            isLoading={isLoading}
          />
        )}
      </>
    );
  } else {
    return <InputContainer changeHandler={changeHandler} />;
  }
};

export default Homepage;

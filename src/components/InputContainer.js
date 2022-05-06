const InputContainer = ({changeHandler}) => {
  return (
    <div className="input-container">
      <div className="wrapper">
        <h4>Select your image</h4>
      <input type="file" name="image" id="image" onChange={changeHandler} />
      </div>
    
    </div>
  );
};

export default InputContainer;

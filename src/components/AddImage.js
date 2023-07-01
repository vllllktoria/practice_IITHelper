import React, { useState } from "react";

const AddImage = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      
      <input
        id="upload-btn"
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
       {selectedImage && (
        <div>
          <button id= "deleteButton" onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}
    </div>

  );
};
export default AddImage;
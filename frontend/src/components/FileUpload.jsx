import React, { useState } from "react";
import axios from "axios";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" onChange={handleFileChange} accept=".png, .jpg" />
      <button onClick={handleSubmit}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Preview" />}
    </div>
  );
};

export default UploadImage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function ImgUpload() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [response, setResponse] = useState("");

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      setResponse(responseData["data"]);
      console.log(responseData["data"]);

      if (responseData["data"] == "Aadhaar") {
        navigate("/verify-aadhar");
      } else if (responseData["data"] == "PAN") {
        console.log("verify pan");
      } else if (responseData["data"] == "Driving Licence") {
        console.log("verify Driving Licence");
      } else if (responseData["data"] == "Voter ID") {
        console.log("verify voter id");
      } else if (responseData["data"] == "Passport") {
        console.log("verify Passport");
      } else {
        console.log("unknown id");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setResponse("An error occurred while uploading the image.");
    }
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        name="image"
      />
      <button onClick={handleUpload}>Upload Image</button>
      {response && <p>Server Response: {response}</p>}
    </div>
  );
}

export default ImgUpload;

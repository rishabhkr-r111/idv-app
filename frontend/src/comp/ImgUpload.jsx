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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Image Upload</h2>
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
          <button
            onClick={handleUpload}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Upload Image
          </button>
        </div>
        {response && (
          <p className="mt-4 text-center">Server Response: {response}</p>
        )}
      </div>
    </div>
  );
}

export default ImgUpload;

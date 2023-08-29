import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AiOutlineCamera } from "react-icons/ai";

function ImgUpload() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [response, setResponse] = useState("");

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    // handleUpload();
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
        navigate("/verify-pan");
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
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-gray-700 via-gray-900 to-black">
      <div className="p-8 bg-white rounded-xl flex flex-col h-2/3 w-1/2 items-center">
        <span className="text-2xl font-bold">Upload an Image</span>

        {/* <h2 className="text-xl font-black mb-4 text-center tracking-tighter">
          Image Upload
        </h2>
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
        )} */}

        <div
          className="flex items-center justify-center w-full mt-20"
          onClick={handleUpload}
          onChange={handleImageChange}
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      </div>
      <div className="flex gap-4 items-center mt-7 bg-white rounded-lg px-7 justify-between py-3">
        <button>
          <AiOutlineCloudUpload size={30} />
        </button>
        <button>
          <AiOutlineCamera size={30} />
        </button>
      </div>
      {response && (
        <p className="mt-4 text-center">Server Response: {response}</p>
      )}
    </div>
  );
}

export default ImgUpload;

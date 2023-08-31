import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
// import { AiOutlineCloudUpload } from "react-icons/ai";
// import { AiOutlineCamera } from "react-icons/ai";

function ImgUpload() {
  const navigate = useNavigate();
  const [response, setResponse] = useState("");

  const handleImageChange = async (event) => {
    const selectedImage = await (event.target.files
      ? event.target.files[0]
      : null);

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
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-cyan-200">
      <div
        className="flex items-center justify-center w-1/2 mt-20 rounded-xl bg-white drop-shadow-xl hover:bg-gray-100 "
        onClick={handleImageChange}
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-gray-700 border-dashed rounded-lg cursor-pointer hover:border-2 "
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-700 dark:text-gray-700"
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
            <p className="mb-2 text-sm text-gray-700 dark:text-gray-700 hover:text-black">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-700 dark:text-gray-700">
              JPEG or PNG
            </p>

            {response && <p className="mt-4 text-center">ID : {response}</p>}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>
      {/* </div> */}
      {/* <div className="flex gap-4 items-center mt-7 bg-white rounded-lg px-7 justify-between py-3">
        <button>
          <AiOutlineCloudUpload size={30} />
        </button>
        <button>
          <AiOutlineCamera size={30} />
        </button>
      </div> */}
    </div>
  );
}

export default ImgUpload;

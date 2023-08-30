import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function Aadhar() {
  const [captchaImage, setCaptchaImage] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [transactionId, settransactionId] = useState("");
  const [aadharState, setAadharState] = useState("");

  useEffect(() => {
    // Fetch captcha image on component mount
    fetchCaptchaImage();
  }, []);

  const fetchCaptchaImage = async () => {
    try {
      const response = await fetch(API_URL + "/verify/aadhar", {
        method: "POST",
      });

      const data = await response.json();
      console.log(response);
      console.log(data);
      setCaptchaImage(data["imageBase64"]);
      settransactionId(data["transactionId"]);
    } catch (error) {
      console.error("Error fetching captcha image:", error);
    }
  };

  const handleAadharSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL + "/aadhar-summit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          udi: aadharNo,
          captcha: captcha,
          transactionId: transactionId,
        }),
      });

      const data = await response.json();
      console.log(data);
      setAadharState(JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-bl from-gray-700 via-gray-900 to-black items-center justify-center flex">
      <div className="flex flex-col h-1/2 w-1/3 bg-white text-black rounded-lg p-3 items-center gap-3">
        <h2 className="text-2xl font-bold">Verify Aadhar</h2>
        <form
          onSubmit={handleAadharSubmit}
          className="flex flex-col h-full gap-3 w-full justify-between"
        >
          <label htmlFor="aadharNo">Aadhar Number:</label>
          <input
            type="text"
            id="aadharNo"
            value={aadharNo}
            onChange={(e) => setAadharNo(e.target.value)}
            required
            className="border-2 h-9 pl-3 border-black rounded-md"
          />

          <label htmlFor="captcha">Captcha:</label>
          <input
            type="text"
            id="captcha"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            required
            className="border-2 h-9 pl-3 border-black rounded-md"
          />
          <img src={`data:image/png;base64,${captchaImage}`} alt="Captcha" />

          <button
            type="submit"
            className="font-bold text-xl border rounded-lg py-3 bg-black text-white hover:text-black hover:bg-white duration-300"
          >
            Verify
          </button>

          <div>{aadharState}</div>
        </form>
      </div>
    </div>
  );
}

export default Aadhar;

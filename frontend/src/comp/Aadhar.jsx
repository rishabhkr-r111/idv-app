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
      const response = await fetch(API_URL + "/aadhar");

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
    <div>
      <h2>Verify Aadhar</h2>
      <form onSubmit={handleAadharSubmit}>
        <label htmlFor="aadharNo">Aadhar Number:</label>
        <input
          type="text"
          id="aadharNo"
          value={aadharNo}
          onChange={(e) => setAadharNo(e.target.value)}
          required
        />

        <label htmlFor="captcha">Captcha:</label>
        <input
          type="text"
          id="captcha"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          required
        />
        <img src={`data:image/png;base64,${captchaImage}`} alt="Captcha" />

        <button type="submit">Verify</button>

        <div>{aadharState}</div>
      </form>
    </div>
  );
}

export default Aadhar;
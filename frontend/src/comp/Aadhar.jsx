import { useState, useEffect } from "react";
import { BiBadgeCheck } from "react-icons/bi";
import { RxCrossCircled } from "react-icons/rx";

const API_URL = import.meta.env.VITE_API_URL;

function Aadhar() {
  const [captchaImage, setCaptchaImage] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [transactionId, settransactionId] = useState("");
  const [aadharState, setAadharState] = useState(null);

  useEffect(() => {
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
      setAadharState(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-200 to-cyan-200 items-center justify-center flex">
      <div className="flex flex-col w-1/4 text-black rounded-lg p-0 m-0 items-center gap-3 bg-white drop-shadow-xl">
        {!aadharState && (
          <div className="p-3">
            <h2 className="text-2xl font-bold text-center mb-4 p-0 w-full">
              Verify Aadhar
            </h2>
            <form
              onSubmit={handleAadharSubmit}
              className="flex flex-col gap-3 w-full justify-between p-0"
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
              <img
                src={`data:image/png;base64,${captchaImage}`}
                alt="Captcha"
              />

              <button
                type="submit"
                className="font-bold text-xl border rounded-lg py-3 bg-black text-white hover:text-black hover:bg-white duration-300"
              >
                Verify
              </button>
            </form>
          </div>
        )}
        {aadharState && (
          <div>
            {aadharState["aadhaarStatusCode"] == 1 ? (
              <div className="flex gap-4 items-center flex-col">
                <BiBadgeCheck
                  size={60}
                  color={"green"}
                  className="text-center"
                />
                <div className="font-bold text-lg text-center">
                  Status :{" "}
                  <span className="font-medium">
                    {aadharState["statusMessage"]}
                  </span>
                </div>
                <div className="font-bold text-lg text-center">
                  Age Band :{" "}
                  <span className="font-medium">{aadharState["ageBand"]}</span>
                </div>
                <div className="font-bold text-lg text-center">
                  Gender :{" "}
                  <span className="font-medium">{aadharState["gender"]}</span>
                </div>
                <div className="font-bold text-lg text-center">
                  Address :{" "}
                  <span className="font-medium">{aadharState["address"]}</span>
                </div>
                <div className="font-bold text-lg text-center">
                  Mobile No :{" "}
                  <span className="font-medium">
                    {aadharState["maskedMobileNumber"]}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 items-center flex-col">
                {" "}
                <RxCrossCircled
                  size={60}
                  color={"red"}
                  className="text-center"
                />
                <div className="font-bold text-2xl text-center">
                  Error{" "}
                  <div className="font-normal text-lg">
                    {aadharState["errorDetails"]["messageLocal"]}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Aadhar;

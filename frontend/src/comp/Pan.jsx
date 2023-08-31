import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function Pan() {
  const [panNumber, setPanNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [dob, setDob] = useState("");
  const [otp, setOtp] = useState("");
  const [reqId, setReqId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [status, setStatus] = useState("");

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have a verification API endpoint
    const verificationResponse = await fetch(API_URL + "/verify/pan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        panNumber: panNumber,
        fullName: fullName,
        mobNo: mobNo,
        dob: dob,
      }),
    });

    if (verificationResponse.ok) {
      setVerificationStatus("otp");
      const data = await verificationResponse.json();
      console.log(data);

      setReqId(data["reqId"]);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    const finalResponse = await fetch(API_URL + "/pan-summit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        panNumber: panNumber,
        fullName: fullName,
        mobNo: mobNo,
        dob: dob,
        otp: otp,
        reqId: reqId,
      }),
    });

    if (finalResponse.ok) {
      setVerificationStatus("otp");
      const data = await finalResponse.json();
      console.log(JSON.stringify(data));
      setStatus(JSON.stringify(data));
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-200 to-cyan-200 items-center justify-center flex">
      {verificationStatus === "pending" && (
        <div className="flex flex-col w-1/3 bg-white text-black rounded-lg p-3 items-center gap-3 drop-shadow-xl">
          <h2 className="text-2xl font-bold text-center">Verify Pan card</h2>

          <form
            onSubmit={handleVerificationSubmit}
            className="flex flex-col w-full gap-3"
          >
            <h3>Pan number:</h3>
            <input
              type="text"
              placeholder="PAN Number"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
              className="border-2 h-9 pl-3 border-black rounded-md "
            />
            <h3>Full name:</h3>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border-2 h-9 pl-3 border-black rounded-md"
            />
            <h3>Mobile number:</h3>
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobNo}
              onChange={(e) => setMobNo(e.target.value)}
              className="border-2 h-9 pl-3 border-black rounded-md"
            />
            <h3>Date of birth:</h3>
            <input
              type="text"
              placeholder="YYYY-MM-DD"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="border-2 h-9 pl-3 border-black rounded-md"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Verify
            </button>
          </form>
        </div>
      )}

      {verificationStatus === "otp" && (
        <div className="justify-center flexflex flex-col w-1/3 bg-white text-black rounded-lg p-3 items-center gap-3">
          <h2 className="text-2xl font-bold text-center">Enter OTP</h2>
          <form
            onSubmit={handleFinalSubmit}
            className="flex flex-col w-full gap-3"
          >
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border-2 h-9 pl-3 border-black rounded-md"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </form>
        </div>
      )}

      {verificationStatus === "otp" && <div> {status} </div>}
    </div>
  );
}

export default Pan;

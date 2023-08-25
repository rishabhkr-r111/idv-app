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

    // Assuming you have an OTP verification API endpoint
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
      setVerificationStatus("success");
      setStatus(data);
    }
  };

  return (
    <div>
      {verificationStatus === "pending" && (
        <form onSubmit={handleVerificationSubmit}>
          <input
            type="text"
            placeholder="PAN Number"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobNo}
            onChange={(e) => setMobNo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Date of Birth (YYYY-MM-DD)"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form>
      )}

      {verificationStatus === "otp" && (
        <form onSubmit={handleFinalSubmit}>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}

      {verificationStatus === "success" && <div> {status} </div>}
    </div>
  );
}

export default Pan;

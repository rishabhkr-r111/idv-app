import { Route, Routes } from "react-router-dom";
import "./App.css";
import ImgUpload from "./comp/ImgUpload";
import Aadhar from "./comp/Aadhar";
import Pan from "./comp/Pan";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  console.log(API_URL);

  // const [response, setResponse] = useState("");

  // // Assume you set the response using some function
  // const handleServerResponse = (responseData) => {
  //   setResponse(responseData);
  // };
  return (
    <>
      {/* <Router>
        <Route path="/" exact>
          <ImgUpload handleServerResponse={handleServerResponse} />
        </Route>
        {response === "addhar" && <Redirect to="/verify-aadhar" />}
        <Route path="/verify-aadhar" exact>
          <Aadhar />
        </Route>
      </Router> */}

      <Routes>
        <Route path="/" element={<ImgUpload />} />
        <Route path="verify-aadhar" element={<Aadhar />} />
        <Route path="verify-pan" element={<Pan />} />
      </Routes>
    </>
  );
}

export default App;

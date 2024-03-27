import { useState } from "react";
import "./App.css";
import WheelSpinner from "./components/Wheel4";
import Router from "./routes/Router";

function App() {
  const [start, setStart] = useState(false);

  // return (
  //   <>
  //     <div>
  //       <WheelSpinner imageUrl={"/wheel.png"} winner={300} Start={start} />
  //     </div>
  //     <button
  //       onClick={() => {
  //         setStart(true);
  //       }}
  //     >
  //       Test Spin
  //     </button>
  //   </>
  // );
  return <Router />;
}

export default App;

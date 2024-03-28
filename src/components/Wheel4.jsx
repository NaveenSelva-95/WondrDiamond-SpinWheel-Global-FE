import React, { useState, useRef, useEffect } from "react";
import "./WheelSpinner.css";
import { Stack } from "@mui/material";
import ThreeDButton2 from "./Buttons/3dbutton2";

const WheelSpinner = ({ imageUrl, winner, Start, completed, Initiate }) => {
  let height = window.innerWidth < 350 ? 270 : 350;
  let width = window.innerWidth < 350 ? 270 : 350;
  let arrowSize = window.innerWidth < 350 ? 65 : 80;
  let arrowPosition = window.innerWidth < 350 ? "50%" : "50%";
  const wheelRef = useRef(null);
  const needleRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const startSpin = () => {
    console.log(" Initiating ");
    Initiate();
    // setIsSpinning(true);
  };

  const spinCompleted = () => {
    console.log("spin Stopped");
    setIsSpinning(false);
    // if (winner !== 60) {
    completed();
    // }
  };

  useEffect(() => {
    if (Start == true) {
      setIsSpinning(true);
      setTimeout(() => {
        spinCompleted();
      }, 8100);
    }
  }, [Start]);


  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <div style={{ height: height, width: width, position: "relative" }}>
        <div
          className="wheel"
          ref={wheelRef}
          style={{
            width: height,
            height: width,
            position: "absolute",
            top: "0",
            left: "0",
          }}
        >
          <img
            src={imageUrl}
            alt="Wheel"
            style={{
              animation:
                Start == true ? `spin${winner} 8s forwards linear` : "",
            }}
          />
          <div className="needle" ref={needleRef}></div>
        </div>
        <img
          src="/arrow.png"
          width={arrowSize}
          style={{
            position: "absolute",
            top: "47%",
            left: arrowPosition,
            transform: "translate(-50%, -50%)",
          }}
        />

        <img
          src="/PNG/stand.png"
          width={width - 90}
          style={{
            position: "absolute",
            top: "110%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "-1",
          }}
        />
      </div>

      {
        !isSpinning && (
          <div style={{ marginTop: "30px" }}>
            <ThreeDButton2 name={"SPIN"} onClick={() => startSpin()} />
          </div>
        )
      }

    </Stack >
  );
};

export default WheelSpinner;

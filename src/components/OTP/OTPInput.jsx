import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import styled from "styled-components";

// Define a styled component for the OTP separator
const Separator = styled.span`
  font-size: 24px;
  color: #333;
  margin: 0.5rem;
`;

// Define a styled component for the OTP input
const OTPInputStyled = styled.input`
  width: 40px !important;
  height: 40px !important;
  font-size: 20px;
  border-radius: 4px;
  text-align: center;
  justify-content: center;
  border: 1px solid #80808063;
  outline: none;
  color: var(--base-color);
`;
export default function OTPInputComponent({ value, length, onChange }) {
  // const getStoredOtp = () => {
  //   const storedOtp = localStorage.getItem("otp");
  //   return storedOtp || "1234"; // Set a default OTP if not found in local storage
  // };

  // useEffect(() => {
  //   // Retrieve OTP from local storage when the component mounts
  //   setStoredOtp(getStoredOtp());
  // }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <OtpInput
        value={value}
        onChange={onChange} // Call the onChange prop here
        inputType="number"
        numInputs={length} // Use the length prop for the number of inputs
        renderSeparator={() => <Separator></Separator>}
        renderInput={(props) => <OTPInputStyled {...props} />}
      />

      {/* {error && <p>{error}</p>} */}
    </div>
  );
}

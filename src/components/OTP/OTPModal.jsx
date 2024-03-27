import React, { useState, useEffect } from "react";
// import OTPInput from "./OTPInput";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SubmitButton } from "./OTPInputStyles";
// import { handleGenerateOTP } from "../API/api";
import OTPInputComponent from "./OTPInput";
import ThreeDButton from "../Buttons/3dButton";
import { textFieldStyles } from "../../constants";
import { getVoucher, resendOTP, verifyOTP } from "../../api/api";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from MUI

const OTPModal = ({ isOpen, onClose, handleOpenQuestion, name, number }) => {
  const [otpValue, setOTPValue] = useState("");
  const [resendEnable, setResendEnable] = useState(true);
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isValidOTP, setIsValidOTP] = useState(true); // Track OTP validity
  const [disableButton, setDisableButton] = useState(true);
  // New state variable to track OTP input length
  const [otpLength, setOTPLength] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsTimerRunning(true);

      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setIsTimerRunning(false);
            clearInterval(intervalId);
            return 0;
          }
        });
      }, 1000);
    }
  }, [isOpen]);

  const handleInputChange = (otp) => {
    setOTPValue(otp);
    setIsValidOTP(true); // Reset OTP validity on input change

    // Update the OTP length
    setOTPLength(otp.length);
  };

  const handleResendClick = async () => {
    // let otp = await handleGenerateOTP(name, number);
    const Key2 = localStorage.getItem("Key");
    let req = {
      Key: Key2,
    };
    resendOTP(req);
    setResendEnable(false);
  };
  const ResendEnable = localStorage.getItem("OtpSent");
  useEffect(() => {
    setResendEnable(resendEnable);
  }, [ResendEnable]);
  const handleModalClose = () => { };
  const handleModalSubmit = async () => {
    setLoading(true);
    const Key1 = localStorage.getItem("Key");
    console.log(Key1);
    let req = {
      OTP: otpValue,
      Key: Key1,
    };

    const res = await verifyOTP(req);
    console.log("res", res);
    if (res.Status === 1) {
      // let req = {
      //   Key: Key1,
      // };
      localStorage.setItem("Key1", Key1)
      setLoading(false)
      handleOpenQuestion()
      // TODO : undo the comment
      // localStorage.setItem("personId", voucher?.Voucher)
      // const voucher = await getVoucher(req);
      // if (voucher?.Status === 1) {
      //   handleNextButtonClick(voucher?.Voucher); //##static
      //   setLoading(false);
      // }

    } else {
      setLoading(false);
      setIsValidOTP(false); // Set OTP validity to false
    }
  };
  useEffect(() => {
    if (otpLength == 4) {
      setDisableButton(false);
      // handleModalSubmit();
    } else {
      setDisableButton(true);
    }
  }, [otpValue]);
  return (
    <Modal
      open={isOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      disableBackdropClick={true}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10%", // Adjust the top value
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%", // Set the width as desired
          maxWidth: "400px", // Set the max width as desired
          // Set the max height to 40% of the viewport height

          maxHeight: "40vh", // Set the max height to 40% of the viewport height
          overflowY: "auto", // Add overflowY for scrolling if needed
          bgcolor: "#ffffffed",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <center>
          <Typography
            style={{
              fontSize: "calc(1rem + 1.2vw)",
              fontWeight: "500",
              fontFamily: textFieldStyles.family,
              marginBottom: "20px",
            }}
          >
            Please enter the OTP sent
            <br />
            to your mail or whatsapp
          </Typography>
          <OTPInputComponent
            value={otpValue}
            length={4}
            onChange={handleInputChange}
          />
          {isValidOTP ? null : (
            <Typography
              variant="body2"
              color={textFieldStyles.color}
              style={{
                fontFamily: textFieldStyles.family,
                marginTop: "10px",
              }}
            >
              Invalid OTP. Please try again.
            </Typography>
          )}

          {/* Disable the button if OTP length is not 4 */}

          {resendEnable ? (
            <Typography
              variant="body2"
              color={textFieldStyles.color}
              style={{
                fontFamily: textFieldStyles.family,
                marginTop: "10px",
              }}
            >
              {isTimerRunning ? (
                `Resend in ${timer} seconds`
              ) : (
                <span
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: textFieldStyles.color,
                    fontFamily: textFieldStyles.family,
                  }}
                  onClick={handleResendClick}
                >
                  Resend
                </span>
              )}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              color={textFieldStyles.color}
              style={{
                fontFamily: textFieldStyles.family,
                marginTop: "10px",
              }}
            >
              OTP sent successfully !
            </Typography>
          )}
          <br />
          {loading ? (
            <CircularProgress
              style={{
                marginTop: "30px",
                color: textFieldStyles.color,
                width: "25px",
                height: "25px",
              }}
            />
          ) : (
            <ThreeDButton
              disabled={disableButton}
              name={"SUBMIT"}
              onClick={() => {
                handleModalSubmit()
                // handleOpenQuestion();
              }}
            />
          )}
        </center>
      </Box>
    </Modal>
  );
};

export default OTPModal;

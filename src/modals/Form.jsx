import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";
import { textFieldStyles } from "../constants";
import ThreeDButton from "../components/Buttons/3dButton";
import { PhoneNumberUtil } from "google-libphonenumber";
import "react-phone-input-2/lib/style.css";
import "../App.css";
import { checkCustomer, createUser } from "../api/api";
import PhoneInput from "react-phone-input-2";
import styled from "styled-components";

const StyledPhoneInput = styled(PhoneInput)`
  & .react-tel-input .form-control {
    height: 100%;
    width: 100% !important;
    border-radius: 0.8rem !important;
    border: 1px #c4c4c4 solid !important;
    overflow: hidden !important;
    color: red !important;
    font-weight: 300 !important;
  }

  & .react-tel-input {
    border-radius: 0.8rem !important;
    overflow: hidden;
    font-weight: 300 !important;

    height: 2.5em;
  }

  & .react-tel-input .flag-dropdown {
    border-radius: 0.6rem 0 0 0.6rem !important;
    font-weight: 300 !important;

  }
`;

const CustomModal = ({ isOpen, onExport }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Mobile: "",
    Email: "",
    Country: "in",
  });
  const [errors, setErrors] = useState({
    Name: "",
    Mobile: "",
    Email: "",
  });

  const [isDisable, setDisable] = useState(true);

  const handleChange = (field) => (event) => {
    const inputValue = event.target.value;
    let updatedValue = inputValue;
    // console.log(updatedValue);
    // console.log(errors);
    if (field === "Email") {
      // Check for email format validity
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(updatedValue);

      setFormData({
        ...formData,
        [field]: updatedValue,
      });
      if (isValidEmail) {
        setErrors({
          ...errors,
          Email: "",
        });
      } else {
        setErrors({
          ...errors,
          Email: "Invalid email format",
        });
      }
    }
    if (field === "Name") {
      if (!/^[a-zA-Z\s]+$/.test(updatedValue) || updatedValue.trim() == "") {
        setFormData({
          ...formData,
          [field]: updatedValue,
        });
        setErrors({
          ...errors,
          Name: "Please use only alphabets.",
        });
      } else {
        setFormData({
          ...formData,
          [field]: updatedValue,
        });
        setErrors({
          ...errors,
          Name: "",
        });
      }
    }

    if (field === "Mobile") {
      const mobileNumberRegex = /^[1-9]\d{8}$/;
      let isValidMobileNumber = inputValue.length <= 9;
      let numError = true;
      if (inputValue.length == 9) {
        numError = mobileNumberRegex.test(inputValue);
      }
      console.log(isValidMobileNumber, numError);
      setFormData({
        ...formData,
        [field]: isValidMobileNumber ? inputValue : formData.Mobile,
      });

      setErrors({
        ...errors,
        Mobile: numError ? "" : "Invalid Mobile Number",
      });
      if (inputValue.length < 9) {
        setErrors({
          ...errors,
          Mobile: "Invalid Mobile Number",
        });
      }
    }
  };
  const handlePhoneChange = (value, country, e, formattedValue) => {
    setFormData({
      ...formData,
      ["Country"]: country["countryCode"],
      ["Mobile"]: value,
    });

    const phoneUtil = PhoneNumberUtil.getInstance();
    const phoneNumber = "+123456789"; // Replace with the phone number you want to validate
    const regionCode = "US"; // Replace with the relevant country code

    try {
      const parsedPhoneNumber = phoneUtil.parseAndKeepRawInput(
        value,
        country["countryCode"]
      );
      const isValid = phoneUtil.isValidNumber(parsedPhoneNumber);
      // console.log(`Is the phone number valid? ${isValid}`);
      if (isValid) {
        setErrors({
          ...errors,
          Mobile: "",
        });
      } else {
        setErrors({
          ...errors,
          Mobile: "Invalid Mobile Number",
        });
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  // };
  const isFormValid = () => {
    const result =
      !Object.values(errors).some((error) => error !== "") &&
      !Object.values(formData).some((error) => error === "");
    return result;
  };

  const exportUserData = async () => {

    console.log("Exported User Data:", formData);
    let req = {
      Mobile: formData.Mobile,
      Email: formData.Email,
    };
    let data = await checkCustomer(req);
    console.log(data);
    if (data?.Status == 1) {
      let req = {
        Mobile: formData.Mobile,
        Email: formData.Email,
        Name: formData.Name,
      };
      localStorage.setItem("userData", JSON.stringify(req));
      createUser(req);

      let res = {
        Status: true,
        Msg: "OTP sent",
      };
      onExport(res);
    } else {
      let res = {
        Status: false,
        Msg: data.Msg,
      };
      onExport(res);
    }
    onExport(formData);
  };

  useEffect(() => {
    if (isFormValid()) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [formData]);

  return (
    <div>
      <style>
        {`
.react-tel-input .form-control {
  color: #B38F64;
  height: 100%; 
  width: 100% !important;
  height: 100% !important;
  border-radius: 0.7rem !important;
  font-family:${textFieldStyles.family};
  font-weight:normal;

  border:  ${errors.Mobile !== "" ? " 1.6px #d32f2f" : " 1px #c4c4c4"
          } solid !important;
  overflow: hidden !important;
}

.react-tel-input {
  // margin-bottom: 15px;
  border-radius: 0.7rem 0 0 0.7rem !important;
  /* overflow: hidden; */
  height: 2.5em;
}
.react-tel-input .flag-dropdown {
  border-radius: 0.7rem 0 0 0.7rem !important;
}

.react-tel-input .flag-dropdown.open .selected-flag {
  background: #fff;
  border-radius: 0.7rem 0 0 0.7rem !important;
}

        `}
      </style>
      <Modal open={isOpen} disableBackdropClick={true}>
        <Box
          sx={{
            position: "absolute",
            top: "10%", // Adjust the top value
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%", // Set the width as desired
            maxWidth: "350px", // Set the max width as desired
            // Set the max height to 40% of the viewport height

            maxHeight: "max-content", // Set the max height to 40% of the viewport height
            overflowY: "auto", // Add overflowY for scrolling if needed
            bgcolor: "#ffffffed",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <center>
            <Typography
              style={{
                fontSize: "calc(1rem + 1.2vw)",
                fontFamily: textFieldStyles.family,
                marginBottom: "10px",
                fontWeight: "500"
              }}
            >
              Please enter the details
              <br />
              and validate to Spin!
            </Typography>
          </center>

          <Grid xs={12}>
            <TextField
              label="Name"
              size="small"
              type="text"
              required
              fullWidth
              value={formData.Name}
              name="Name"
              onChange={handleChange("Name")}
              InputProps={{
                style: {
                  color: textFieldStyles.color, // Input text color
                  background: "white", // Input background color
                  border: "none", // Remove input border
                  borderRadius: "10px",
                  fontFamily: textFieldStyles.family,
                },
                inputProps: {
                  maxLength: 40,
                  autoFocus: true,
                },
                autoFocus: true,
              }}
              InputLabelProps={{
                style: {
                  color: textFieldStyles.color, // Label color
                  fontFamily: textFieldStyles.family,
                },
              }}
              error={Boolean(errors.Name)}
              helperText={errors.Name}
              sx={{ marginBottom: "15px" }}
            />

            {/* <MuiPhoneNumber
              defaultCountry="ca"
              regions={["north-america", "carribean"]}
            /> */}
            <div style={{ marginBottom: "15px" }}>
              <StyledPhoneInput
                className="phone"
                // specialLabel="bae"
                inputProps={{
                  name: "Mobile",
                  required: true,
                  // autoFocus: true,
                }}
                country={formData.Country}
                value={formData.Mobile}
                helperText={errors.Mobile}
                onChange={handlePhoneChange}
              />

              <Typography
                sx={{
                  color: "#d32f2f",
                  fontSize: "0.75rem",
                  margin: "0 1rem",
                  marginTop: "7px",
                }}
              >
                {errors.Mobile}
              </Typography>
            </div>
            {/* <TextField
              label="Mobile"
              fullWidth
              size="small"
              required
              type="number"
              value={formData.Mobile} // Remove default country code for display
              name="Mobile"
              onChange={handleChange("Mobile")}
              InputProps={{
                style: {
                  color: textFieldStyles.color, // Input text color
                  background: "white", // Input background color
                  border: "none", // Remove input border
                  borderRadius: "10px",
                  fontFamily: textFieldStyles.family,
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <p
                      style={{
                        color: textFieldStyles.color, // Input text color
                        background: "white", // Input background color
                        border: "none", // Remove input border
                        fontFamily: textFieldStyles.family,
                        marginTop: "17px",
                      }}
                    >
                      +60
                    </p>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: {
                  color: textFieldStyles.color, // Label color
                  fontFamily: textFieldStyles.family,
                },
              }}
              error={Boolean(errors.Mobile)}
              helperText={errors.Mobile}
              sx={{ marginBottom: "15px" }}
            /> */}
            <TextField
              label="Email"
              required
              fullWidth
              size="small"
              type="email"
              value={formData.Email}
              name="Email"
              onChange={handleChange("Email")}
              InputProps={{
                style: {
                  color: textFieldStyles.color, // Input text color
                  background: "white", // Input background color
                  border: "none", // Remove input border
                  fontFamily: textFieldStyles.family,
                  marginLeft: "0",
                  borderRadius: "10px",
                },
              }}
              InputLabelProps={{
                style: {
                  color: textFieldStyles.color, // Label color
                  fontFamily: textFieldStyles.family,
                },
              }}
              error={Boolean(errors.Email)}
              helperText={errors.Email}
              sx={{ marginBottom: "15px" }}
            />
          </Grid>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <center>
              <ThreeDButton
                name={"VALIDATE"}
                onClick={exportUserData}
                disabled={isDisable}
              />
            </center>
          </div>
        </Box>
      </Modal>
    </div >
  );
};

export default CustomModal;

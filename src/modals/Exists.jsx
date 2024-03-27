import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import { textFieldStyles } from "../constants";
import ThreeDButton from "../components/Buttons/3dButton";
const ExistsModal = ({ isOpen, onClick, input1, input2 }) => {
  return (
    <div>
      <Modal open={isOpen} disableBackdropClick={true}>
        <Box
          sx={{
            position: "absolute",
            top: "10%", // Adjust the top value
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%", // Set the width as desired
            maxWidth: "400px", // Set the max width as desired
            // Set the max height to 40% of the viewport height

            maxHeight: "50vh", // Set the max height to 40% of the viewport height
            overflowY: "auto", // Add overflowY for scrolling if needed
            bgcolor: "#ffffffed",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <center>
            <img
              src="/warn.png"
              alt="voucher"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            />
          </center>
          <Grid xs={12}>
            <center>
              <Typography
                style={{
                  fontSize: "calc(1rem + 1vw)",
                  fontFamily: textFieldStyles.family,
                  marginBottom: "10px",
                  fontWeight: 500
                }}
              >
                {input1} is already
                <br />
                Registered, please try a
                <br />different {input2}!
              </Typography>
            </center>
          </Grid>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <center>
              <ThreeDButton name={"BACK"} onClick={onClick} />
            </center>
          </div>
        </Box>
      </Modal>
    </div >
  );
};

export default ExistsModal;

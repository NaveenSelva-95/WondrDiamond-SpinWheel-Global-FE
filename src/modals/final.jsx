import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Grid, IconButton, Typography } from "@mui/material";
import { textFieldStyles } from "../constants";
import CloseIcon from "@mui/icons-material/Close";

const FinalModal = ({ isOpen, onClose, image, code, name, handleReload }) => {
  const downloadImage = () => {
    const base64Image = image;
    var a = document.createElement("a");
    a.href = base64Image;
    a.download = `${name} Coupon.png`;
    a.click();
    document.body.removeChild(a);
  };
  return (
    <div>
      <img
        src={image}
        alt="preload"
        style={{ height: "1px", width: "1px", opacity: 0 }}
      />
      <Modal open={isOpen} onClose={onClose} disableBackdropClick={true}>
        <Box
          sx={{
            position: "absolute",
            top: "10%", // Adjust the top value
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%", // Set the width as desired
            maxWidth: "400px", // Set the max width as desired
            maxHeight: "90vh", // Set the max height to 40% of the viewport height
            overflowY: "auto", // Add overflowY for scrolling if needed
            bgcolor: "#ffffffed",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          {" "}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              background: "black",
              borderRadius: "5px",
              padding: 0,
              color: "white",
            }}
            onClick={handleReload}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Grid xs={12}>
            <center>
              <div id="root5">
                <img
                  src={image} // "/image1 2.png"
                  alt="voucher"
                  style={{
                    marginBottom: "5px",
                    maxWidth: "80%",
                    borderRadius: "30px",
                  }}
                />
                <br />
              </div>
              <Typography
                style={{
                  fontSize: "calc(1rem + 1.2vw)",
                  fontFamily: textFieldStyles.family,
                  fontWeight: "500",
                  marginBottom: "20px",
                }}
              >
                Voucher will be sent to your email or whatsapp  , or you can download it from
                <span
                  onClick={() => {
                    downloadImage();
                  }}
                  style={{ color: "#ED6B55" }}
                >
                  {" "}
                  here{" "}
                  <img
                    src="/download.svg"
                    style={{ color: "#ED6B55" }}
                    height="15px"
                  />{" "}
                </span>
              </Typography>
              <Typography
                style={{
                  fontSize: "1.1rem",
                  fontFamily: textFieldStyles.family,
                  // marginBottom: "10px",
                }}
              >
                For more, follow us on
              </Typography>

              <div>
                <img
                  src="/social/yt.png"
                  height="36px"
                  alt="voucher"
                  style={{ marginTop: "20px", marginRight: "5px" }}
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/results?search_query=wondrDiamonds",
                      "_blank"
                    )
                  }
                />
                <img
                  src="/social/insta.png"
                  height="35px"
                  alt="voucher"
                  style={{ marginTop: "20px", marginRight: "5px" }}
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/wondrdiamonds/",
                      "_blank"
                    )
                  }
                />
                <img
                  src="/social/fb.png"
                  height="35px"
                  alt="voucher"
                  style={{ marginTop: "20px", marginRight: "2px" }}
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/wondrdiamonds",
                      "_blank"
                    )
                  }
                />{" "}
                {/* <img
                  src="/social/tk.png"
                  height="35px"
                  alt="voucher"
                  style={{ marginTop: "20px", marginRight: "5px" }}
                  onClick={() =>
                    window.open(
                      "https://www.tiktok.com/@babyshop_malaysia?_t=8jeIDDIalVe&_r=1",
                      "_blank"
                    )
                  }
                /> */}
              </div>
            </center>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default FinalModal;

import React, { useEffect } from "react";
import { Stack, Toolbar, useMediaQuery, useTheme } from "@mui/material";

const Header = () => {
  const deviceHeight = window.innerHeight;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const logoStyle = {
    // top: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: isMobile ? "80px" : "10vh", // Adjust the height for mobile devices
    background: "transparent",
  };

  const imgStyle = {
    marginTop: deviceHeight < 650 ? "20px" : "",
    maxHeight: "100%",
    maxWidth: "60vw",

    objectFit: "contain",
    color: "white",
    cursor: "pointer",
  };

  const HomeButton = () => {
    console.log("home");
  };

  return (
    <Stack>
      <Toolbar style={logoStyle}>
        <img
          src="/PNG/logo.png" // Replace with the actual path to your logo image
          alt="Your Logo"
          style={imgStyle}
          onClick={() => {
            HomeButton();
          }}
        />
      </Toolbar>
    </Stack>
  );
};

export default Header;

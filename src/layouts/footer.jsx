import React from "react";

const footerStyle = {
  position: "fixed",
  bottom: 0,
  right: 10,
  width: "100%",
  fontSize: "0.7rem",
  padding: "8px",
  textAlign: "right",
  color: "black",
};
const footerStyle1 = {
  position: "fixed",
  bottom: 0,
  left: 10,
  width: "100%",
  fontSize: "0.7rem",
  padding: "8px",
  textAlign: "left",
  color: "black",
};
const Footer = () => {
  return (
    <>
      <div style={footerStyle1}>* Terms & Conditions Apply</div>
      <div style={footerStyle}>
        Powered by{" "}
        <a
          href="https://coitor.com/"
          target="blank"
          style={{ color: "black", textDecoration: "none" }}
        >
          <b>Coitor</b>
        </a>
      </div>
    </>
  );
};

export default Footer;

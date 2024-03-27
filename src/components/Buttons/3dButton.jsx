import React from "react";
// import "./ThreeDButton.css"; // Import your CSS file

const ThreeDButton = ({ onClick, name, disabled }) => {
  let fontSize = window.innerWidth < 350 ? "large" : "large";

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      style={{
        // fontFamily: "san serif",
        fontSize: fontSize,
        color: "white",
        padding: "5px 12px 5px 12px",
        border: "none",
        borderRadius: "10px",
        background: disabled ? "#bebebe" : "#B38F64",
        fontWeight: '500',
        letterSpacing: "2px",
        // marginTop: "30px",
      }}
      disabled={disabled}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default ThreeDButton;

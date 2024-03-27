import React from "react";
// import "./ThreeDButton2.css"; // Import your CSS file

const ThreeDButton2 = ({ onClick, name, disabled }) => {
    let fontSize = window.innerWidth < 350 ? "large" : "x-large";

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            style={{
                fontFamily: `"Cormorant Infant", serif`,
                fontSize: fontSize,
                color: "white",
                padding: "5px 15px ",
                border: "none",
                borderRadius: "10px",
                background: disabled ? "#bebebe" : "#B38F64",
                fontWeight: 'bold',
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

export default ThreeDButton2;

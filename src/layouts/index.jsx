import { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
  const [vivo, setVivo] = useState(false);
  const [valid, setValiDated] = useState(null);
  const divStyle = {
    height: "max-content",
    width: "90%",
    left: "5%",
    borderRadius: "30px",
    position: "absolute",
    justifyContent: "center",
    display: "flex",
  };
  const imageStyle = {
    width: vivo == true ? "100vw" : "100svw", // Ensure the image doesn't exceed its container width
    height: vivo == true ? "100vh" : "100svh", // Maintain the image's aspect ratio
    position: "fixed",
    objectFit: "cover",
    objectPosition: "center",
    top: "0",
    left: "0",
  };

  const Asset3 = {
    width: "40vw",
    height: "auto",
    position: "fixed",
    objectFit: "cover",
    objectPosition: "center center",
    top: "0.5%",
    left: "-30vw",
  };

  const Asset4 = {
    width: "40vw",
    height: "auto",
    position: "fixed",
    objectFit: "cover",
    objectPosition: "center center",
    top: "-27vw",
    right: "-20vw",

  };
  const Asset5 = {
    width: "4vw",
    height: "auto",
    position: "fixed",
    objectFit: "cover",
    objectPosition: "center center",
    right: "-2vw",
    bottom: "40vh",

  };
  const Asset6 = {
    width: "100vw",
    height: "auto",
    position: "fixed",
    objectFit: "cover",
    objectPosition: "center center",
    right: "0",
    top: "0",
  };
  const Asset2 = {
    width: "100vw",
    height: "auto",
    position: "fixed",
    objectFit: "cover",
    objectPosition: "center center",
    right: "0",
    bottom: "0",
    zIndex: "2"
  };
  const Asset7 = {
    width: "auto",
    height: "13vh",
    position: "fixed",
    objectFit: "cover",
    objectPosition: "center center",
    bottom: "27vh",
    left: "-2vw",

  };
  const Asset8 = {
    width: "40vw",
    height: "auto",
    position: "fixed",
    objectFit: "cover",
    objectPosition: "center center",
    bottom: "0vw",
    left: "-11vw",

  };
  const Asset9 = {
    width: "auto",
    height: "8vh",
    position: "fixed",
    objectFit: "cover",
    objectPosition: "center center",
    bottom: "0vw",
    right: "11vw",
    display: "none",

  };
  const Asset10 = {
    width: "auto",
    height: "8vh",
    position: "fixed",
    objectFit: "cover",
    objectPosition: "center center",
    bottom: "8vh",
    right: "-1vw",

  };
  const Asset11 = {
    width: "auto",
    height: "12vh",
    position: "fixed",
    objectFit: "cover",
    objectPosition: "center center",
    bottom: "17vh",
    right: "-7vw",

  };

  const detectBrowser = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Vivo")) {
      setVivo(true);
    }
    if (userAgent.includes("Chrome")) {
      const chromeVersion = userAgent.match(/Chrome\/(\d+\.\d+)/);
      if (chromeVersion) {
        const version = chromeVersion[1];
        if (version < 108) {
          setVivo(true);
        }
      }
    }
    setValiDated(true);
  };
  useEffect(() => {
    detectBrowser();
  }, []);
  return (
    <div>
      {/* {valid && (
        <img src="/PNG/BG_01.png" alt="Background" style={imageStyle} />
      )} */}
      {valid && (
        <img src="/PNG/Asset3.png" alt="Background" style={Asset3} />
      )}
      {valid && (
        <img src="/PNG/Asset4.png" alt="Background" style={Asset4} />
      )}
      {valid && (
        <img src="/PNG/Asset5.png" alt="Background" style={Asset5} />
      )}
      {valid && (
        <img src="/PNG/Asset6.png" alt="Background" style={Asset6} />
      )}
      {valid && (
        <img src="/PNG/Asset6.png" alt="Background" style={Asset2} />
      )}
      {valid && (
        <img src="/PNG/Asset7.png" alt="Background" style={Asset7} />
      )}
      {valid && (
        <img src="/PNG/Asset8.png" alt="Background" style={Asset8} />
      )}
      {valid && (
        <img src="/PNG/Asset9.png" alt="Background" style={Asset9} />
      )}
      {valid && (
        <img src="/PNG/Asset10.png" alt="Background" style={Asset10} />
      )}
      {valid && (
        <img src="/PNG/Asset11.png" alt="Background" style={Asset11} />
      )}

      {/* {valid && (
        <img src="/PNG/BG_02.png" alt="Background" style={imageStyle} />
      )} */}

      <div>
        <div style={divStyle}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

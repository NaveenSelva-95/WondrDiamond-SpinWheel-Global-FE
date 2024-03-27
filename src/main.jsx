import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <img
      src="/PNG/BG_01.png"
      alt="preload"
      style={{
        height: "1px",
        display: "flex",
        position: "absolute",
        width: "1px",
        opacity: 0,
      }}
    />
    <img
      src="/PNG/BG_02.png"
      alt="preload"
      style={{
        height: "1px",
        display: "flex",
        position: "absolute",
        width: "1px",
        opacity: 0,
      }}
    />{" "}
    <img
      src="/stand.png"
      alt="preload"
      style={{
        height: "1px",
        display: "flex",
        position: "absolute",
        width: "1px",
        opacity: 0,
      }}
    />{" "}
    <img
      src="/wheel.png"
      alt="preload"
      style={{
        height: "1px",
        display: "flex",
        position: "absolute",
        width: "1px",
        opacity: 0,
      }}
    />
    <img
      src="/arrow.png"
      alt="preload"
      style={{
        height: "1px",
        display: "flex",
        position: "absolute",
        width: "1px",
        opacity: 0,
      }}
    />
    <img
      src="/PNG/logo.png"
      alt="preload"
      style={{
        height: "1px",
        display: "flex",
        position: "absolute",
        width: "1px",
        opacity: 0,
      }}
    />
    <App />
  </BrowserRouter>
);

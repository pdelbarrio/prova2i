import React from "react";
import { ToastContainer } from "react-toastify";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer theme="colored" />
  </React.StrictMode>
);

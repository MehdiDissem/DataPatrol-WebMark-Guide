import React from "react";
import "../DataPatrolWebmark.css";

const Toast = ({ show, message }) => {
  return (
    <div className={`toast ${show ? "show" : ""}`}>
      {message}
    </div>
  );
};

export default Toast;

import React from "react";
import "../DataPatrolWebmark.css";

const Overlay = ({ imageUrl, onClose }) => (
  <div className="overlay" onClick={onClose}>
    <img src={imageUrl} alt="SDK Placement" />
  </div>
);

export default Overlay;

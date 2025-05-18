import React, { useState } from "react";
import "../DataPatrolWebmark.css";
import Overlay from "./Overlay";
import Toast from "./Toast";
import ReactGuide from "./ReactGuide";
import AngularGuide from "./AngularGuide";
import NextJSGuide from "./NextJSGuide";  // <-- Import NextJSGuide

const DataPatrolWebmark = () => {
  const [view, setView] = useState("react");
  const [toastVisible, setToastVisible] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const overlayImageUrl =
    view === "react"
      ? "/React_Placement.png"
      : view === "angular"
      ? "/Angular_Placement.png"
      : "/NextJS_Placement.png";  // Add image for NextJS if available

  return (
    <div className="container">
      {showOverlay && (
        <Overlay imageUrl={overlayImageUrl} onClose={toggleOverlay} />
      )}
      <Toast show={toastVisible} message="Copied to clipboard!" />

      <h1 className="main-title">WebMark Integration Guide</h1>

      <div className="logo-container">
        <img
          src="/DATAPATROL_LOGO.png"
          alt="Company Logo"
          className="company-logo"
        />
      </div>

      <a
        href="/pdfs/WebMark-Integration-guide.pdf"
        download
        className="download-btn"
      >
        📄 Download PDF Guide
      </a>

      <div className="tabs">
        <button
          onClick={() => setView("react")}
          className={view === "react" ? "tab active" : "tab"}
        >
          React Guide
        </button>
        <button
          onClick={() => setView("angular")}
          className={view === "angular" ? "tab active" : "tab"}
        >
          Angular Guide
        </button>
        <button
          onClick={() => setView("nextjs")}
          className={view === "nextjs" ? "tab active" : "tab"}
        >
          NextJS Guide
        </button>
      </div>

      {view === "react" && <ReactGuide onCopy={showToast} />}
      {view === "angular" && <AngularGuide onCopy={showToast} />}
      {view === "nextjs" && <NextJSGuide onCopy={showToast} />}
    </div>
  );
};

export default DataPatrolWebmark;

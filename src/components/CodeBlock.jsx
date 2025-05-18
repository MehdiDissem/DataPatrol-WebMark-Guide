import React from "react";
import "../DataPatrolWebmark.css";

const CodeBlock = ({ code, onCopy }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    onCopy();
  };

  return (
    <div className="code-block">
      <pre>{code}</pre>
      <button onClick={copyToClipboard} className="copy-btn" aria-label="Copy to clipboard">
        📋
      </button>
    </div>
  );
};

export default CodeBlock;

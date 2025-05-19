import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../DataPatrolWebmark.css";

const CodeBlock = ({ code, language = "javascript", onCopy }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    onCopy();
  };

  return (
    <div className="code-block">
      <SyntaxHighlighter language={language} style={vscDarkPlus} showLineNumbers>
        {code}
      </SyntaxHighlighter>
      <button onClick={copyToClipboard} className="copy-btn" aria-label="Copy to clipboard">
        📋
      </button>
    </div>
  );
};

export default CodeBlock;

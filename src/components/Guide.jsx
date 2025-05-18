import React from "react";
import CodeBlock from "./CodeBlock";

const Guide = ({ docs, sdkPlacementInfo, onCopy }) => (
  <>
    {sdkPlacementInfo}
    {docs.map((doc, idx) => (
      <div key={idx} className="doc-section">
        <h2 className="doc-title">{doc.title}</h2>
        <CodeBlock code={doc.code} onCopy={onCopy} />
      </div>
    ))}
  </>
);

export default Guide;

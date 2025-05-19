import React, { useState } from "react";
import CodeBlock from "./CodeBlock";

const ToggleCodeBlock = ({ options, onCopy }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="toggle-buttons">
        {options.map((opt, index) => (
          <button
            key={opt.label}
            onClick={() => setSelected(index)}
            className={`toggle-btn ${selected === index ? "active" : ""}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <CodeBlock code={options[selected].code} onCopy={onCopy} />
    </div>
  );
};

export default ToggleCodeBlock;

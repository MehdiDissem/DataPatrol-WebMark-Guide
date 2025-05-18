import React from "react";
import CodeBlock from "./CodeBlock";

export const nextjsDocsData = [
  {
    title: "Import Script and SDK Models in layout.tsx",
    description: "Import the SDK loader and model classes to prepare your Next.js app for integration.",
    code: `import Script from "next/script";

import {
  DataPatrolUserInfo,
  DataPatrolAppInfo,
  DataPatrolSecurityAlertType
} from "../../sdk_models";`
  },
  {
    title: "Add SDK Script in layout.tsx",
    description: "Load the SDK after the page becomes interactive. The script should be placed in your public folder.",
    code: `<Script
  src="/sdk.js"
  strategy="afterInteractive"
  onLoad={() => {
    console.log("✅ SDK Loaded!");
  }}
  onError={(e) => console.error("❌ SDK failed to load", e)}
/>`
  },
  {
    title: "Set Up Token and App Info (can be global variables)",
    description: "Define your DataPatrol credentials and app metadata globally.",
    code: `const token = "AD0920E1173E4E2920E111B7B9920E11C4BCD8920E115F8C50";

const appInfo = new DataPatrolAppInfo(
  "229994940",          // Unique App ID
  "Customer A Web App", // Website Name
  "3.0.0.0"             // Website Version
);`
  },
  {
    title: "Watermark Context and Provider (for global watermark handler)",
    description: "Create a new React Context to manage the watermark handler. This allows you to apply and remove the watermark globally without prop drilling.",
    code: `"use client";
import React, { createContext, useContext, useState } from "react";

// Context holds the watermark handler after applying it
const WatermarkContext = createContext({
  handler: null,
  setHandler: () => {}
});

export function WatermarkProvider({ children }) {
  const [handler, setHandler] = useState(null);

  return (
    <WatermarkContext.Provider value={{ handler, setHandler }}>
      {children}
    </WatermarkContext.Provider>
  );
}

export function useWatermark() {
  return useContext(WatermarkContext);
}`
  },
  {
    title: "Apply Watermark Example (call on user login)",
    description: "Call this function when the user logs in. It applies the watermark and stores the handler in context for later removal.",
    code: `import { useWatermark } from "./WatermarkContext";

async function applyWatermark(username) {
  const userInfo = new DataPatrolUserInfo(username);
  const { setHandler } = useWatermark();

  if (window.DataPatrolWebSdk) {
    try {
      const handler = await window.DataPatrolWebSdk.applyWatermark(
        "https://YOURDATAPATROLAPIHERE/int/v1/policy",
        token,
        userInfo,
        appInfo,
        false
      );
      setHandler(handler); // Store handler in context for reuse
      console.log("✅ Watermark applied.");
    } catch (error) {
      console.error("❌ Failed to apply watermark:", error);
    }
  } else {
    console.warn("⚠️ SDK not loaded.");
  }
}`
  },
  {
    title: "Remove Watermark Example (call on logout or session end)",
    description: "Use this to cleanly remove the watermark using the handler stored in context.",
    code: `import { useWatermark } from "./WatermarkContext";
import { useCallback } from "react";

const removeWatermark = useCallback(async () => {
  const { handler } = useWatermark();

  if (window.DataPatrolWebSdk && handler) {
    try {
      await window.DataPatrolWebSdk.removeWatermark(handler);
      console.log("✅ Watermark removed.");
    } catch (error) {
      console.error("❌ Error removing watermark:", error);
    }
  } else {
    console.warn("⚠️ SDK or handler not available.");
  }
}, []);`
  }
];

export const nextjsSdkPlacementInfo = (
  <div className="sdk-placement-info">
    <h2 className="text-xl font-bold text-purple-600 mb-2">SDK Placement (NextJS)</h2>
    <ul className="list-disc ml-6 text-base text-gray-700">
      <li>
        Place SDK files in the <code className="font-mono bg-gray-100 px-1 py-0.5 rounded">public</code> folder:
        <ul className="list-[circle] ml-6">
          <li>public/sdk.js</li>
          <li>public/sdk.js.LICENSE.txt</li>
        </ul>
      </li>
      <li>
        Place <code className="font-mono bg-gray-100 px-1 py-0.5 rounded">sdk_models.js</code> inside the <code className="font-mono bg-gray-100 px-1 py-0.5 rounded">src</code> folder.
      </li>
    </ul>
  </div>
);

const NextJSGuide = ({ onCopy }) => (
  <>
    {nextjsSdkPlacementInfo}
    {nextjsDocsData.map((doc, idx) => (
      <div key={idx} className="doc-section mb-8">
        <h2 className="text-lg font-semibold text-blue-600 mb-1">{doc.title}</h2>
        {doc.description && <p className="text-sm text-gray-600 mb-2">{doc.description}</p>}
        <CodeBlock code={doc.code} onCopy={onCopy} />
      </div>
    ))}
  </>
);

export default NextJSGuide;
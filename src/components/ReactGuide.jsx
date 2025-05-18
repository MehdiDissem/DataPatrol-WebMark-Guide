import React from "react";
import CodeBlock from "./CodeBlock";

export const reactDocsData = [
  {
    title: "Add SDK Script in index.html",
    code: `<script src="%PUBLIC_URL%/sdk.js"></script>`
  },
  {
    title: "Imports and Setup (In main Layout, up with other imports)",
    code: `// In the React code, import the necessary functions from SDK Models:
import {
  DataPatrolUserInfo,
  DataPatrolAppInfo,
  DataPatrolLogInfo,
  DataPatrolLogLevel,
  DataPatrolFeatureType,
  DataPatrolSecurityAlertType
} from "./sdk_models";

import { useCallback } from 'react'`
  },
  {
    title: "Set Up Token and App Info (can be global variables)",
    code: `const token = "AD0920E1173E4E2920E111B7B9920E11C4BCD8920E115F8C50"; // Your unique token
const appInfo = new DataPatrolAppInfo(
  "229994941111",          // Unique App ID provided by the customer
  "Customer A Web App",    // Website Name
  "3.0.0.1"                // Website Version
);

let handler = '';`
  },
  {
    title: "Apply Watermark Example (This function must be called)",
    code: `const applyWatermark = useCallback(async (user) => {
  const userInfo = new DataPatrolUserInfo(user);
  console.log(userInfo);
  if (window.DataPatrolWebSdk) {
    try {
      handler = await window.DataPatrolWebSdk.applyWatermark(
        "https://YOURDATAPATROLAPIHERE/int/v1/policy",
        token,
        userInfo,
        appInfo,
        false
      );
    } catch (error) {
      console.error("Error applying watermark:", error);
    }
  } else {
    console.warn("DataPatrolWebSdk is not loaded.");
  }
}, []);`
  },
  {
    title: "Remove Watermark Example (this function must be called)",
    code: `// The handler should be passed to remove the watermark on logout or session end
const removeWatermark = useCallback(async () => {
  if (window.DataPatrolWebSdk) {
    await window.DataPatrolWebSdk.removeWatermark(handler);
  } else {
    console.warn("DataPatrolWebSdk is not loaded.");
  }
}, []);`
  }
];

export const reactSdkPlacementInfo = (
  <div className="sdk-placement-info">
    <h2>SDK Placement (React)</h2>
    <ul>
      <li>
        Place the SDK in the public folder:
        <ul>
          <li>public/sdk.js</li>
          <li>public/sdk.js.LICENSE.txt</li>
        </ul>
      </li>
      <li>
        Place sdk_models.js in the src folder:
        <ul>
          <li>src/sdk_models.js</li>
        </ul>
      </li>
    </ul>
  </div>
);

const ReactGuide = ({ onCopy }) => (
  <>
    {reactSdkPlacementInfo}
    {reactDocsData.map((doc, idx) => (
      <div key={idx} className="doc-section">
        <h2 className="doc-title">{doc.title}</h2>
        <CodeBlock code={doc.code} onCopy={onCopy} />
      </div>
    ))}
  </>
);

export default ReactGuide;

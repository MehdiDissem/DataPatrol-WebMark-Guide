import React from "react";
import CodeBlock from "./CodeBlock";
import ToggleCodeBlock from "./ToggleCodeBlock";


export const reactDocsData = [
  {
    id: "sdkScript",
    title: "Include SDK Script",
    description:
      "Add the DataPatrol SDK to your `public/index.html` file to access watermarking functionality. Must be inside <head>",
    code: `<head>
    <script src="%PUBLIC_URL%/sdk.js"></script>
</head>`
  },
  {
    id: "imports",
    title: "Import Required Classes",
    description: "Import the necessary models and enums from the SDK.",
    code: `import {
  DataPatrolUserInfo,
  DataPatrolAppInfo,
  DataPatrolLogInfo,
  DataPatrolLogLevel,
  DataPatrolFeatureType,
  DataPatrolSecurityAlertType
} from "./sdk_models";

 import { useCallback } from "react";`
  },
  {
    id: "appInfo",
    title: "Define App Info and Token",
    description: "Set your unique App Info and Token provided by DataPatrol.",
    code: `const token = "AD0920E1173E4E2920E111B7B9920E11C4BCD8920E115F8C50";
const appInfo = new DataPatrolAppInfo(
  "229994941111",          // Unique App ID provided by the customer
  "Customer A Web App",    // Website Name
  "3.0.0.1"                // Website Version
);
var handler = '' //Empty handler variable to hold the api response`
  },
  {
    id: "applyWatermark",
    title: "Apply Watermark Function (to be called after login process)",
    description: "This function initializes and applies the watermark when it is called.",
    toggle: true,
    toggleOptions: [
      {
        label: "Without Logging",
        code: `const applyWatermark = useCallback(async (user) => {
  const userInfo = new DataPatrolUserInfo(user);
    try {
      handler = await window.DataPatrolWebSdk.applyWatermark(
        "https://YOURDATAPATROLAPIURL/int/v1/policy",
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
        label: "With Logging",
        code: `const applyWatermark = useCallback(async (user) => {
  const userInfo = new DataPatrolUserInfo(user);

  if (window.DataPatrolWebSdk) {
    window.DataPatrolWebSdk.eventEmitter.on('securityAlert', (event) => {
      if (event.DataPatrolSecurityAlertType === DataPatrolSecurityAlertType.DevToolsDetected) {
        sendLog("DevTool was opened", userInfo);
      } else if (event.DataPatrolSecurityAlertType === DataPatrolSecurityAlertType.AdBlockerDetected) {
        sendLog("AdBlocker detected", userInfo);
      }
    });

    try {
      handler = await window.DataPatrolWebSdk.applyWatermark(
        "https://YOURDATAPATROLAPIURL/int/v1/policy",
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
      }
    ]
  },
  {
    id: "sendLog",
    title: "sendLog Function",
    description: "Send security or custom logs to the AdminPanel.",
    code: `const sendLog = useCallback(async (message, userInfo) => {
  if (window.DataPatrolWebSdk) {
    const logInfo = new DataPatrolLogInfo(
      message,
      DataPatrolLogLevel.Info,
      DataPatrolFeatureType.WebMarkText,
      "This log sent via web mark",
      "Custom log using API Registered successfully!"
    );

    try {
      await window.DataPatrolWebSdk.SendLog(
        "https://YOURDATAPATROLAPIURL/int/v1/log",
        handler,
        token,
        userInfo,
        appInfo,
        logInfo
      );
    } catch (error) {
      console.error("Error sending log:", error);
    }
  } else {
    console.warn("DataPatrolWebSdk is not loaded.");
  }
}, []);

/*
 * DataPatrolLogLevel values (used to specify log severity):
 *  - None (0): No logging
 *  - Verbos (1): Verbose logging details
 *  - Trace (2): Trace execution details
 *  - Info (3): Informational messages
 *  - Warning (4): Warning conditions
 *  - Error (5): Error conditions
 *  - Severe (6): Severe error conditions
 *  - Fatal (7): Fatal errors (critical)
 *
 *
 * DataPatrolSecurityAlertType values (used for security alerts):
 *  - DevToolsDetected (1): Developer tools opened
 *  - AdBlockerDetected (2): Ad blocker detected
 *
 * Example usage:
 *   const logInfo = new DataPatrolLogInfo(
 *     "User logged in",          // subject/message
 *     DataPatrolLogLevel.Info,   // log level (Info)
 *     DataPatrolFeatureType.WebMarkText, // feature type
 *     "User login event",        // description
 *     "Additional data here"     // extra data
 *   );
 *
 * Use these levels and types when sending logs or handling security alerts
 * to provide consistent and meaningful log entries in the AdminPanel.
 */`
  },
  {
    id: "removeWatermark",
    title: "Remove Watermark",
    description: "Call this function to remove the watermark (e.g. on logout).",
    code: `const removeWatermark = useCallback(async () => {
  if (window.DataPatrolWebSdk) {
    await window.DataPatrolWebSdk.removeWatermark(handler);
    setWatermarkApplied(false);
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
    <p>{doc.description}</p>
    {doc.toggle ? (
      <ToggleCodeBlock options={doc.toggleOptions} onCopy={onCopy} />
    ) : (
      <CodeBlock code={doc.code} onCopy={onCopy} />
    )}
  </div>
))}

  </>
);

export default ReactGuide;

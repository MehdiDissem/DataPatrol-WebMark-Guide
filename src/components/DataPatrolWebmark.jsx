import React, { useState, useCallback } from "react";
import "./DataPatrolWebmark.css";
import Overlay from "./Overlay";


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
const Toast = ({ show, message }) => {
    return (
      <div className={`toast ${show ? "show" : ""}`}>
        {message}
      </div>
    );
  };

const reactSdkPlacementInfo = (
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

const angularSdkPlacementInfo = (
  <div className="sdk-placement-info">
    <h2>SDK Placement (Angular)</h2>
    <ul>
  <li>
    Place the SDK in Angular's assets folder:
    <ul>
      <li>src/assets/WebMark_SDK.js</li>
      <li>src/assets/sdk.js.LICENSE.txt</li>
    </ul>
  </li>
  <li>
    Place sdk_models.js in src/app folder.
  </li>
</ul>
  </div>
);

const reactDocs = [
  {
    title: "Add SDK Script in index.html",
    code: `<script src="%PUBLIC_URL%/sdk.js"></script>`
  },
  {
    title: "Imports and Setup",
    code: `// In the React code, import the necessary functions from SDK Models:
import {
  DataPatrolUserInfo,
  DataPatrolAppInfo,
  DataPatrolLogInfo,
  DataPatrolLogLevel,
  DataPatrolFeatureType,
  DataPatrolSecurityAlertType
} from "./sdk_models";`
  },
  {
    title: "Set Up Token and App Info",
    code: `const token = "AD0920E1173E4E2920E111B7B9920E11C4BCD8920E115F8C50"; // Your unique token
const appInfo = new DataPatrolAppInfo(
  "229994941111",          // Unique App ID provided by the customer
  "Customer A Web App",    // Website Name
  "3.0.0.1"                // Website Version
);

let handler = '';`
  },
  {
    title: "Apply Watermark Example",
    code: `const applyWatermark = useCallback(async (user) => {
  const userInfo = new DataPatrolUserInfo(user);
  console.log(userInfo);
  
  if (window.DataPatrolWebSdk) {
    window.DataPatrolWebSdk.eventEmitter.on('securityAlert', (dataPatrolSecurityAlertTypeEventArgs) => {
      if (dataPatrolSecurityAlertTypeEventArgs.DataPatrolSecurityAlertType === DataPatrolSecurityAlertType.DevToolsDetected) {
        sendLog("DevTool was opened");
      }
    });
    
    try {
      handler = await window.DataPatrolWebSdk.applyWatermark(
        "https://YourDataPatrolApi.local/int/v1/policy",
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
    title: "Remove Watermark Example",
    code: `// The handler should be passed to remove the watermark on logout or session end
const removeWatermark = useCallback(async () => {
  if (window.DataPatrolWebSdk) {
    await window.DataPatrolWebSdk.removeWatermark(handler);
    setWatermarkApplied(false);
  } else {
    console.warn("DataPatrolWebSdk is not loaded.");
  }
}, []);`
  }
];

const angularDocs = [
  {
    title: "Add SDK to angular.json",
    code: `// Inside angular.json under architect > build > options > scripts:
"scripts": [
  "src/assets/WebMark_SDK.js"
]`
  },
  {
    title: "Import Required Classes",
    code: `// In app.component.ts:
import { DataPatrolAppInfo, DataPatrolSecurityAlertType, DataPatrolUserInfo } from 'src/sdk_models';`
  },
  {
    title: "Declare Handler in AppComponent",
    code: `// Inside AppComponent class:
static handler: string = "";`
  },
  {
    title: "Apply Watermark Function",
    code: `// Call this function with the username to apply the watermark
export async function applyWatermarkInternal(userName: string) {
  var token: string = "AD0920E1173E4E2920E111B7B9920E11C4BCD8920E115F8C50";
  var appInfo: DataPatrolAppInfo = new DataPatrolAppInfo("229994940", "Customer A Web App", "3.0.0.0");
  var userInfo: DataPatrolUserInfo = new DataPatrolUserInfo(userName);

  if (DataPatrolWebSdk) {
    DataPatrolWebSdk.eventEmitter.on('securityAlert', (dataPatrolSecurityAlertTypeEventArgs: any) => {
      if (dataPatrolSecurityAlertTypeEventArgs.DataPatrolSecurityAlertType == DataPatrolSecurityAlertType.DevToolsDetected) {
        window.alert("DevTool detected" + dataPatrolSecurityAlertTypeEventArgs.DataPatrolSecurityAlertType);
      } else if (dataPatrolSecurityAlertTypeEventArgs.DataPatrolSecurityAlertType === DataPatrolSecurityAlertType.AdBlockerDetected) {
        window.alert("AdBlocker detected" + dataPatrolSecurityAlertTypeEventArgs.DataPatrolSecurityAlertType);
      }
    });

    try {
      AppComponent.handler = await DataPatrolWebSdk.applyWatermark("https://YourDataPatrolApi.local/int/v1/policy", token, userInfo, appInfo);
    } catch (error) {
      console.error("Catch " + error);
    }
  } else {
    window.alert("SDK not Loaded");
  }
}`
  },
  {
    title: "Remove Watermark on Sign Out",
    code: `// On logout, use the handler to remove watermark
async signout() {
  localStorage.removeItem("userName");

  if (DataPatrolWebSdk) {
    // Use the static handler from AppComponent
    await DataPatrolWebSdk.removeWatermark(AppComponent.handler);
  } else {
    window.alert("SDK not Loaded");
  }

  this.router.navigate(['authentication/login']);
}`
  }
];

const DatapatrolWebmark = () => {
    const [view, setView] = useState("react");
    const [toastVisible, setToastVisible] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const docs = view === "react" ? reactDocs : angularDocs;
    const sdkPlacementInfo = view === "react" ? reactSdkPlacementInfo : angularSdkPlacementInfo;
  
    const overlayImageUrl = view === "react"
    ? "/React_Placement.png"  // React screenshot path
    : "/Angular_Placement.png"; // Angular screenshot path

    const showToast = () => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    };
    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
      };
    
    return (
        <div className="container">
            {showOverlay && (
        <Overlay
          imageUrl={overlayImageUrl}  // Use the dynamic image URL here
          onClose={toggleOverlay}
        />
      )}
        <Toast show={toastVisible} message="Copied to clipboard!" />
      
        <h1 className="main-title">WebMark Integration Guide</h1>
        <div className="logo-container">
        <img src="/DATAPATROL_LOGO.png" alt="Company Logo" className="company-logo" />
        </div>
      
        <a href="/pdfs/WebMark-Integration-guide.pdf" download className="download-btn">
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
        </div>
      
  
        {sdkPlacementInfo}
  
        {docs.map((doc, idx) => (
          <div key={idx} className="doc-section">
            <h2 className="doc-title">{doc.title}</h2>
            <CodeBlock code={doc.code} onCopy={showToast} />
          </div>
        ))}
      </div>
    );
  };

export default DatapatrolWebmark;

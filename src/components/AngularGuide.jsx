import React from "react";
import CodeBlock from "./CodeBlock";

export const angularDocsData = [
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
import {
  DataPatrolAppInfo,
  DataPatrolSecurityAlertType,
  DataPatrolUserInfo
} from 'src/sdk_models';`
  },
  {
    title: "Declare the sdk type",
    code: "declare var DataPatrolWebSdk: any;"
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
  var appInfo: DataPatrolAppInfo = new DataPatrolAppInfo("2299949411", "Customer A Web App", "3.0.0.0");
  var userInfo: DataPatrolUserInfo = new DataPatrolUserInfo(userName);

  if (DataPatrolWebSdk) {
    try {
      AppComponent.handler = await DataPatrolWebSdk.applyWatermark(
        "https://YOURDATAPATROLAPIHERE.dev/int/v1/policy",
        token,
        userInfo,
        appInfo,
        false
      );
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

export const angularSdkPlacementInfo = (
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
      <li>Place sdk_models.js in src/app folder.</li>
    </ul>
  </div>
);

const AngularGuide = ({ onCopy }) => (
  <>
    {angularSdkPlacementInfo}
    {angularDocsData.map((doc, idx) => (
      <div key={idx} className="doc-section">
        <h2 className="doc-title">{doc.title}</h2>
        <CodeBlock code={doc.code} onCopy={onCopy} />
      </div>
    ))}
  </>
);

export default AngularGuide;

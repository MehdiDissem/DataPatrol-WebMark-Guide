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

export const reactDocs = [
  {
    title: "Add SDK Script in index.html",
    code: `<script src="%PUBLIC_URL%/sdk.js"></script>`
  },
  {
    title: "Imports and Setup",
    code: `import { DataPatrolUserInfo, DataPatrolAppInfo, DataPatrolLogInfo, DataPatrolLogLevel, DataPatrolFeatureType, DataPatrolSecurityAlertType } from "./sdk_models";\n\nimport { useCallback } from 'react'`
  },
  {
    title: "Set Up Token and App Info",
    code: `const token = "AD0920E1173E4E2920E111B7B9920E11C4BCD8920E115F8C50";\nconst appInfo = new DataPatrolAppInfo("229994941111", "Customer A Web App", "3.0.0.1");\nlet handler = '';`
  },
  {
    title: "Apply Watermark Example",
    code: `const applyWatermark = useCallback(async (user) => {\n  const userInfo = new DataPatrolUserInfo(user);\n  if (window.DataPatrolWebSdk) {\n    try {\n      handler = await window.DataPatrolWebSdk.applyWatermark(\n        "https://YOURDATAPATROLAPIHERE/int/v1/policy",\n        token,\n        userInfo,\n        appInfo,\n        false\n      );\n    } catch (error) {\n      console.error("Error applying watermark:", error);\n    }\n  } else {\n    console.warn("DataPatrolWebSdk is not loaded.");\n  }\n}, []);`
  },
  {
    title: "Remove Watermark Example",
    code: `const removeWatermark = useCallback(async () => {\n  if (window.DataPatrolWebSdk) {\n    await window.DataPatrolWebSdk.removeWatermark(handler);\n  } else {\n    console.warn("DataPatrolWebSdk is not loaded.");\n  }\n}, []);`
  }
];

export const angularDocs = [
  {
    title: "Add SDK to angular.json",
    code: `"scripts": [\n  "src/assets/WebMark_SDK.js"\n]`
  },
  {
    title: "Import Required Classes",
    code: `import { DataPatrolAppInfo, DataPatrolSecurityAlertType, DataPatrolUserInfo } from 'src/sdk_models';`
  },
  {
    title: "Declare the sdk type",
    code: `declare var DataPatrolWebSdk: any;`
  },
  {
    title: "Declare Handler in AppComponent",
    code: `static handler: string = "";`
  },
  {
    title: "Apply Watermark Function",
    code: `export async function applyWatermarkInternal(userName: string) {\n  var token: string = "AD0920E1173E4E2920E111B7B9920E11C4BCD8920E115F8C50";\n  var appInfo: DataPatrolAppInfo = new DataPatrolAppInfo("2299949411", "Customer A Web App", "3.0.0.0");\n  var userInfo: DataPatrolUserInfo = new DataPatrolUserInfo(userName);\n\n  if (DataPatrolWebSdk) {\n    try {\n      AppComponent.handler = await DataPatrolWebSdk.applyWatermark(\n        "https://YOURDATAPATROLAPIHERE.dev/int/v1/policy",\n        token,\n        userInfo,\n        appInfo,\n        false\n      );\n    } catch (error) {\n      console.error("Catch " + error);\n    }\n  } else {\n    window.alert("SDK not Loaded");\n  }\n}`
  },
  {
    title: "Remove Watermark on Sign Out",
    code: `async signout() {\n  localStorage.removeItem("userName");\n  if (DataPatrolWebSdk) {\n    await DataPatrolWebSdk.removeWatermark(AppComponent.handler);\n  } else {\n    window.alert("SDK not Loaded");\n  }\n  this.router.navigate(['authentication/login']);\n}`
  }
];

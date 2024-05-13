import { userType } from "../constants/staticvariables";

export function CheckWindowHeight(checkUserType) {
  // const excludedRoutePattern = /\/room\/\w+/; // Pattern for excluded route

  const excludedRoutePattern = /\/(room|reg-mentor\/solo-lectures)\/\w+/;
  const currentUrl = window.location.href;
  if (
    window.outerHeight - window.innerHeight > 170 ||
    window.outerWidth - window.innerWidth > 200
  ) {
    if (checkUserType !== undefined) {
      if (
        checkUserType === userType.teacher &&
        excludedRoutePattern.test(currentUrl)
      ) {
        console.log("OK");
      } else {
        console.log(excludedRoutePattern.test(currentUrl));
        showDebuggerMessage();
      }
    }
  }
}

export function detectDevTools(checkUserType) {
  window.onresize = function () {
    CheckWindowHeight(checkUserType);
  };
}

function showDebuggerMessage() {
  document.body.innerHTML =
    "<div style='position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);'><h1>Developer Tools Detected</h1><p>Please close the developer tools to continue.</p></div>";
  document.body.style.backgroundColor = "white";
}

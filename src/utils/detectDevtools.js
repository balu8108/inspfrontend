// const detectDevTools = async () => {
//   const widthThreshold = 160;
//   const heightThreshold = 160;

//   const isWindowTooLarge = () => {
//     return (
//       window.outerWidth - window.innerWidth > widthThreshold ||
//       window.outerHeight - window.innerHeight > heightThreshold
//     );
//   };

//   const isDebuggerActive = () => {
//     return !!(window.chrome && window.chrome.devtools);
//   };

//   const isDebuggerOpen = () => {
//     return isDebuggerActive() || isWindowTooLarge();
//   };

//   if (isDebuggerOpen()) {
//     showDebuggerMessage();
//   }

//   setInterval(() => {
//     if (isDebuggerOpen()) {
//       showDebuggerMessage();
//     }
//   }, 100);

//   function showDebuggerMessage() {
//     document.body.innerHTML =
//       "<div style='position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);'><h1>Developer Tools Detected</h1><p>Please close the developer tools to continue.</p></div>";
//     document.body.style.backgroundColor = "white";
//   }
// };

// detectDevTools();

export default function detectDevTools(checkUserType) {
  const widthThreshold = 160;
  const heightThreshold = 160;
  console.log("user type for dev tools", checkUserType);
  const isWindowTooLarge = () => {
    return (
      window.outerWidth - window.innerWidth > widthThreshold ||
      window.outerHeight - window.innerHeight > heightThreshold
    );
  };

  const isDebuggerActive = () => {
    return !!(window.chrome && window.chrome.devtools);
  };

  const isDebuggerOpen = () => {
    return isDebuggerActive() || isWindowTooLarge();
  };

  const isFullscreenMode = () => {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  };

  const shouldShowDebuggerMessage = () => {
    const currentUrl = window.location.href;
    const excludedRoutePattern = /\/room\/\w+/; // Pattern for excluded route

    return (
      checkUserType === "TEACHER" &&
      !isFullscreenMode() &&
      isDebuggerOpen() &&
      !excludedRoutePattern.test(currentUrl)
    );
  };

  if (checkUserType) {
    // showDebuggerMessage();
    if (shouldShowDebuggerMessage()) {
      showDebuggerMessage();
    }
  }
  console.log("shouldShowDebugger", shouldShowDebuggerMessage());

  // setInterval(() => {
  //   if (shouldShowDebuggerMessage()) {
  //     showDebuggerMessage();
  //   }
  // }, 100);

  function showDebuggerMessage() {
    document.body.innerHTML =
      "<div style='position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);'><h1>Developer Tools Detected</h1><p>Please close the developer tools to continue.</p></div>";
    document.body.style.backgroundColor = "white";
  }
}

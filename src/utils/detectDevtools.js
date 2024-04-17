// Function to detect if the developer tools are open
const detectDevTools = () => {
  const widthThreshold = 160;
  const heightThreshold = 160;

  const isWindowTooLarge = () => {
    return (
      window.outerWidth - window.innerWidth > widthThreshold ||
      window.outerHeight - window.innerHeight > heightThreshold
    );
  };

  const isDebuggerActive = () => {
    if (window.chrome && window.chrome.devtools) {
      return true;
    }
    // Check for Edge devtools
    if (
      window.navigator &&
      window.navigator.userAgent.includes("Edge") &&
      window.navigator.userAgent.includes("Edge DevTools")
    ) {
      return true;
    }
    // Check for other devtools (e.g., Firefox)
    if (
      window.Firebug ||
      window.FirebugLite ||
      (window.console &&
        (window.console.firebug ||
          (window.console.exception && window.console.table)))
    ) {
      return true;
    }
    // Add more specific checks for other browsers if needed
    return false;
  };

  const isDebuggerOpen = () => {
    return isDebuggerActive() || isWindowTooLarge();
  };

  if (isDebuggerOpen()) {
    document.body.innerHTML =
      "<div style='position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);'><h1>Developer Tools Detected</h1><p>Please close the developer tools to continue.</p></div>";
    document.body.style.backgroundColor = "white";
  }

  setInterval(() => {
    if (isDebuggerOpen()) {
      document.body.innerHTML =
        "<div style='position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);'><h1>Developer Tools Detected</h1><p>Please close the developer tools to continue.</p></div>";
      document.body.style.backgroundColor = "white";
    }
  }, 1000);
};

detectDevTools();

export default detectDevTools;

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
    return !!(window.chrome && window.chrome.devtools);
  };

  const isDebuggerOpen = () => {
    return isDebuggerActive() || isWindowTooLarge();
  };

  const isTabSharingMode = () => {
    return navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
  };

  if (!isTabSharingMode() && isDebuggerOpen()) {
    document.body.innerHTML =
      "<div style='position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);'><h1>Developer Tools Detected</h1><p>Please close the developer tools to continue.</p></div>";
    document.body.style.backgroundColor = "white";
  }

  setInterval(() => {
    if (!isTabSharingMode() && isDebuggerOpen()) {
      document.body.innerHTML =
        "<div style='position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);'><h1>Developer Tools Detected</h1><p>Please close the developer tools to continue.</p></div>";
      document.body.style.backgroundColor = "white";
    }
  }, 100); 
};

detectDevTools();

export default detectDevTools;

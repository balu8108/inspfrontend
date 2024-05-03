const detectSharedScreenStream = () => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const screenDevices = devices.filter(
          (device) =>
            device.kind === "videoinput" && device.label.includes("screen")
        );
        resolve(screenDevices.length > 0);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const detectDevTools = async () => {
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

  const isScreenStreamActive = await detectSharedScreenStream();

  if (isDebuggerOpen() && !isScreenStreamActive) {
    showDebuggerMessage();
  }

  setInterval(async () => {
    const isScreenStreamActive = await detectSharedScreenStream();

    if (isDebuggerOpen() && !isScreenStreamActive) {
      showDebuggerMessage();
    }
  }, 100);

  function showDebuggerMessage() {
    document.body.innerHTML =
      "<div style='position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);'><h1>Developer Tools Detected</h1><p>Please close the developer tools to continue.</p></div>";
    document.body.style.backgroundColor = "white";
  }
};

detectDevTools();

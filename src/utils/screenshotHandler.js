const screenshotHandler = (screenShareStream) => {
  return new Promise((resolve, reject) => {
    if (screenShareStream) {
      const videoTrack = screenShareStream.getVideoTracks()[0];

      let videoElement = document.createElement("video");
      videoElement.srcObject = new MediaStream([videoTrack]);

      videoElement.addEventListener("loadedmetadata", async () => {
        let canvas = document.createElement("canvas");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        let base64Image = canvas.toDataURL("image/jpeg");
        if (base64Image) {
          fetch(base64Image)
            .then((res) => res.blob())
            .then((blob) => {
              const screenShotFile = new File([blob], "Screenshot.jpeg", {
                type: "image/jpeg",
              });
              resolve(screenShotFile); // Resolve with the screenshot file
            })
            .catch((error) => {
              reject(error); // Reject the Promise if there's an error
            });
        } else {
          reject(new Error("Failed to capture screenshot."));
        }
      });

      videoElement.play();
    } else {
      reject(new Error("No screen share stream available."));
    }
  });
};

export default screenshotHandler;

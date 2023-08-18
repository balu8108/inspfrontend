const openFileDialog = () => {
  return new Promise((resolve, reject) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "*/*";
    fileInput.multiple = true;
    fileInput.addEventListener("change", (event) => {
      const files = event.target.files;
      if (files.length > 0) {
        resolve(files); // Resolve with an array of selected files
      } else {
        reject(new Error("No files selected"));
      }
    });
    fileInput.click();
  });
};
export default openFileDialog;

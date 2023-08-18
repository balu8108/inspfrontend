const downloadFile = (file) => {
  const fileUrl = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.href = fileUrl;
  anchor.download = file.name;

  document.body.appendChild(anchor);
  anchor.click();

  document.body.removeChild(anchor);
  URL.revokeObjectURL(fileUrl);
};

export default downloadFile;

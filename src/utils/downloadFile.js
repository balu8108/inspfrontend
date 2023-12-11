const downloadFile = (item) => {
  console.log("hello item", item);
  if (!item) {
    return;
  }
  const fileUrl = item?.url;
  const anchor = document.createElement("a");
  anchor.href = fileUrl;
  anchor.download = "Download";
  anchor.target = "_blank";

  document.body.appendChild(anchor);
  anchor.click();

  document.body.removeChild(anchor);
  URL.revokeObjectURL(fileUrl);
};

export default downloadFile;

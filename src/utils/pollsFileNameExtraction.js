export const pollsFileNameExtraction = (s3FileKey) => {
  if (s3FileKey) {
    const parts = s3FileKey.split("/");
    const fileName = parts.pop();
    const fileNameParts = fileName.split(".");

    if (fileNameParts.length > 1) {
      const beforeSlash = parts[0];
      const afterDot = fileNameParts.slice(1).join(".");
      return `${beforeSlash}.${afterDot}`;
    }
  }
  return "";
};

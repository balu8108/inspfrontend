export const extractFileNameFromS3URL = (s3Url) => {
  if (s3Url) {
    return s3Url.split("/").pop();
  }
  return "";
};

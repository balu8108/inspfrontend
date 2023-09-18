export const extractFileNameFromS3URL = (s3FileKey) => {
  if (s3FileKey) {
    return s3FileKey.split("/").pop();
  }
  return "";
};

import getStorageType from "./getStorageType";

const clearStorageData = async () => {
  const dataStorageType = getStorageType();
  if (dataStorageType) {
    dataStorageType.clear();
  }
};
export default clearStorageData;

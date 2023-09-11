const { decryptData } = require("./crypticFunctions");
const { default: getStorageType } = require("./getStorageType");

const getStorageData = (key) => {
  try {
    const storageType = getStorageType();
    const storageItem = storageType.getItem(key);
    const decryptedStorageData = decryptData(storageItem);
    if (decryptedStorageData) {
      return { status: true, data: decryptedStorageData };
    } else {
      return { status: false, data: null };
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = getStorageData;

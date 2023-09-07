const { default: getStorageType } = require("./getStorageType");

const getStorageData = (key) => {
  return new Promise((resolve, reject) => {
    const storageType = getStorageType();
    const storageItem = JSON.parse(storageType.getItem(key));
    if (storageItem) {
      resolve({ status: true, data: storageItem });
    } else {
      reject({ status: false, data: null });
    }
  });
};

module.exports = getStorageData;

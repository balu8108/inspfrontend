const { default: getStorageType } = require("./getStorageType");

const getStorageData = (key) => {
  const storageType = getStorageType();
  const storageItem = JSON.parse(storageType.getItem(key));
  if (storageItem) {
    return { status: true, data: storageItem };
  } else {
    return { status: false, data: null };
  }
};

module.exports = getStorageData;

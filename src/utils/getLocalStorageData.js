const getLocalStorageData = (key) => {
  return new Promise((resolve, reject) => {
    const localStorageItem = JSON.parse(localStorage.getItem(key));
    if (localStorageItem) {
      resolve({ status: true, data: localStorageItem });
    } else {
      reject({ status: false, data: null });
    }
  });
};

module.exports = getLocalStorageData;

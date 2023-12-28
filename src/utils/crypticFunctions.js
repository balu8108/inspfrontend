import CryptoJS from "crypto-js";

const ENC_KEY = process.env.REACT_APP_ENC_KEY;
console.log("enc key", ENC_KEY);
const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENC_KEY);
    const originalData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalData);
  } catch (err) {
    console.log(err);
    return null;
  }
};
export { decryptData };

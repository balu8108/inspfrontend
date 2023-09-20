const generateUniqueKey = () => {
  let length = 10;

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomCharacters = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCharacters += characters.charAt(randomIndex);
  }

  return randomCharacters;
};
export default generateUniqueKey;

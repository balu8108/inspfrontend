function secureRandomIndex(characters) {
  // Create an ArrayBuffer to hold random bytes
  const randomBytes = new Uint32Array(1);

  // Fill the buffer with cryptographically secure random values
  crypto.getRandomValues(randomBytes);

  // Calculate the random index within the length of the characters array
  const randomIndex = randomBytes[0] % characters.length;

  return randomIndex;
}

const generateUniqueKey = () => {
  let length = 10;

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomCharacters = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = secureRandomIndex(characters);
    randomCharacters += characters.charAt(randomIndex);
  }

  return randomCharacters;
};
export default generateUniqueKey;

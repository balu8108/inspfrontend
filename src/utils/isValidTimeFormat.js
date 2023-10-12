const isValidTimeFormat = (inputString) => {
  // Define a regular expression pattern for the desired format
  let pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

  // Use the test method of the regular expression to check if the input matches the pattern
  return pattern.test(inputString);
};

export default isValidTimeFormat;

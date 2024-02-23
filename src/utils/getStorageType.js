const getStorageType = () => {
  // set session storage if local env as it is required to test multiple peers in live class room with different logins
  // else set local storage for prod/dev as we want a single sign in person throughout different tabs etc
  // return process.env.REACT_APP_ENVIRON === "local"
  //   ? sessionStorage
  //   : localStorage;
  return sessionStorage;
};

export default getStorageType;

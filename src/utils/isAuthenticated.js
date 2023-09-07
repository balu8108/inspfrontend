import { authStorageKey } from "../constants/staticvariables";
import getStorageType from "./getStorageType";

const isAuthenticated = () => {
  // Here we will check both
  // user data and secret_token
  // If both present then we can assume that user is authenticated else if any of the thing is not present then we can assume that user is not authenticated

  // Session storage is checked in case of local as we need to test different user in different tabs to log in into the room
  // local storage checks in case of production/dev

  const tokenStorage = getStorageType();

  const insp_user_profile = tokenStorage.getItem(
    authStorageKey.insp_user_profile
  );
  const secret_token = tokenStorage.getItem(authStorageKey.secret_token);

  return insp_user_profile && secret_token;
};

export default isAuthenticated;

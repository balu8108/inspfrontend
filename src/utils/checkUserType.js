import { userType } from "../constants/staticvariables";
import getStorageData from "./getStorageData";
const checkUserType = () => {
  try {
    const { data: userProfile } = getStorageData("insp_user_profile");
    console.log(userProfile);
    if (userProfile) {
      if (userProfile.user_type === 1) {
        return userType.teacher;
      } else {
        return userType.student;
      }
    }
  } catch (err) {
    return null;
  }
};

export default checkUserType;

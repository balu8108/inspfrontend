import { userType } from "../constants/staticvariables";
const checkUserType = (userProfile) => {
  try {
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

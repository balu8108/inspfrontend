import React from "react";
import { useSelector } from "react-redux";
import { checkUserType } from "../../../utils";
import { userType } from "../../../constants/staticvariables";
import MentorHomePage from "../../Mentors/MentorsHomePage/screen/MentorHomePage";
import StudentHomePage from "../../StudentHomePage/screens/StudentHomePage";

const HomePage = () => {
  const { userProfile } = useSelector((state) => state.auth);
  const userRoleType = checkUserType(userProfile);

  if (userRoleType === userType.teacher) {
    return <MentorHomePage />;
  } else {
    return <StudentHomePage />;
  }
};

export default HomePage;

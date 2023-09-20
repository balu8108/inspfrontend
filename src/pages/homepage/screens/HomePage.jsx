import React from "react";
import { checkUserType } from "../../../utils";
import { userType } from "../../../constants/staticvariables";
import MentorHomePage from "../../Mentors/MentorsHomePage/screen/MentorHomePage";
import StudentHomePage from "../../StudentHomePage/screens/StudentHomePage";

const HomePage = () => {
  const userRoleType = checkUserType();

  if (userRoleType === userType.teacher) {
    return <MentorHomePage />;
  } else {
    return <StudentHomePage />;
  }
};

export default HomePage;

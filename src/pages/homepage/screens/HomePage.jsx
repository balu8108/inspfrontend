import React from "react";
import { useSelector } from "react-redux";
import { checkUserType } from "../../../utils";
import { userType } from "../../../constants/staticvariables";
import MentorHomePage from "../../Mentors/MentorsHomePage/screen/MentorHomePage";
import StudentHomePage from "../../StudentHomePage/screens/StudentHomePage";
import Header from "../../Mentors/Header/components/HeaderInAllScreen";

const HomePage = () => {
  const { userProfile } = useSelector((state) => state.auth);
  const userRoleType = checkUserType(userProfile);
  return (
    <>
      <Header />
      {userRoleType === userType.teacher ? (
        <MentorHomePage />
      ) : (
        <StudentHomePage />
      )}
    </>
  );
};

export default HomePage;

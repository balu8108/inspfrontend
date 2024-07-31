import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import UAParser from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";
import { checkUserType } from "../../../utils";
import { userType } from "../../../constants/staticvariables";
import MentorHomePage from "../../Mentors/MentorsHomePage/screen/MentorHomePage";
import StudentHomePage from "../../StudentHomePage/screens/StudentHomePage";
import Header from "../../Mentors/Header/components/HeaderInAllScreen";
import { createMauReport } from "../../../api/genericapis";

const getDeviceInfo = () => {
  const parser = new UAParser();
  const result = parser.getResult();
  const deviceInfo = {
    os: result.os.name,
    browser: result.browser.name,
  };
  return deviceInfo;
};

const HomePage = () => {
  const { userProfile } = useSelector((state) => state.auth);
  const userRoleType = checkUserType(userProfile);
  const LocalStoreData = localStorage.getItem("mau-tracker");
  useEffect(() => {
    async function createMauReportApi() {
      const uniqueId = uuidv4();
      try {
        const info = getDeviceInfo();
        const data = {
          studentId: userProfile.id,
          studentName: userProfile.name,
          deviceId: uniqueId,
          deviceName: info.os,
          browserName: info.browser,
        };
        const res = await createMauReport(data);
        if (res.status === 200) {
          localStorage.setItem("mau-tracker", uniqueId);
        }
      } catch (error) {
        console.error("Error fetching topics data:", error);
      }
    }
    if (!LocalStoreData) {
      createMauReportApi();
    }
  }, []);
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

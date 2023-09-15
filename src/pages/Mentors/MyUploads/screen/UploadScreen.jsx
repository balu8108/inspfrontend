import { Flex } from "@chakra-ui/react";
import AllUploadedLecture from "../components/Uploads";
import SchedulingClass from "../../SchedulingClass/components/MentorSchedule";
const MentorAllUploadedLectures = () => {
  return (
    <Flex my={"30px"} mx={"45px"}>
      <AllUploadedLecture />
      <SchedulingClass />
    </Flex>
  );
};
export default MentorAllUploadedLectures;

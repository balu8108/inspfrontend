import { Flex, VStack } from "@chakra-ui/react";
import Header from "../../MyCourses/components/Header";
import ScheduledMeeting from "../../MeetingViewer/components/ScheduledMeetings";
import UploadAssignment from "../components/DetailsAssignmentUpload";
const ViewAssignment = () => {
  return (
    <Flex m={"52px"}>
      <VStack spacing={"22px"}>
        <Header />
        <UploadAssignment />
      </VStack>
      <ScheduledMeeting />
    </Flex>
  );
};
export default ViewAssignment;

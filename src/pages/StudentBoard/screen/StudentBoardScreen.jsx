import { Flex, VStack } from "@chakra-ui/react";
import LeaderBoardHeader from "../components/BoardHeader";
import LeaderBoard from "../components/LeaderBoard";
import ScheduledMeeting from "../../MeetingViewer/components/ScheduledMeetings";
const studentBoardScreen = () => {
  return (
    <Flex m={"52px"} justifyContent={"space-between"}>
      <VStack spacing={"22px"} w="full">
        <LeaderBoardHeader />
        <LeaderBoard />
      </VStack>
      <ScheduledMeeting />
    </Flex>
  );
};
export default studentBoardScreen;

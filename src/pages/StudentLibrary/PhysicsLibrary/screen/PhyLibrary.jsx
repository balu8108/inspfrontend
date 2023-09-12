import { Box, Flex, VStack } from "@chakra-ui/react";
import ScheduledMeetings from "../../../MeetingViewer/components/ScheduledMeetings";
import Header from "../../../MyCourses/components/Header";
import PhysicsVideos from "../components/PhysicsVideos";
const PhyScreen = () => {
  return (
    <Box ml={"52px"} mr={"52px"} mt={"52px"} mb={10}>
      <Flex>
        <VStack spacing={6}>
          <Header />
          <PhysicsVideos />
        </VStack>
        <ScheduledMeetings />
      </Flex>
    </Box>
  );
};
export default PhyScreen;

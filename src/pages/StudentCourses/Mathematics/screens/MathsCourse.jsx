import React from "react";
import Header from "../../../MyCourses/components/Header";
import Details from "../components/Detailing";
import ScheduledMeetings from "../../../MeetingViewer/components/ScheduledMeetings";
import { Flex, VStack, Box } from "@chakra-ui/react";
const MathsScreen = () => {
  return (
    <Box ml={"52px"} mr={"52px"} mt={"52px"} mb={10}>
      <Flex>
        <VStack spacing={6}>
          <Header />
          <Details />
        </VStack>
        <ScheduledMeetings />
      </Flex>
    </Box>
  );
};
export default MathsScreen;

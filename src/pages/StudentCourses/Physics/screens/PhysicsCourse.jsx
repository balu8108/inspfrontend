import React from "react";
import PhysDetails from "../components/PhysDetails";
import Header from "../../../MyCourses/components/Header"
import ScheduledMeetings from "../../../MeetingViewer/components/ScheduledMeetings";
import { Flex, VStack, Box } from "@chakra-ui/react";
const PhyScreen = () => {
  return (
    <Box ml={"52px"} mr={"52px"} mt={"52px"} mb={10}>
      <Flex>
        <VStack spacing={6}>
          <Header />
          <PhysDetails />
        </VStack>
        <ScheduledMeetings />
      </Flex>
    </Box>
  );
};
export default PhyScreen;

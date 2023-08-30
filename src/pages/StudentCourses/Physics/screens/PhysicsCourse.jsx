import React from "react";
import PhysHeader from "../components/PhysHeader";
import PhysDetails from "../components/PhysDetails";
import ScheduledMeetings from "../../../MeetingViewer/components/ScheduledMeetings";
import { Flex, VStack, Box } from "@chakra-ui/react";
const phyScreen = () => {
  return (
    <Box ml={"52px"} mr={"52px"} mt={"52px"} mb={10}>
      <Flex>
        <VStack spacing={6}>
          <PhysHeader />
          <PhysDetails />
        </VStack>
        <ScheduledMeetings />
      </Flex>
    </Box>
  );
};
export default phyScreen;

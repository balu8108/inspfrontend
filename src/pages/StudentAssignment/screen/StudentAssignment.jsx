import React from "react";
import Header from "../../MyCourses/components/Header";
import Assignment from "../components/Assignment";
import ScheduledMeetings from "../../MeetingViewer/components/ScheduledMeetings";
import { Flex, VStack, Box } from "@chakra-ui/react";
const AssignmentScreen = () => {
  return (
    <Box ml={"52px"} mr={"52px"} mt={"52px"} mb={10}>
      <Flex>
        <VStack spacing={6}>
          <Header />
          <Assignment />
        </VStack>
        <ScheduledMeetings />
      </Flex>
    </Box>
  );
};
export default AssignmentScreen;

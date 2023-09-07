import React from "react";
import Header from "../../../MyCourses/components/Header";
import ChemDetails from "../components/ChemiDetails";
import ScheduledMeetings from "../../../MeetingViewer/components/ScheduledMeetings";
import { Flex, VStack, Box } from "@chakra-ui/react";
const ChemScreen = () => {
  return (
    <Box ml={"52px"} mr={"52px"} mt={"52px"} mb={10}>
      <Flex>
        <VStack spacing={6}>
          <Header />
          <ChemDetails />
        </VStack>
        <ScheduledMeetings />
      </Flex>
    </Box>
  );
};
export default ChemScreen;

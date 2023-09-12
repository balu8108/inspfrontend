import React from "react";
import ViewChapterRecording from "../components/ViewChapterRecordings/ViewChapterRecording";
import ScheduledMeetings from "../../../MeetingViewer/components/ScheduledMeetings";
import Details from "../components/ViewChapterRecordings/Details";
import { Flex, VStack, Box } from "@chakra-ui/react";
const PhyScreen = () => {
  return (
    <Box m={"52px"}>
      <Flex>
        <VStack overflowX="auto">
          <ViewChapterRecording />
          <Details />
        </VStack>
        <ScheduledMeetings />
      </Flex>
    </Box>
  );
};
export default PhyScreen;

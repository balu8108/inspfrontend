import React from "react";
import ChemHeader from "../components/ChemHeader";
import ChemDetails from "../components/ChemiDetails";
import ScheduledMeetings from "../../../MeetingViewer/components/ScheduledMeetings";
import { Flex, VStack, Box } from "@chakra-ui/react";
const chemScreen = () => {
  return (
    <Box ml={"52px"} mr={"52px"} mt={"52px"} mb={10}>
      <Flex>
        <VStack spacing={6}>
          <ChemHeader />
          <ChemDetails />
        </VStack>
        <ScheduledMeetings />
      </Flex>
    </Box>
  );
};
export default chemScreen;

import React from "react";
import Header from "../components/Header";
import Details from "../components/Detailing";
import Scheduling from "../components/Scheduling";
import ScheduledMeetings from "../../../MeetingViewer/components/ScheduledMeetings";
import { Flex, VStack, Box } from "@chakra-ui/react";
const mathsScreen = () => {
  return (
    <Box  ml={"52px"} mr={"52px"} mt={"52px"} mb={10}>
        <Flex >
      <VStack spacing={6}>
        <Header />
        <Details />
      </VStack>
      <ScheduledMeetings/>
    </Flex>
    </Box>
    
  );
};
export default mathsScreen;

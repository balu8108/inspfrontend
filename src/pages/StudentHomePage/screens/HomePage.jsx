import React from "react";
import {
  Box,
  Flex,
  HStack,
  VStack
} from "@chakra-ui/react";
import MyCourses from "../components/MyCourses";
import Improvement from "../components/Improvement";
import Assignment from "../components/Assignment";
import Library from "../components/Library";
import ScheduledMeetings from "../../MeetingViewer/components/ScheduledMeetings";
const HomePage = () => {
  return (
    <Box  ml={"52px"} mr={"52px"} mt={"52px"} mb={10}>
        <Flex >
        <Box>
          <MyCourses/>
          <HStack>
            <Improvement/>
            <Assignment />
          </HStack>
        </Box>
      <ScheduledMeetings/>
    </Flex>
    </Box>
  );
};
export default HomePage;

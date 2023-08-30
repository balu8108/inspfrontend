import React from "react";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import MyCourses from "../components/MyCourses";
import Improvement from "../components/Improvement";
import Assignment from "../components/Assignment";
import Library from "../components/Library";
import ScheduledMeetings from "../../MeetingViewer/components/ScheduledMeetings";
const HomePage = () => {
  return (
    <Box m={"52px"}>
      <Flex>
        <Box>
          <MyCourses />
          <Flex>
            <VStack>
              <HStack>
                <Improvement />
                <Assignment />
              </HStack>
              <Library />
            </VStack>
          </Flex>
        </Box>
        <ScheduledMeetings></ScheduledMeetings>
      </Flex>
    </Box>
  );
};
export default HomePage;

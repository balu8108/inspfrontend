import React from "react";
import { Box, Flex, HStack, useDisclosure } from "@chakra-ui/react";

import Header from "../../Mentors/Header/components/HeaderInAllScreen";
import Improvement from "../components/Improvement";
import Assignment from "../components/Assignment";
import Library from "../components/Library";
import ScheduleClassList from "../../ScheduleClasses/components/ScheduleClassList";

const StudentHomePage = () => {
  const { onOpen: onSchedulePopupOpen } = useDisclosure();
  return (
    <Flex m={"52px"}>
      <Box w="75%">
        <Header />
        <HStack spacing={"24px"}>
          <Improvement />
          <Assignment />
        </HStack>
        <Box mt={"24px"}>
          <Library />
        </Box>
      </Box>
      <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
    </Flex>
  );
};
export default StudentHomePage;

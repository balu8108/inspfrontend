import React from "react";

import { Box, Flex, HStack, useDisclosure, useTheme } from "@chakra-ui/react";

import Header from "../../Mentors/Header/components/HeaderInAllScreen";
import Improvement from "../components/Improvement";
import Assignment from "../components/Assignment";
import Library from "../components/Library";
import ScheduleClassList from "../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";

const StudentHomePage = () => {
  const { outerBackground } = useTheme().colors.pallete;

  const { onOpen: onSchedulePopupOpen } = useDisclosure();
  return (
    <Flex m={"52px"} justifyContent={"space-between"} gap={6}>
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
      <Box w={"25%"}>
        <SimpleBar
          style={{
            maxHeight: "85vh",
            borderRadius: "10px",
            background: outerBackground,
          }}
        >
          <Box p={4}>
            <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
          </Box>
        </SimpleBar>
      </Box>
    </Flex>
  );
};
export default StudentHomePage;

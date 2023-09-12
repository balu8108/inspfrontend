import React from "react";
import { Box, Flex, HStack } from "@chakra-ui/react";
import MyCourses from "../../MyCourses/components/Header";
import Improvement from "../components/Improvement";
import Assignment from "../components/Assignment";
import Library from "../components/Library";
import StudentHomePageRightSection from "../components/StudentHomeRight";
const HomePage = () => {
  return (
    <Flex m={"52px"} justifyContent={"space-between"}>
      <Box>
        <MyCourses />
        <HStack spacing={"24px"}>
          <Improvement />
          <Assignment />
        </HStack>
        <Library />
      </Box>
      <Box>
        <StudentHomePageRightSection />
      </Box>
    </Flex>
  );
};
export default HomePage;

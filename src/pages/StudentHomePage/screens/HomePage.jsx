import React from "react";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import MyCourses from "../components/MyCourses";
import Improvement from "../components/Improvement";
import Assignment from "../components/Assignment";
import Library from "../components/Library";
import StudentHomePageRightSection from "../components/StudentHomeRight";
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
        <StudentHomePageRightSection />
      </Flex>
    </Box>
  );
};
export default HomePage;

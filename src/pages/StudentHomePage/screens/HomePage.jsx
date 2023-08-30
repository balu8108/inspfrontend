import React from "react";
import { Box, Flex,HStack, VStack,Grid,GridItem } from "@chakra-ui/react";
import MyCourses from "../components/MyCourses";
import Improvement from "../components/Improvement";
import Assignment from "../components/Assignment";
import Library from "../components/Library";
import StudentHomePageRightSection from "../components/StudentHomeRight";
const HomePage = () => {
  return (
<Flex m={"52px"}>
  <Box >
    <MyCourses />
    <HStack>
    <Improvement />
    <Assignment />
    </HStack>
    
    <Library />
  </Box>
  <Box >
    <StudentHomePageRightSection/>
  </Box>
</Flex>


  
  );
};
export default HomePage;

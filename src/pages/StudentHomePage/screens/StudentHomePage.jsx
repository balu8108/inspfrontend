import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import Improvement from "../components/Improvement";
import Assignment from "../components/Assignment";
import Library from "../components/Library";

const StudentHomePage = () => {
  return (
    <>
      <HStack spacing={"24px"}>
        <Improvement />
        <Assignment />
      </HStack>
      <Box mt={"24px"}>
        <Library />
      </Box>
    </>
  );
};
export default StudentHomePage;

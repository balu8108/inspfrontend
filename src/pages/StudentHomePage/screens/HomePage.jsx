import React from "react";
import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import MyCourses from "../components/MyCourses";
import Improvement from "../components/Improvement";
import Assignment from "../components/Assignment";
import Library from "../components/Library";
import MeetingAndRecordedLect from "../components/MeetingAndRecordedLect";
const HomePage = () => {
  return (
    <Box>
      <MyCourses />
      <Improvement />
      <Assignment />
      <Library />
      <MeetingAndRecordedLect />
    </Box>
  );
};
export default HomePage;

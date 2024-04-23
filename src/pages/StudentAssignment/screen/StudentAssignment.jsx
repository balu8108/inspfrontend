import React from "react";
import { Stack } from "@chakra-ui/react";
import AssignmentHeader from "../components/AssignmentHeader";
import AssignmentDetails from "../components/Assignment";
const AssignmentScreen = () => {
  return (
    <Stack spacing={4}>
      <AssignmentHeader />
      <AssignmentDetails />
    </Stack>
  );
};
export default AssignmentScreen;

import React from "react";
import AssignmentHeader from "../components/AssignmentHeader";
import AssignmentDetails from "../components/Assignment";
import { Flex, Stack, useDisclosure } from "@chakra-ui/react";
import ScheduleClassList from "../../ScheduleClasses/components/ScheduleClassList";
const AssignmentScreen = () => {
  const { onOpen: onSchedulePopupOpen } = useDisclosure();
  return (
    <Flex m={"52px"}>
      <Stack w={"75%"} spacing={"24px"}>
        <AssignmentHeader />
        <AssignmentDetails />
      </Stack>
      <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
    </Flex>
  );
};
export default AssignmentScreen;

import React, { useEffect } from "react";
import AssignmentHeader from "../components/AssignmentHeader";
import Assignment from "../components/Assignment";
import { Flex, VStack, Box, useDisclosure } from "@chakra-ui/react";
import ScheduleClassList from "../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { boxShadowStyles } from "../../../utils";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../store/actions/scheduleClassActions";
const AssignmentScreen = () => {
  const dispatch = useDispatch();
  const { onOpen: onSchedulePopupOpen } = useDisclosure();
  useEffect(() => {
    dispatch(getAllLiveClassesSchedule());
  }, [dispatch]);
  return (
    <Box ml={"52px"} mr={"52px"} mt={"52px"} mb={10}>
      <Flex gap={"24px"}>
        <VStack spacing={6}>
          <AssignmentHeader />
          <Assignment />
        </VStack>
        <Box w={"25%"}>
          <SimpleBar
            style={{
              maxHeight: "85vh",
              borderRadius: "10px",
              boxShadow: boxShadowStyles.shadowOneStyle.boxShadow,
            }}
          >
            <Box p={4}>
              <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
            </Box>
          </SimpleBar>
        </Box>
      </Flex>
    </Box>
  );
};
export default AssignmentScreen;

import React, { useEffect } from "react";
import AssignmentHeader from "../components/AssignmentHeader";
import AssignmentDetails from "../components/Assignment";
import { Flex, Stack, Box, useDisclosure, useTheme } from "@chakra-ui/react";
import ScheduleClassList from "../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { boxShadowStyles } from "../../../utils";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../store/actions/scheduleClassActions";
const AssignmentScreen = () => {
  const dispatch = useDispatch();
  const { onOpen: onSchedulePopupOpen } = useDisclosure();
  const { outerBackground } = useTheme().colors.pallete;
  useEffect(() => {
    dispatch(getAllLiveClassesSchedule());
  }, [dispatch]);
  return (
    <Box ml={"52px"} mr={"52px"} mt={"52px"} mb={10}>
      <Flex gap={"24px"}>
        <Stack spacing={6} w={"full"}>
          <AssignmentHeader />
          <AssignmentDetails />
        </Stack>
        <Box w={"32%"}>
          <SimpleBar
            style={{
              maxHeight: "85vh",
              borderRadius: "10px",
              background: outerBackground,
              // boxShadow: boxShadowStyles.mainBoxShadow.boxShadow,
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

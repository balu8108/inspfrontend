import React, { useEffect } from "react";
import { Box, Flex, HStack, useDisclosure, Grid } from "@chakra-ui/react";
import MyCourses from "../../MyCourses/components/Header";
import Improvement from "../components/Improvement";
import Assignment from "../components/Assignment";
import Library from "../components/Library";
import StudentHomePageRightSection from "../components/StudentHomeRight";
import ScheduleClassList from "../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { boxShadowStyles } from "../../../utils";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../store/actions/scheduleClassActions";
const StudentHomePage = () => {
  const dispatch = useDispatch();

  const { onOpen: onSchedulePopupOpen } = useDisclosure();

  useEffect(() => {
    dispatch(getAllLiveClassesSchedule());
  }, [dispatch]);
  return (
    <>
      <Flex m={"52px"} justifyContent={"space-between"} gap={6}>
        <Box w="80%">
          <MyCourses />
          <HStack spacing={"24px"}>
            <Improvement />
            <Assignment />
          </HStack>
          <Library />
        </Box>
        <Box w="20%">
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
          {/* <StudentHomePageRightSection /> */}
        </Box>
      </Flex>
    </>
  );
};
export default StudentHomePage;

import React, { useEffect } from "react";
import Header from "../../../MyCourses/components/Header";
import Details from "../components/Detailing";
import ScheduledMeetings from "../../../MeetingViewer/components/ScheduledMeetings";
import { Flex, Stack, Box, useDisclosure } from "@chakra-ui/react";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { boxShadowStyles } from "../../../../utils";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../../store/actions/scheduleClassActions";
const MathsScreen = () => {
  const dispatch = useDispatch();
  const { onOpen: onSchedulePopupOpen } = useDisclosure();
  useEffect(() => {
    dispatch(getAllLiveClassesSchedule());
  }, [dispatch]);
  return (
   
      <Flex gap={"24px"} m={"52px"}>
        <Stack spacing={6} w={"full"}>
          <Header />
          <Details />
        </Stack>
        <Box w={"30%"}>
          <SimpleBar
            style={{
              // maxHeight: "85vh",  initial code by amit
              maxHeight: "200vh",
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
   
  );
};
export default MathsScreen;

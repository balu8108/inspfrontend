import React, { useEffect } from "react";
import ViewChapterRecording from "../components/ViewChapterRecordings/ViewChapterRecording";
import ScheduledMeetings from "../../../MeetingViewer/components/ScheduledMeetings";
import Details from "../components/ViewChapterRecordings/Details";
import { Flex, VStack, Box, useDisclosure } from "@chakra-ui/react";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { boxShadowStyles } from "../../../../utils";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../../store/actions/scheduleClassActions";
const PhyScreen = () => {
  const dispatch = useDispatch();
  const { onOpen: onSchedulePopupOpen } = useDisclosure();
  useEffect(() => {
    dispatch(getAllLiveClassesSchedule());
  }, [dispatch]);
  return (
    <Box m={"52px"}>
      <Flex gap={"24px"}>
        <VStack overflowX="auto">
          <ViewChapterRecording />
          <Details />
        </VStack>
        <Box w={"75%"}>
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
export default PhyScreen;

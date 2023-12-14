import React, { useEffect, useState } from "react";
import { Box, Stack, Flex, useDisclosure, useTheme } from "@chakra-ui/react";
import TopicsBased from "../components/TopicBased";
import DetailsCoveredFiles from "../components/DetailsCoveredFiles";
import ScheduleClassList from "../../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../../../store/actions/scheduleClassActions";
import ScheduleClassPopup from "../../../../../components/popups/ScheduleClassPopup";
const SoloRecordedTopicsDetails = () => {
  const dispatch = useDispatch();
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();

  const { outerBackground } = useTheme().colors.pallete;
  const [selectedDate, setSelectedDate] = useState("");

  const [classTiming, setClassTiming] = useState(["--:--", "--:--"]);

  useEffect(() => {
    dispatch(getAllLiveClassesSchedule());
  }, [dispatch]);
  return (
    <Box m={"52px"} >
      {isSchedulePopupOpen && (
        <ScheduleClassPopup
          isOpen={isSchedulePopupOpen}
          onClose={onScheduleClosePopupOpen}
          selectedDate={selectedDate}
          classTiming={classTiming}
          setSelectedDate={setSelectedDate}
          setClassTiming={setClassTiming}
        />
      )}
      <Flex gap={"24px"}>
        <Stack w={"73%"} spacing={"24px"} >
          <TopicsBased />
          <DetailsCoveredFiles />
        </Stack>

        <Box w={"25%"}>
          <SimpleBar
            style={{
              maxHeight: "85vh",
              borderRadius: "26px",
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
export default SoloRecordedTopicsDetails;

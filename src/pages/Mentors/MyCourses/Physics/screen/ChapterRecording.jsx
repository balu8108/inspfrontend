import React, { useEffect, useState } from "react";
import { Box, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import ViewAllRecordingsRelatedToOneChapter from "../components/RecOfChapter/RecordingRelatedToChapter";
import ChapterDetailsAndCoveredPart from "../components/RecOfChapter/DetailsAndCovered";
import MentorSchedulingClass from "../../../SchedulingClass/components/MentorSchedule";
import ScheduleClassList from "../../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { boxShadowStyles } from "../../../../../utils";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../../../store/actions/scheduleClassActions";
import ScheduleClassPopup from "../../../../../components/popups/ScheduleClassPopup";
const ChapterRecordings = () => {
  const [viewTopic,setViewTopic] = useState(null);
  const dispatch = useDispatch();
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();

  const [selectedDate, setSelectedDate] = useState(""); // if clicked from calendar
  const [classTiming, setClassTiming] = useState(["--:--", "--:--"]);
  useEffect(() => {
    dispatch(getAllLiveClassesSchedule());
  }, [dispatch]);
  return (
    <>
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
      <Flex m={"45px"}>
        <Stack spacing={"24px"} w={"73%"}>
          <ViewAllRecordingsRelatedToOneChapter setViewTopic={setViewTopic} />
          <ChapterDetailsAndCoveredPart  viewTopic={viewTopic}  />
        </Stack>
        <Box ml={"24px"} mt={"20px"} w={"25%"}>
          <SimpleBar
            style={{
              maxHeight: "85vh",
              borderRadius: "26px",
              bg: "#F1F5F8",
              backgroundBlendMode: "multiply",
              boxShadow: boxShadowStyles.shadowOneStyle.boxShadow,
            }}
          >
            <Box p={4}>
              <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
            </Box>
          </SimpleBar>
        </Box>
      </Flex>
    </>
  );
};
export default ChapterRecordings;

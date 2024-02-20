import React, { useState, useEffect } from "react";
import SingleLectureDetailsCovered from "../components/Single.Lecture.Details.Covered";
import { Flex, Stack, Box, useDisclosure, useTheme } from "@chakra-ui/react";
import ChaptersTopicPage from "../components/ChaptersTopicsPage";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../../store/actions/scheduleClassActions";
import ScheduleClassPopup from "../../../../components/popups/ScheduleClassPopup";
const SingleLectureDetailsScreen = () => {
  const dispatch = useDispatch();
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();
  const { outerBackground } = useTheme().colors.pallete;
  const [selectedDate, setSelectedDate] = useState(""); // if clicked from calendar
  const [classTiming, setClassTiming] = useState(["--:--", "--:--"]);
  useEffect(() => {
    dispatch(getAllLiveClassesSchedule());
  }, [dispatch]);

  return (
    <Flex gap={"23px"} m={"52px"}>
      <Box  width={"75%"}>
        <SingleLectureDetailsCovered />
      </Box>
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
      <Box w={"25%"}>
        <SimpleBar
          style={{
            maxHeight: "85vh",
            borderRadius: "26px",
            background: outerBackground,
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
export default SingleLectureDetailsScreen;

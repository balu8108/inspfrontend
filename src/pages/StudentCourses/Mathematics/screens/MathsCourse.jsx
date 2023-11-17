import React, { useState,useEffect } from "react";
import Header from "../../../Mentors/Header/components/HeaderInAllScreen";
import Details from "../components/Detailing";
import ScheduledMeetings from "../../../MeetingViewer/components/ScheduledMeetings";
import { Flex, Stack, Box, useDisclosure } from "@chakra-ui/react";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { boxShadowStyles } from "../../../../utils";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../../store/actions/scheduleClassActions";
import ScheduleClassPopup from "../../../../components/popups/ScheduleClassPopup";

const MathsScreen = () => {
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
   
    <Flex gap={"24px"} m={"52px"}>
      <Stack spacing={6} w={"full"}>
        <Header />
        <Details />
      </Stack>
      <Box w={"33%"}>
        <SimpleBar
          style={{
            maxHeight: "85vh",
            borderRadius: "26px",
            background: "white",
            backgroundBlendMode: "multiply",
            boxShadow: boxShadowStyles.mainBoxShadow.boxShadow,
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
export default MathsScreen;

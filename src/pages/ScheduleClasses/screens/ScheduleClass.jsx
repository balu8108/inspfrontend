import { Grid, GridItem, Box, useDisclosure, useTheme } from "@chakra-ui/react";

import ScheduleCalendar from "../components/ScheduleCalendar";
import ScheduleClassPopup from "../../../components/popups/ScheduleClassPopup";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../store/actions/scheduleClassActions";

import ScheduleClassList from "../components/ScheduleClassList";
import { Scrollbars } from "rc-scrollbars";

const ScheduleClass = () => {
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();

  const [selectedDate, setSelectedDate] = useState(""); // if clicked from calendar
  const [classTiming, setClassTiming] = useState(["--:--", "--:--"]);
  const dispatch = useDispatch();
  const { outerBackground } = useTheme().colors.pallete;

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
      <Box px={20} pt={4} pb={4}>
        <Grid templateColumns={"20% 80%"} gap={6} alignItems={"start"}>
          <Scrollbars
            style={{
              height: "100%",

              borderRadius: "10px",
              background: outerBackground,
            }}
            autoHide={true}
          >
            <GridItem p={4} height={"100%"}>
              <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
            </GridItem>
          </Scrollbars>
          <GridItem borderRadius={"md"}>
            <ScheduleCalendar
              onSchedulePopupOpen={onSchedulePopupOpen}
              setSelectedDate={setSelectedDate}
              setClassTiming={setClassTiming}
            />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default ScheduleClass;

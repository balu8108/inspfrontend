import { Grid, GridItem, Box, useDisclosure } from "@chakra-ui/react";

import ScheduleCalendar from "../components/ScheduleCalendar";
import ScheduleClassPopup from "../../../components/popups/ScheduleClassPopup";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../store/actions/scheduleClassActions";

import ScheduleClassList from "../components/ScheduleClassList";
import { Scrollbars } from "rc-scrollbars";
import { boxShadowStyles } from "../../../utils";
const ScheduleClass = () => {
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();

  const [selectedDate, setSelectedDate] = useState(""); // if clicked from calendar
  const [classTiming, setClassTiming] = useState(["--:--", "--:--"]);
  const dispatch = useDispatch();

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
          {/* <SimpleBar
            style={{
              maxHeight: "85vh",
              borderRadius: "10px",
              boxShadow: boxShadowStyles.shadowOneStyle.boxShadow,
            }}
          > */}
          <Scrollbars
            style={{
              height: "90vh",
              boxShadow: boxShadowStyles.mainBoxShadow.boxShadow,
              borderRadius: "10px",
              background: "white",
            }}
            autoHide={true}
          >
            <GridItem p={4}>
              <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
            </GridItem>
          </Scrollbars>

          {/* </SimpleBar> */}

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

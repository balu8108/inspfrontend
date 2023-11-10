import { Grid, GridItem, Box, useTheme, useDisclosure } from "@chakra-ui/react";

import ScheduleCalendar from "../components/ScheduleCalendar";
import ScheduleClassPopup from "../../../components/popups/ScheduleClassPopup";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../store/actions/scheduleClassActions";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { boxShadowStyles } from "../../../utils";
import ScheduleClassList from "../components/ScheduleClassList";
import { Scrollbars } from "rc-scrollbars";
const ScheduleClass = () => {
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();

  const { lightGrey } = useTheme().colors.pallete;
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
              boxShadow: "2px 2px 13px 0 rgba(92, 92, 92, 0.2)",
              borderRadius: "10px",
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

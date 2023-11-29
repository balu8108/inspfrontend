import React, { useState, useEffect } from "react";
import { Box, Flex, Stack, useDisclosure, useTheme } from "@chakra-ui/react";
import Header from "../../../Header/components/HeaderInAllScreen";
import PhysDetails from "../../../../StudentCourses/Physics/components/PhysDetails";
import ScheduleClassList from "../../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { boxShadowStyles } from "../../../../../utils";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../../../store/actions/scheduleClassActions";
import ScheduleClassPopup from "../../../../../components/popups/ScheduleClassPopup";
const Physics = () => {
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

      <Flex m={"52px"}>
        <Stack spacing={"24px"} w={"full"} h={"100%"}>
          <Header />
          <PhysDetails />
        </Stack>
        <Box w="30%" ml={5}>
          <SimpleBar
            style={{
              maxHeight: "85vh",
              borderRadius: "26px",
              background: outerBackground,
              // boxShadow: boxShadowStyles.shadowOneStyle.boxShadow,
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
export default Physics;

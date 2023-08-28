import {
  Grid,
  GridItem,
  Flex,
  Box,
  useTheme,
  useDisclosure,
} from "@chakra-ui/react";
import { MainBtn } from "../../../components/button";
import { scheduleClassData } from "../data/scheduleClassData";
import ScheduleInfoBox from "../components/ScheduleInfoBox";
import ScheduleCalendar from "../components/ScheduleCalendar";
import ScheduleClassPopup from "../../../components/popups/ScheduleClassPopup";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../store/actions/scheduleClassActions";
const ScheduleClass = () => {
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();
  const { primaryBlue, lightGrey } = useTheme().colors.pallete;
  const [selectedDate, setSelectedDate] = useState(""); // if clicked from calendar
  const [classTiming, setClassTiming] = useState(["", ""]);
  const dispatch = useDispatch();

  const scheduleClassClickHandler = () => {
    onSchedulePopupOpen();
  };

  useEffect(() => {
    dispatch(getAllLiveClassesSchedule());
  }, []);
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
        <Grid templateColumns={"20% 80%"} gap={4} alignItems={"start"}>
          <GridItem p={4} borderRadius={"md"} bg={lightGrey}>
            <Flex direction={"column"}>
              <MainBtn
                isLoading={false}
                text={scheduleClassData.scheduleClass}
                backColor={primaryBlue}
                textColor={"white"}
                onClickHandler={scheduleClassClickHandler}
              />

              <ScheduleInfoBox />
            </Flex>
          </GridItem>
          <GridItem bg={lightGrey} borderRadius={"md"}>
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

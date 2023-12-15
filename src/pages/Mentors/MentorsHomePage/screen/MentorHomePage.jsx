import React, { useEffect, useState } from "react";
import { Box, Flex, useDisclosure, Stack, useTheme } from "@chakra-ui/react";
import Header from "../../Header/components/HeaderInAllScreen";
import MentorsUploads from "../components/Uploads";
import FeedBack from "../components/RateNFeedback";
import SoloClasses from "../components/SoloClasses";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../../store/actions/scheduleClassActions";
import ScheduleClassPopup from "../../../../components/popups/ScheduleClassPopup";
const MentorHomePage = () => {
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

      <Box m={"50px"}>
        <Flex>
          <Box w={"full"}>
            <Header />
            <Flex w={"full"}>
              <Stack spacing={"20px"} w={"full"} h={"full"}>
                <SoloClasses />
                <MentorsUploads />
              </Stack>
              <FeedBack />
            </Flex>
          </Box>

          <Box w="35%" ml={5}>
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
      </Box>
    </>
  );
};

export default MentorHomePage;

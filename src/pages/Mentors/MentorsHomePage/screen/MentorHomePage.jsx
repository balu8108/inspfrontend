import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  useDisclosure,
  Stack,
  HStack,
} from "@chakra-ui/react";
import Header from "../../Header/components/HeaderInAllScreen";
import MentorsUploads from "../components/Uploads";
import FeedBack from "../components/RateNFeedback";
import MentorSchedulingClass from "../../SchedulingClass/components/MentorSchedule";
import SoloClasses from "../components/SoloClasses";
import MentorGroups from "../components/Groups";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { boxShadowStyles } from "../../../../utils";
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
          <Box>
            <Header />
            <Flex w={"full"}>
              <Stack spacing={"20px"} w={"full"}>
                <SoloClasses />
                <MentorsUploads />
              </Stack>
              <FeedBack />
            </Flex>
          </Box>

          <Box>
            <VStack gap={"24px"}>
              <MentorGroups />
              <Box w="90%" ml={5}>
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
                    <ScheduleClassList
                      onSchedulePopupOpen={onSchedulePopupOpen}
                    />
                  </Box>
                </SimpleBar>
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default MentorHomePage;

import React from "react";
import { Box, Flex, useDisclosure, Stack } from "@chakra-ui/react";
import Header from "../../Header/components/HeaderInAllScreen";
import MentorsUploads from "../components/Uploads";
import FeedBack from "../components/RateNFeedback";
import SoloClasses from "../components/SoloClasses";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import ScheduleClassPopup from "../../../../components/popups/ScheduleClassPopup";
const MentorHomePage = () => {
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();
  return (
    <>
      {isSchedulePopupOpen && (
        <ScheduleClassPopup
          isOpen={isSchedulePopupOpen}
          onClose={onScheduleClosePopupOpen}
          isCalenderScreen={false}
        />
      )}
      <Flex m={"52px"}>
        <Box w={"75%"}>
          <Header />
          <Flex w={"full"}>
            <Stack spacing={"20px"} w={"full"} h={"full"}>
              <SoloClasses />
              <MentorsUploads />
            </Stack>
            <FeedBack />
          </Flex>
        </Box>
        <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
      </Flex>
    </>
  );
};

export default MentorHomePage;

import { Box, Flex, useDisclosure,Stack } from "@chakra-ui/react";
import React from "react";
import SoloClassLectureDetails from "../components/SoloClassLectureDetails";
import Header from "../../../Mentors/Header/components/HeaderInAllScreen";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import ScheduleClassPopup from "../../../../components/popups/ScheduleClassPopup";
const SoloLectureDetailsScreen = () => {
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
      <Flex m={"52px"} >
        <Stack w={"75%"} gap={"20px"}>
          <Header />
          <SoloClassLectureDetails />
        </Stack>

        <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
      </Flex>
    </>
  );
};

export default SoloLectureDetailsScreen;

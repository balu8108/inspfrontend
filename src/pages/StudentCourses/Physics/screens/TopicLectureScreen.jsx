import React from "react";
import { Flex, Stack, useDisclosure } from "@chakra-ui/react";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import { useParams } from "react-router-dom";
import ScheduleClassPopup from "../../../../components/popups/ScheduleClassPopup";
import LectureListPage from "../components/LectureListPage";
const TopicLectureScreen = () => {
  const { lectureId } = useParams();
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
        <Stack spacing={6} w={"75%"}>
          <LectureListPage lectureId={lectureId} />
        </Stack>
        <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
      </Flex>
    </>
  );
};
export default TopicLectureScreen;

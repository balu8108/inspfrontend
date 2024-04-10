import React from "react";
import { Stack, Flex, useDisclosure } from "@chakra-ui/react";
import TopicsBased from "../components/TopicBased";
import DetailsCoveredFiles from "../components/DetailsCoveredFiles";
import ScheduleClassList from "../../../../ScheduleClasses/components/ScheduleClassList";
import ScheduleClassPopup from "../../../../../components/popups/ScheduleClassPopup";
const SoloRecordedTopicsDetails = () => {
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
        />
      )}
      <Flex m={"52px"}>
        <Stack w={"75%"} spacing={"24px"}>
          <TopicsBased />
          <DetailsCoveredFiles />
        </Stack>
        <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
      </Flex>
    </>
  );
};
export default SoloRecordedTopicsDetails;

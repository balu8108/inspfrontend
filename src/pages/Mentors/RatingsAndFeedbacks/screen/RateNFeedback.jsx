import React from "react";
import { Flex, Stack, useDisclosure } from "@chakra-ui/react";
import Feedback from "../components/Feedback";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import ScheduleClassPopup from "../../../../components/popups/ScheduleClassPopup";
const RateNFeedback = () => {
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
        <Stack w={"75%"}>
          <Feedback />
        </Stack>
        <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
      </Flex>
    </>
  );
};
export default RateNFeedback;

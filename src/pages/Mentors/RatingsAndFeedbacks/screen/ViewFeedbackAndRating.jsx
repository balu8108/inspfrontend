import React from "react";
import { Flex, Stack, useDisclosure } from "@chakra-ui/react";
import ViewMentorsRatingAndFeedback from "../components/ViewFeedbackAndRating/ViewFeedback";
import RatingAndFeedBackChart from "../components/ViewFeedbackAndRating/RatingDonughChart";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import ScheduleClassPopup from "../../../../components/popups/ScheduleClassPopup";

const ViewRatingAndFeedback = () => {
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
        <Stack spacing={"24px"} w={"75%"}>
          <ViewMentorsRatingAndFeedback />
          <RatingAndFeedBackChart />
        </Stack>
        <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
      </Flex>
    </>
  );
};
export default ViewRatingAndFeedback;

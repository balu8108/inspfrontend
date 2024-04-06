import React from "react";
import { Box, Flex, Stack, useDisclosure, useTheme } from "@chakra-ui/react";
import ViewMentorsRatingAndFeedback from "../components/ViewFeedbackAndRating/ViewFeedback";
import RatingAndFeedBackChart from "../components/ViewFeedbackAndRating/RatingDonughChart";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import ScheduleClassPopup from "../../../../components/popups/ScheduleClassPopup";

const ViewRatingAndFeedback = () => {
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();
  const { outerBackground } = useTheme().colors.pallete;

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
        <Stack spacing={"24px"} w={"100%"}>
          <ViewMentorsRatingAndFeedback />
          <RatingAndFeedBackChart />
        </Stack>
        <Box w={"35%"} ml={5} mt={"5"}>
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
    </>
  );
};
export default ViewRatingAndFeedback;

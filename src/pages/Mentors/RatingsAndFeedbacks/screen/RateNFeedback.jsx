import React from "react";
import { Box, Flex, useDisclosure, useTheme } from "@chakra-ui/react";
import Feedback from "../components/Feedback";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import ScheduleClassPopup from "../../../../components/popups/ScheduleClassPopup";
const RateNFeedback = () => {
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
      <Flex mx={"51px"} my={"29px"}>
        <Feedback />
        <Box w={"30%"} ml={5} mt={"5"}>
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
export default RateNFeedback;

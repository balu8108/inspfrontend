import React from "react";
import { Box, Flex, useDisclosure, useTheme } from "@chakra-ui/react";
import AllUploadedLecture from "../components/Uploads";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import ScheduleClassPopup from "../../../../components/popups/ScheduleClassPopup";
const MentorAllUploadedLectures = () => {
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
      <Flex m={"52px"} gap={"24px"}>
        <AllUploadedLecture />
        <Box w={"32%"}>
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
export default MentorAllUploadedLectures;

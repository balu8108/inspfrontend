import React from "react";
import { Flex, Stack, Box, useDisclosure, useTheme } from "@chakra-ui/react";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { useParams } from "react-router-dom";
import ScheduleClassPopup from "../../../../components/popups/ScheduleClassPopup";
import LectureListPage from "../components/LectureListPage";
const TopicLectureScreen = () => {
  const { lectureName } = useParams();
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
      <Flex gap={"23px"} m={"52px"}>
        <Stack spacing={6} w={"75%"}>
          <LectureListPage lectureName={lectureName} />
        </Stack>
        <Box w={"25%"}>
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
export default TopicLectureScreen;

import React, { useState } from "react";
import { Box, Flex, Stack, useDisclosure, useTheme } from "@chakra-ui/react";
import ViewAllRecordingsRelatedToOneChapter from "../components/RecOfChapter/RecordingRelatedToChapter";
import ChapterDetailsAndCoveredPart from "../components/RecOfChapter/DetailsAndCovered";
import ScheduleClassList from "../../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import ScheduleClassPopup from "../../../../../components/popups/ScheduleClassPopup";
const ChapterRecordings = () => {
  const [viewTopic, setViewTopic] = useState(null);
  const [viewtopicName, setTopicName] = useState(null);
  const { outerBackground } = useTheme().colors.pallete;

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
      <Flex m={"45px"}>
        <Stack spacing={"24px"} w={"73%"}>
          <ViewAllRecordingsRelatedToOneChapter
            setViewTopic={setViewTopic}
            setTopicName={setTopicName}
          />
          <ChapterDetailsAndCoveredPart
            viewTopic={viewTopic}
            viewtopicName={viewtopicName}
          />
        </Stack>
        <Box ml={"24px"} mt={"20px"} w={"25%"}>
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
export default ChapterRecordings;

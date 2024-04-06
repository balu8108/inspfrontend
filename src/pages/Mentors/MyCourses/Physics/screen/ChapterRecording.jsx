import React, { useState } from "react";
import { Flex, Stack, useDisclosure } from "@chakra-ui/react";
import ViewAllRecordingsRelatedToOneChapter from "../components/RecOfChapter/RecordingRelatedToChapter";
import ChapterDetailsAndCoveredPart from "../components/RecOfChapter/DetailsAndCovered";
import ScheduleClassList from "../../../../ScheduleClasses/components/ScheduleClassList";
import ScheduleClassPopup from "../../../../../components/popups/ScheduleClassPopup";
const ChapterRecordings = () => {
  const [viewTopic, setViewTopic] = useState(null);
  const [viewtopicName, setTopicName] = useState(null);

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
          <ViewAllRecordingsRelatedToOneChapter
            setViewTopic={setViewTopic}
            setTopicName={setTopicName}
          />
          <ChapterDetailsAndCoveredPart
            viewTopic={viewTopic}
            viewtopicName={viewtopicName}
          />
        </Stack>
        <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
      </Flex>
    </>
  );
};
export default ChapterRecordings;

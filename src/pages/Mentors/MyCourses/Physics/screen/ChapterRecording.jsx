import { Box, Flex, Stack, VStack } from "@chakra-ui/react";
import ViewAllRecordingsRelatedToOneChapter from "../components/RecOfChapter/RecordingRelatedToChapter";
import ChapterDetailsAndCoveredPart from "../components/RecOfChapter/DetailsAndCovered";
import ScheduledMeetings from "../../../SchedulingClass/components/MentorSchedule";
const ChapterRecordings = () => {
  return (
    <Flex m={"45px"}>
      <Stack spacing={"24px"} w={"full"}>
        <ViewAllRecordingsRelatedToOneChapter />
        <ChapterDetailsAndCoveredPart />
      </Stack>
      <ScheduledMeetings />
    </Flex>
  );
};
export default ChapterRecordings;

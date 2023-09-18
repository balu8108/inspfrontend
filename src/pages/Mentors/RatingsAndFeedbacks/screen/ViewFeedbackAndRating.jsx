import { Box, Flex, Stack } from "@chakra-ui/react";
import ViewMentorsRatingAndFeedback from "../components/ViewFeedbackAndRating/ViewFeedback";
import RatingAndFeedBackChart from "../components/ViewFeedbackAndRating/RatingDonughChart";
import MentorSchedulingClass from "../../SchedulingClass/components/MentorSchedule";
const ViewRatingAndFeedback = () => {
  return (
    <Flex m={"52px"}>
      <Stack spacing={"24px"} w={"100%"}>
        <ViewMentorsRatingAndFeedback />
        <RatingAndFeedBackChart />
      </Stack>
      <Box>
        <MentorSchedulingClass />
      </Box>
    </Flex>
  );
};
export default ViewRatingAndFeedback;

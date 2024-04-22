import React from "react";
import { Stack } from "@chakra-ui/react";
import ViewMentorsRatingAndFeedback from "../components/ViewFeedbackAndRating/ViewFeedback";
import RatingAndFeedBackChart from "../components/ViewFeedbackAndRating/RatingDonughChart";

const ViewRatingAndFeedback = () => {
  return (
    <Stack spacing={"24px"}>
      <ViewMentorsRatingAndFeedback />
      <RatingAndFeedBackChart />
    </Stack>
  );
};
export default ViewRatingAndFeedback;

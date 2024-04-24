import React from "react";
import { Stack } from "@chakra-ui/react";
import TopicsBased from "../components/TopicBased";
import DetailsCoveredFiles from "../components/DetailsCoveredFiles";
const SoloRecordedTopicsDetails = () => {
  return (
    <Stack spacing={"24px"}>
      <TopicsBased />
      <DetailsCoveredFiles />
    </Stack>
  );
};
export default SoloRecordedTopicsDetails;

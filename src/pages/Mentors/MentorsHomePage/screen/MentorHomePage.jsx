import React from "react";
import { Flex, Stack } from "@chakra-ui/react";
import MentorsUploads from "../components/Uploads";
import FeedBack from "../components/RateNFeedback";
import SoloClasses from "../components/SoloClasses";
const MentorHomePage = () => {
  return (
    <Flex w={"full"}>
      <Stack spacing={"20px"} w={"full"} h={"full"}>
        <SoloClasses />
        <MentorsUploads />
      </Stack>
      <FeedBack />
    </Flex>
  );
};

export default MentorHomePage;

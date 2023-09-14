import { Box, Flex, VStack } from "@chakra-ui/react";
import Header from "../../Header/components/HeaderInAllScreen";
import MentorsUploads from "../components/Uploads";
import FeedBack from "../components/RateNFeedback";
import MentorSchedulingClass from "../../SchedulingClass/components/MentorSchedule";
import MentorGroups from "../components/Groups";

const MentorHomePage = () => {
  return (
    <Box m={"50px"}>
      <Flex>
        <Box>
          <Header />
          <Flex gap={"24px"}>
            <MentorsUploads />
            <FeedBack />
          </Flex>
        </Box>
        <Box>
          <VStack>
            <MentorGroups />
            <MentorSchedulingClass />
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default MentorHomePage;

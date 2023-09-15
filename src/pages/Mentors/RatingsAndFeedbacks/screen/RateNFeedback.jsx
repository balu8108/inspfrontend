import { Flex } from "@chakra-ui/react";
import Feedback from "../components/Feedback";
import SchedulingClass from "../../SchedulingClass/components/MentorSchedule";
const RateNFeedback = () => {
  return (
    <Flex mx={"51px"} my={"29px"} >
      <Feedback />
      <SchedulingClass />
    </Flex>
  );
};
export default RateNFeedback;

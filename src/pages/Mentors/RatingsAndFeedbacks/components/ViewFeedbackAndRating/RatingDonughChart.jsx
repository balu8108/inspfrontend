import {
  Avatar,
  Box,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import feedbackGivenByStudentList from "../../data/feedbackGivenByStudent";

const RatingAndFeedBackChart = () => {
  return (
    <Box w={"100%"} h={"full"} bg={"#F1F5F8"} borderRadius={"26px"}>
      <HStack spacing={"10px"} mx="27px" mt={"25px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"20px"} lineHeight={"24px"}>
          Newton's Third Law
        </Text>
      </HStack>

      <Stack spacing={"20px"} p={"20px"}>
        {feedbackGivenByStudentList.map((feedback) => (
          <Box key={feedback.feedbackId} alignItems="center" mb={2}>
            <HStack>
              <Avatar bg={"#3C8DBC"} boxSize="1.6em" mr={2} />
              <Text fontSize={"15px"}>{feedback.studentName}</Text>
            </HStack>
            <Text fontSize={"12px"} color={"#2C332978"} p={"10px"}>
              {feedback.feedback}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default RatingAndFeedBackChart;

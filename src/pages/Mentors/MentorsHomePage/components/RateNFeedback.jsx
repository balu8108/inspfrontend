import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import rateNfeedeback from "../data/feedback";
const FeedBack = () => {
  return (
    <Box bg={"#F1F5F8"} mt={"23px"} borderRadius={"25px"} w={"38%"}>
      <Flex>
        <HStack spacing={"10px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
            mt={"10px"}
            ml={"27px"}
          ></Box>
          <Text fontSize={"20px"} lineHeight={"24px"} mt={"10px"}>
            Rating & Feedback
          </Text>
        </HStack>
        <Spacer />
        <Button
          variant={"ghost"}
          fontSize={"sm"}
          fontWeight={400}
          mt={"7px"}
          p={6}
        >
          See All
        </Button>
      </Flex>
      <Flex mt={"34px"} flexWrap="wrap">
        {rateNfeedeback.map((rateNfeedebackOfAChapter) => (
          <Box
            flexBasis="100%" // Two cards per line
            key={rateNfeedebackOfAChapter.id}
          >
            <Card
              borderRadius={"18px"}
              bg={"#F1F5F8"}
              ml={"20px"}
              mb={"20px"}
              mr={"20px"}
              blendMode={"multiply"}
            >
              <Text
                fontSize={"16px"}
                fontWeight={"400"}
                lineHeight={"18px"}
                color={"#2C3329"}
                ml={"13px"}
                mt={"13px"}
              >
                {rateNfeedebackOfAChapter.chapterName}
              </Text>

              <Text
                fontSize={"12px"}
                lineHeight={"14px"}
                fontWeight={"400px"}
                color={"#2C3329"}
                mt={"14px"}
                ml={"14px"}
              >
                Description
              </Text>
              <Text
                fontSize={"11px"}
                lineHeight={"21px"}
                fontWeight={"400px"}
                ml={"13px"}
                mt={"6px"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                {rateNfeedebackOfAChapter.description}
              </Text>

              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600"}
                size={"12px"}
                fontSize={"14px"}
                lineHeight={"16px"}
                p={5}
              >
                View Details
              </Button>
            </Card>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
export default FeedBack;

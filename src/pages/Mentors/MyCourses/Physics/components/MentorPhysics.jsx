import { Box, Button, Card, Flex, Text, HStack, Stack } from "@chakra-ui/react";
import mentorChapterDetails from "../data/completedChapterDetails";
const PhysicsCourse = () => {
  return (
    <Box bg={"#F1F5F8"} w={"full"} h={"full"} borderRadius={"26px"}>
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"27px"}
          ml={"27px"}
        ></Box>
        <Text fontSize={"20px"} lineHeight={"24px"} mt={"26px"}>
          My Courses (Physics)
        </Text>
      </HStack>

      <Stack>
        <Flex flexWrap="wrap" mt={"37px"} ml={"29px"} gap={"23px"}>
          {mentorChapterDetails.map((physScreen) => (
            <Card
              w={"235px"}
              h={"204px"}
              key={physScreen.id}
              blendMode={"multiply"}
              bg={"#F1F5F8"}
              borderRadius={"18px"}
              mb={"20px"}
            >
              <Text
                fontSize={"16px"}
                fontWeight={400}
                ml={"13px"}
                mt={"16px"}
                lineHeight={"19px"}
              >
                {physScreen.chapterName}
              </Text>
              <Text
                fontWeight={400}
                fontSize={"12px"}
                lineHeight={"15px"}
                ml={"13px"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                {physScreen.instructorName}
              </Text>
              <Text
                fontSize={"12px"}
                lineHeight={"13px"}
                ml={"13px"}
                fontWeight={400}
                color={"rgba(44, 51, 41, 1)"}
                mt={"18px"}
              >
                Description
              </Text>
              <Text
                fontSize={"11px"}
                lineHeight={"21px"}
                fontWeight={400}
                ml={13}
                noOfLines={"2"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                {physScreen.description}
              </Text>
              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600"}
                size={"14px"}
                lineHeight={"16px"}
                mt={"40px"}
              >
                View Details
              </Button>
            </Card>
          ))}
        </Flex>
      </Stack>
    </Box>
  );
};
export default PhysicsCourse;

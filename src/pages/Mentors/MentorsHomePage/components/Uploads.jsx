import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import upload from "../data/uploads";

const MentorsUploads = () => {
  return (
    <Box bg={"#F1F5F8"} mt={"24px"} w={"60%"} borderRadius={"26px"}>
      <Flex>
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
            My Uploads
          </Text>
        </HStack>
        <Spacer />
        <Button
          variant={"ghost"}
          fontSize={"sm"}
          fontWeight={400}
          mt={"15px"}
          mr={"10px"}
        >
          See All
        </Button>
      </Flex>
      <Flex mt={"34px"} flexWrap="wrap">
        {upload.map((mentorUploadDetails) => (
          <Box
            flexBasis="50%" // Two cards per line
            key={mentorUploadDetails.id}
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
                {mentorUploadDetails.chapterName}
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
                {mentorUploadDetails.description}
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

export default MentorsUploads;

import React from "react";
import { Box, HStack, Text, Card, Flex, Image } from "@chakra-ui/react";
import viewChapterRecordingData from "../../data/viewChapterRelatedRecording";
import defaultImageUrl from "../../../../../assets/images/image1.png";
const ViewChapterRecording = () => {
  return (
    <Box w={"full"} bg={"#F1F5F8"} borderRadius={"2xl"}>
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"27px"}
          ml={"27px"}
        ></Box>
        <Text
          fontSize={"20px"}
          lineHeight={"24px"}
          fontFamily={400}
          mt={"26px"}
        >
          Newton's First Law Of Recordings
        </Text>
      </HStack>

      <Flex overflowX="auto">
        {viewChapterRecordingData[0].recordings.map((recording) => (
          <Card
            key={recording.recordingId}
            p={3}
            ml={"24px"}
            mb={"26px"}
            mt={"24px"}
            width="200px"
            borderRadius={"6px"}
            flexShrink={"0"}
          >
            <Image src={defaultImageUrl} alt={recording.title} mb={2} />
            <Text fontWeight="bold">{recording.title}</Text>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default ViewChapterRecording;

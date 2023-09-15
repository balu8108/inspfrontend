import React from "react";
import { Box, HStack, Text, Card, Image, Flex, Spacer } from "@chakra-ui/react";
import viewChapterRecordings from "../../data/recording";
import defaultImageUrl from "../../../../../../assets/images/image1.png";

const ViewAllRecordingsRelatedToOneChapter = () => {
  return (
    <Box w={"100%"} maxW={"870px"} bg={"#F1F5F8"} borderRadius={"2xl"} mt={6} overflowX="auto">
      <HStack spacing={"10px"} ml="27px">
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"27px"}
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
      <Flex m="27px">
        {viewChapterRecordings.map((chapter) =>
          chapter.recordings.map((recording) => (
            <Card
              key={recording.recordingId}
              p={3}
              bg={"#F1F5F8"}
              blendMode={"multiply"}
              minW="200px" 
              mx={4}
            >
              <Image src={defaultImageUrl} alt="Recording Image" />
            </Card>
          ))
        )}
        <Spacer />
      </Flex>

      {viewChapterRecordings.length === 0 && (
        <Text textAlign="center" mt={4}>
          No recordings available for this chapter.
        </Text>
      )}
    </Box>
  );
};

export default ViewAllRecordingsRelatedToOneChapter;

import { Box, Flex } from "@chakra-ui/react";
import VideoSection from "./VideoSection";

const ChatToolBox = ({ mentorVideoRef, isScreenShare }) => {
  return (
    <Box position={"absolute"} height={"100%"} p={4} right={0} zIndex={4}>
      <Flex
        height={"100%"}
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={"flex-end"}
      >
        <VideoSection mentorVideoRef={mentorVideoRef} />
      </Flex>
    </Box>
  );
};

export default ChatToolBox;

import React from "react";
import { Box, useTheme } from "@chakra-ui/react";
import VideoPlayer from "../../../components/videoplayer/VideoPlayer";
import TPStreamPlayer from "../../../components/videoplayer/TPStreamPlayer";

const ViewRecording = ({ browser, type, activeRecording }) => {
  const { outerBackground } = useTheme().colors.pallete;
  return (
    <Box bg={outerBackground} borderRadius={"26px"} p={5} w={"100%"} h={"80vh"}>
      {activeRecording?.DRMType === "Axinom" && (
        <VideoPlayer
          browser={browser}
          type={type}
          activeRecording={activeRecording}
        />
      )}
      {activeRecording?.DRMType === "TPStream" && (
        <TPStreamPlayer activeRecording={activeRecording} />
      )}
    </Box>
  );
};

export default ViewRecording;

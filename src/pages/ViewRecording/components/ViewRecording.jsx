import React from "react";
import { Box } from "@chakra-ui/react";
import VideoPlayer from "../../../components/videoplayer/VideoPlayer";

const ViewRecording = ({ type, activeRecording }) => {
  return (
    <Box bg={"#F1F5F8"} borderRadius={"26px"} p={5} w={"100%"} h={"80vh"}>
      <VideoPlayer type={type} activeRecording={activeRecording} />
    </Box>
  );
};

export default ViewRecording;

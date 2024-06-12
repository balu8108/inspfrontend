import React from "react";
import { Box, useTheme } from "@chakra-ui/react";
import TPStreamPlayer from "../../../components/videoplayer/TPStreamPlayer";

const ViewRecording = ({ browser, activeRecording }) => {
  const { outerBackground } = useTheme().colors.pallete;
  return (
    <Box bg={outerBackground} borderRadius={"26px"} p={5} w={"100%"} h={"80vh"}>
      {activeRecording?.DRMType === "TPStream" && (
        <TPStreamPlayer activeRecording={activeRecording} />
      )}
    </Box>
  );
};

export default ViewRecording;

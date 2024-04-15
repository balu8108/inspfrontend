import React, { useState } from "react";
import { roomData } from "../data/roomData";
import { RiFullscreenExitLine, RiFullscreenFill } from "react-icons/ri";
import { IconButton, Tooltip, useTheme } from "@chakra-ui/react";
const FullScreenModeButton = ({ fullScreenRef }) => {
  const { primaryBlue } = useTheme().colors.pallete;
  const [fullScreen, setFullScreen] = useState(false);

  const enterFullscreen = () => {
    setFullScreen(true);
    const elem = fullScreenRef.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      elem.webkitRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    setFullScreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };
  return (
    <Tooltip label={roomData.fullScreenMode} placement={"right"}>
      <IconButton
        isRound={true}
        bg={fullScreen ? primaryBlue : "gray.200"}
        _hover={{ bg: fullScreen ? primaryBlue : "gray.200" }}
        icon={
          fullScreen ? (
            <RiFullscreenExitLine size={20} color={"white"} />
          ) : (
            <RiFullscreenFill size={20} color={"black"} />
          )
        }
        onClick={handleFullscreen}
      />
    </Tooltip>
  );
};
export default FullScreenModeButton;

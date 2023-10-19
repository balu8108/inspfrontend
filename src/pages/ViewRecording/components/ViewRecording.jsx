import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { Box, Text } from "@chakra-ui/react";
import VideoPlayer from "../../../components/videoplayer/VideoPlayer";

const ViewRecording = () => {
  // const [videoUrl, setVideoUrl] = useState(true);

  // useEffect(() => {
  //   const videoUrlFromParams = new URLSearchParams(window.location.search).get(
  //     "videoUrl"
  //   );
  //   setVideoUrl(videoUrlFromParams);
  // }, [window.location.search]);

  // const handlePlay = () => {
  //   // Check if the player ref is current.
  //   if (!playerRef.current) {
  //     return;
  //   }

  //   // Play the video.
  //   const internalPlayer = playerRef.current.getInternalPlayer();
  //   if (internalPlayer) {
  //     internalPlayer.play().catch((error) => {
  //       console.error("Error playing video:", error);
  //     });
  //   }
  // };

  // const handlePause = () => {
  //   // Check if the player ref is current.
  //   if (!playerRef.current) {
  //     return;
  //   }

  //   // Pause the video.
  //   const internalPlayer = playerRef.current.getInternalPlayer();
  //   if (internalPlayer) {
  //     internalPlayer.pause();
  //   }
  // };

  // Create a ref for the ReactPlayer component.
  // const playerRef = useRef(null);

  return (
    <Box>
      <VideoPlayer videoUrl={""} />
    </Box>
  );
};

export default ViewRecording;

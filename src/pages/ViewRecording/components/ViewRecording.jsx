import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { Box, Text } from "@chakra-ui/react";
import VideoPlayer from "../../../components/videoplayer/VideoPlayer";
import SampleVideoPlayer from "../../../components/videoplayer/SampleVideoPlayer";

const ViewRecording = ({ type, activeRecording }) => {
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
    <Box bg={"#F1F5F8"} borderRadius={"26px"} p={5}>
      {/* <VideoPlayer
        type={type}
        activeRecording={activeRecording}
       
      /> */}

      <SampleVideoPlayer
        videoUrl={"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"}
      />
    </Box>
  );
};

export default ViewRecording;

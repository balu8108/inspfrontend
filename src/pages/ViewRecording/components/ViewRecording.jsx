// import React, { useState, useEffect, useRef } from "react";
// import ReactPlayer from "react-player";
// import { Box, Button, HStack } from "@chakra-ui/react";

// const ViewRecording = () => {
//   const [videoUrl, setVideoUrl] = useState("");

//   useEffect(() => {
//     const videoUrlFromParams = new URLSearchParams(window.location.search).get(
//       "videoUrl"
//     );
//     setVideoUrl(videoUrlFromParams);
//   }, [window.location.search]);

//   const handlePlay = () => {
//     // Check if the player ref is current.
//     if (!playerRef.current) {
//       return;
//     }

//     // Play the video.
//     playerRef.current.getInternalPlayer().play();
//   };

//   const handlePause = () => {
//     // You can use the ReactPlayer component's built-in methods.
//     // The pause() method is available for this purpose.
//     // You need to create a ref for the ReactPlayer component.
//     if (playerRef.current) {
//       playerRef.current.getInternalPlayer().pause();
//     }
//   };

//   // Create a ref for the ReactPlayer component.
//   const playerRef = useRef(null);

//   return (
//     <Box>
//       <ReactPlayer url={videoUrl} controls ref={playerRef} />
//       <HStack>
//         <Button onClick={handlePlay} gap={5}>
//           Play
//         </Button>
//         <Button onClick={handlePause}>Pause</Button>
//       </HStack>
//     </Box>
//   );
// };

// export default ViewRecording;

import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { Box, Button, HStack } from "@chakra-ui/react";

const ViewRecording = () => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    // Retrieve the video URL from the query parameter
    const videoUrlFromParams = new URLSearchParams(window.location.search).get(
      "videoUrl"
    );
    setVideoUrl(videoUrlFromParams);
  }, [window.location.search]);

  const handlePlay = () => {
    // Check if the player ref is current.
    if (!playerRef.current) {
      return;
    }

    // Play the video.
    const internalPlayer = playerRef.current.getInternalPlayer();
    if (internalPlayer) {
      internalPlayer.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  };

  const handlePause = () => {
    // Check if the player ref is current.
    if (!playerRef.current) {
      return;
    }

    // Pause the video.
    const internalPlayer = playerRef.current.getInternalPlayer();
    if (internalPlayer) {
      internalPlayer.pause();
    }
  };

  // Create a ref for the ReactPlayer component.
  const playerRef = useRef(null);

  return (
    <Box>
      {videoUrl ? (
        <ReactPlayer url={videoUrl} controls ref={playerRef} />
      ) : (
        <p>No video URL provided.</p>
      )}
      <HStack>
        <Button onClick={handlePlay}>Play</Button>
        <Button onClick={handlePause}>Pause</Button>
      </HStack>
    </Box>
  );
};

export default ViewRecording;

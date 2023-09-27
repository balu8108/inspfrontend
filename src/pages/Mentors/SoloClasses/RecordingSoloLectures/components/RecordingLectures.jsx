// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Button,
//   Flex,
//   IconButton,
//   Icon,
//   Circle,
//   Stack,
// } from "@chakra-ui/react";
// import {
//   FaMicrophone,
//   FaMicrophoneSlash,
//   FaVideo,
//   FaVideoSlash,
//   FaExpand,
// } from "react-icons/fa";
// import { BsRecord } from "react-icons/bs";
// import { MdOutlineScreenshotMonitor } from "react-icons/md";

// const RecordingLectures = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [isCameraOn, setIsCameraOn] = useState(true);
//   const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   useEffect(() => {
//     if (isRecording) {
//       startRecording();
//     } else {
//       stopRecording();
//     }
//   }, [isRecording]);

//   const toggleCamera = () => {
//     const stream = videoRef.current.srcObject;
//     if (stream) {
//       const videoTrack = stream.getVideoTracks()[0];
//       videoTrack.enabled = !videoTrack.enabled;
//       setIsCameraOn(videoTrack.enabled);
//     }
//   };

//   const toggleMicrophone = () => {
//     const stream = videoRef.current.srcObject;
//     if (stream) {
//       const audioTrack = stream.getAudioTracks()[0];
//       audioTrack.enabled = !audioTrack.enabled;
//       setIsMicrophoneOn(audioTrack.enabled);
//     }
//   };

//   const toggleScreenSharing = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getDisplayMedia({
//         video: true,
//         audio: true,
//       });
//       videoRef.current.srcObject = stream;
//       setIsScreenSharing(true);
//     } catch (error) {
//       console.error("Error accessing screen sharing:", error);
//     }
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       videoRef.current.srcObject = stream;

//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: "video/webm" });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         document.body.appendChild(a);
//         a.style.display = "none";
//         a.href = url;
//         a.download = "recorded-video.webm";
//         a.click();
//         window.URL.revokeObjectURL(url);
//         chunksRef.current = [];
//       };

//       mediaRecorderRef.current = mediaRecorder;
//       mediaRecorder.start();
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//     }
//     const stream = videoRef.current.srcObject;
//     if (stream) {
//       const tracks = stream.getTracks();
//       tracks.forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//   };

//   return (
//     <Box h={"full"} w="80%" borderRadius={"12px"} boxShadow={"md"}>
//       <Flex alignItems="flex-start">
//         <Stack spacing={2} justify="left" align="left" ml={"26px"} mt={"28px"}>
//           <Circle size="40px" bg="white">
//             <IconButton

//               isRound={"true"}
//               icon={<Icon as={FaExpand} boxSize={4} />}
//               size="sm"
//             />
//           </Circle>
//           <Circle size="40px" bg="white" mt={100}>
//             <IconButton
//               isRound={"true"}
//               icon={
//                 isMicrophoneOn ? (
//                   <Icon as={FaMicrophone} boxSize={4} />
//                 ) : (
//                   <Icon as={FaMicrophoneSlash} boxSize={4} />
//                 )
//               }
//               size="sm"
//               onClick={toggleMicrophone}
//             />
//           </Circle>
//           <Circle size="40px" bg="white">
//             <IconButton
//               isRound={"true"}
//               icon={
//                 isCameraOn ? (
//                   <Icon as={FaVideo} boxSize={4} />
//                 ) : (
//                   <Icon as={FaVideoSlash} boxSize={4} />
//                 )
//               }
//               size="sm"
//               onClick={toggleCamera}
//             />
//           </Circle>
//           <Circle size="40px" bg="white">
//             <IconButton
//               aria-label="Stop recording"
//               isRound={"true"}
//               icon={<Icon as={BsRecord} boxSize={4} />}
//               size="sm"
//               onClick={() => setIsRecording(!isRecording)}
//             />
//           </Circle>
//           <Circle size="40px" bg="white">
//             <IconButton
//               isRound={"true"}
//               icon={<Icon as={MdOutlineScreenshotMonitor} boxSize={4} />}
//               size="sm"
//               onClick={toggleScreenSharing}
//             />
//           </Circle>

//           <Button
//             bg={"#F63F4A"}
//             w={"50px"}
//             mt={"100px"}
//             mb={"20px"}
//             px={"36px"}
//             py={"13px"}
//             borderRadius={"27px"}
//             color={"white"}
//             fontWeight={500}
//             size={"sm"}
//             onClick={() => setIsRecording(false)}
//           >
//             End
//           </Button>
//         </Stack>
//         <video
//           ref={videoRef}
//           width="100%"
//           height="auto"
//           autoPlay
//           style={{
//             marginTop: "20px",
//           }}
//         />
//       </Flex>
//     </Box>
//   );
// };

// export default RecordingLectures;

import React, { useState, useEffect, useRef } from "react";
import { Box, Button, IconButton, Icon, Circle, Stack } from "@chakra-ui/react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaExpand,
} from "react-icons/fa";
import { BsRecord } from "react-icons/bs";
import { MdOutlineScreenshotMonitor } from "react-icons/md";

const RecordingLectures = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  const toggleCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsCameraOn(videoTrack.enabled);
    }
  };

  const toggleMicrophone = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicrophoneOn(audioTrack.enabled);
    }
  };

  const toggleScreenSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      setIsScreenSharing(true);
    } catch (error) {
      console.error("Error accessing screen sharing:", error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = "none";
        a.href = url;
        a.download = "recorded-video.webm";
        a.click();
        window.URL.revokeObjectURL(url);
        chunksRef.current = [];
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  return (
    <Box
      h="full"
      w="80%"
      borderRadius="12px"
      boxShadow="md"
      position="relative"

    >
    <Box mx={"10px"} my={"5px"}>

    
     
      <Stack position="absolute" top="20px" left="20px" zIndex="1" >
        <Circle size="40px" bg="white">
          <IconButton
            isRound={"true"}
            icon={<Icon as={FaExpand} boxSize={4} />}
            size="sm"
          />
        </Circle>
        <Circle   size="40px" bg="white" mt={"100px"}>
          <IconButton
            isRound
            icon={
              isMicrophoneOn ? (
                <Icon as={FaMicrophone} boxSize={4} />
              ) : (
                <Icon as={FaMicrophoneSlash} boxSize={4} />
              )
            }
            size="sm"
            onClick={toggleMicrophone}
          />
        </Circle>
        <Circle size="40px" bg="white">
          <IconButton
            isRound
            icon={
              isCameraOn ? (
                <Icon as={FaVideo} boxSize={4} />
              ) : (
                <Icon as={FaVideoSlash} boxSize={4} />
              )
            }
            size="sm"
            onClick={toggleCamera}
          />
        </Circle>
        <Circle size="40px" bg="white">
          <IconButton
            aria-label="Stop recording"
            isRound
            icon={<Icon as={BsRecord} boxSize={4} />}
            size="sm"
            onClick={() => setIsRecording(!isRecording)}
          />
        </Circle>
        <Circle size="40px" bg="white">
          <IconButton
            isRound
            icon={<Icon as={MdOutlineScreenshotMonitor} boxSize={4} />}
            size="sm"
            onClick={toggleScreenSharing}
          />
        </Circle>
      </Stack>

      {/* Video */}
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        autoPlay
        style={{
          marginTop: "20px",
        }}
      />

      {/* End Button */}
      <Button
        bg="#F63F4A"
        w="50px"
        position="absolute"
        bottom="20px"
        mt="40px"
        left="20px"
        borderRadius="27px"
        color="white"
        fontWeight={500}
        size="sm"
        onClick={() => setIsRecording(false)}
      >
        End
      </Button>
      </Box>
    </Box>
  );
};

export default RecordingLectures;

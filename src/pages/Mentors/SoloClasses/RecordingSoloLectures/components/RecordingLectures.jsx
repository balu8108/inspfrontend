// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Button,
//   IconButton,
//   Icon,
//   Circle,
//   Stack,
//   Tooltip,
//   HStack,
// } from "@chakra-ui/react";
// import {
//   FaMicrophone,
//   FaMicrophoneSlash,
//   FaVideo,
//   FaVideoSlash,
//   FaExpand,
//   FaDesktop,
// } from "react-icons/fa";
// import { BsRecord } from "react-icons/bs";
// import { CiPause1 } from "react-icons/ci";
// import { MdDesktopAccessDisabled } from "react-icons/md";
// import { useParams } from "react-router-dom";
// import { BASE_URL } from "../../../../../constants/staticurls";
// import { useNavigate } from "react-router-dom";
// const RecordingLectures = () => {
//   const navigate = useNavigate();
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const [screenSharingStream, setScreenSharingStream] = useState(null);
//   const [isCameraOn, setIsCameraOn] = useState(true);
//   const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
//   const [cameraState, setCameraState] = useState("disabled");
//   const [microphoneState, setMicrophoneState] = useState("disabled");
//   const [videoStream, setVideoStream] = useState(null);
//   const [audioStream, setAudioStream] = useState(null);
//   const [recordedVideo, setRecordedVideo] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [classEnded, setClassEnded] = useState(false);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [theatreMode, setTheatreMode] = useState(false);

//   const screenSharingVideoRef = useRef(null);
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);

//   const { soloClassRoomId } = useParams();

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
//       2,
//       "0"
//     )}:${String(secs).padStart(2, "0")}`;
//   };

//   // Update elapsed time every second
//   useEffect(() => {
//     let timerInterval;

//     if (isRecording) {
//       timerInterval = setInterval(() => {
//         setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
//       }, 1000);
//     } else {
//       clearInterval(timerInterval);
//     }

//     return () => {
//       clearInterval(timerInterval);
//     };
//   }, [isRecording]);

//   const toggleScreenSharing = async () => {
//     if (!isScreenSharing) {
//       try {
//         const screenStream = await navigator.mediaDevices.getDisplayMedia({
//           video: { cursor: "never" },
//           audio: false,
//         });

//         // Display the screen sharing video in the big box
//         screenSharingVideoRef.current.srcObject = screenStream;
//         setScreenSharingStream(screenStream);

//         setIsScreenSharing(true);
//       } catch (error) {
//         console.error("Error sharing the screen:", error);
//       }
//     } else {
//       // Stop screen sharing
//       if (screenSharingStream) {
//         screenSharingStream.getTracks().forEach((track) => track.stop());
//       }

//       screenSharingVideoRef.current.srcObject = null;
//       setScreenSharingStream(null);

//       setIsScreenSharing(!isScreenSharing);
//     }
//   };

//   const toggleCamera = () => {
//     const stream = videoRef.current.srcObject;
//     if (stream) {
//       const videoTrack = stream.getVideoTracks()[0];
//       videoTrack.enabled = !videoTrack.enabled;
//       setIsCameraOn(videoTrack.enabled);
//       setCameraState(videoTrack.enabled ? "on" : "off");
//     }
//   };

//   const toggleMicrophone = () => {
//     const stream = videoRef.current.srcObject;
//     if (stream) {
//       const audioTrack = stream.getAudioTracks()[0];
//       audioTrack.enabled = !audioTrack.enabled;
//       setIsMicrophoneOn(audioTrack.enabled);
//       setMicrophoneState(audioTrack.enabled ? "on" : "off");
//     }
//   };

//   const startRecording = async () => {
//     console.log("Start Recording");
//     try {
//       const videoStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//       });
//       const audioStream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//       });

//       let combinedStream = new MediaStream();

//       if (screenSharingStream) {
//         combinedStream.addTrack(screenSharingStream.getVideoTracks()[0]);
//       }

//       combinedStream.addTrack(videoStream.getVideoTracks()[0]);
//       combinedStream.addTrack(audioStream.getAudioTracks()[0]);

//       videoRef.current.srcObject = combinedStream;

//       const mediaRecorder = new MediaRecorder(combinedStream, {
//         mimeType: "video/webm",
//       });
//       const chunks = [];

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const blob = new Blob(chunks, { type: "video/webm" });
//         setRecordedVideo(URL.createObjectURL(blob));
//         // Now that recording is complete, upload the video to AWS
//         uploadVideoToAWS(blob, soloClassRoomId);
//       };

//       mediaRecorderRef.current = mediaRecorder;
//       mediaRecorder.start();
//     } catch (error) {
//       console.error("Error accessing camera or microphone:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//     }

//     if (videoStream) {
//       videoStream.getTracks().forEach((track) => track.stop());
//     }

//     if (audioStream) {
//       audioStream.getTracks().forEach((track) => track.stop());
//     }

//     videoRef.current.srcObject = null; // Stop the video playback
//   };
//   const toggleRecording = () => {
//     setIsRecording(!isRecording);

//     // setTimerActive(true);
//     if (isRecording) {
//       setCameraState("disabled");
//       setMicrophoneState("disabled");
//     } else {
//       setCameraState("on");
//       setMicrophoneState("on");
//     }
//   };

//   useEffect(() => {
//     if (isRecording) {
//       startRecording();
//     } else {
//       stopRecording();
//     }
//   }, [isRecording]);

//   const uploadVideoToAWS = async (recordedVideo, soloClassRoomId) => {
//     const fileName = `sololecture_${soloClassRoomId}.webm`;

//     const file = new File([recordedVideo], fileName, {
//       type: "video/webm",
//     });
//     const formData = new FormData();

//     formData.append("files", file);
//     formData.append("soloClassRoomId", soloClassRoomId);

//     try {
//       const response = await fetch(
//         `${BASE_URL}/solo-lecture/solo-classroom-recording/${soloClassRoomId}`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       //   if (response.ok) {
//       //     setClassEnded(true);
//       //     // End the class immediately regardless of video upload status
//       //     window.location.href = "/homepage";
//       //   } else {
//       //     console.error("Error uploading video to AWS:", response.status);
//       //     // Handle the error as needed
//       //   }
//     } catch (error) {
//       console.error("Error uploading video to AWS:", error);
//       // Handle the error as needed
//     }
//   };

//   const endClass = () => {
//     if (isRecording) {
//       // If recording is in progress, stop recording
//       toggleRecording();
//     }

//     // Now that the class has ended, you can navigate to the homepage
//     window.location.href = "/homepage";

//     // Replace the current history entry with a new entry that has the same pathname.
//     window.history.replaceState(null, null, `/mentor/solo-recordings/topic`);
//   };

//   return (
//     <Box
//       h="80vh"
//       //   width={"95%"}
//       width={theatreMode ? "120%" : "90%"}
//       borderRadius="12px"
//       boxShadow="md"
//       position="relative"
//       display="flex"
//       flexDirection="column"
//       bg={"black"}
//     >
//       <Stack
//         position="absolute"
//         top="20px"
//         left="20px"
//         zIndex="1"
//         direction="column"
//       >
//         <HStack gap={"18px"}>
//           <Circle size="40px" bg="white">
//             <Tooltip label="Theatre Mode" placement="right">
//               <IconButton
//                 isRound={"true"}
//                 icon={<Icon as={FaExpand} boxSize={4} />}
//                 size="sm"
//                 onClick={() => setTheatreMode(!theatreMode)}
//               />
//             </Tooltip>
//           </Circle>

//           <Box top="20px" bg={"#F1F5F8"} padding="5px" borderRadius="27px">
//             {formatTime(elapsedTime)}
//           </Box>
//         </HStack>
//         <Circle size="40px" bg="white" mt={10}>
//           <Tooltip label={`Camera ${cameraState}`} placement="right">
//             <IconButton
//               isRound
//               icon={
//                 <Icon as={isCameraOn ? FaVideo : FaVideoSlash} boxSize={4} />
//               }
//               size="sm"
//               onClick={toggleCamera}
//             />
//           </Tooltip>
//         </Circle>
//         <Circle size="40px" bg="white">
//           <Tooltip label={`Microphone ${microphoneState}`} placement="right">
//             <IconButton
//               isRound
//               icon={
//                 <Icon
//                   as={isMicrophoneOn ? FaMicrophone : FaMicrophoneSlash}
//                   boxSize={4}
//                 />
//               }
//               size="sm"
//               onClick={toggleMicrophone}
//             />
//           </Tooltip>
//         </Circle>

//         <Circle size="40px" bg="white" mt={5}>
//           <Tooltip
//             label={isRecording ? "Stop Recording" : "Start Recording"}
//             placement="right"
//           >
//             <IconButton
//               isRound
//               icon={<Icon as={BsRecord} boxSize={4} />}
//               size="sm"
//               onClick={toggleRecording}
//             />
//           </Tooltip>
//         </Circle>

//         {/* <Circle size="40px" bg="white">
//           <Tooltip label={"Pause"} placement="right">
//             <IconButton
//               isRound
//               icon={<Icon as={CiPause1} boxSize={4} />}
//               size="sm"
//             />
//           </Tooltip>
//         </Circle> */}
//         <Circle size="40px" bg="white">
//           <Tooltip label="Screen Sharing " placement="right">
//             <IconButton
//               icon={
//                 isScreenSharing ? (
//                   <Icon as={FaDesktop} boxSize={4} />
//                 ) : (
//                   <Icon as={MdDesktopAccessDisabled} boxSize={4} />
//                 )
//               }
//               size="sm"
//               onClick={toggleScreenSharing}
//             />
//           </Tooltip>
//         </Circle>
//         <Button
//           bg="#F63F4A"
//           w="50px"
//           borderRadius="27px"
//           color="white"
//           mt={"50%"}
//           fontWeight={500}
//           size="sm"
//           onClick={endClass}
//         >
//           End
//         </Button>
//       </Stack>

//       <Box position="absolute" top="0" left="0" width="100%" height="100%">
//         <video
//           ref={screenSharingVideoRef}
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             overflow: "hidden",
//             borderRadius: "20px",
//             background: "black",
//           }}
//           autoPlay
//         />
//       </Box>

//        <Box position="absolute" ml={"70%"} mt={"4%"}>
//         <video
//           ref={videoRef}
//           style={{
//             width: "60%",
//             height: "60%",

//             objectFit: "cover",
//             overflow: "hidden",
//             borderRadius: "20px",
//             background: "black",
//             visibility: isRecording ? "visible" : "hidden",
//           }}
//           autoPlay
//         />
//       </Box>

//     </Box>
//   );
// };
// export default RecordingLectures;

// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Button,
//   IconButton,
//   Icon,
//   Circle,
//   Stack,
//   Tooltip,
//   HStack,
// } from "@chakra-ui/react";
// import {
//   FaMicrophone,
//   FaMicrophoneSlash,
//   FaVideo,
//   FaVideoSlash,
//   FaExpand,
//   FaDesktop,
// } from "react-icons/fa";
// import { BsRecord } from "react-icons/bs";
// import { CiPause1 } from "react-icons/ci";
// import { MdDesktopAccessDisabled } from "react-icons/md";
// import { AiOutlineStop } from "react-icons/ai";
// import { useParams } from "react-router-dom";
// import { BASE_URL } from "../../../../../constants/staticurls";
// import { useNavigate } from "react-router-dom";

// const RecordingLectures = () => {
//   const navigate = useNavigate();
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const [screenSharingStream, setScreenSharingStream] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isCameraOn, setIsCameraOn] = useState(false);
//   const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
//   //   const [microphoneStream, setMicrophoneStream] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [theatreMode, setTheatreMode] = useState(false);

//   const cameraVideoRef = useRef(null);
//   const microphoneStream = useRef(null);

//   const screenSharingVideoRef = useRef(null);
//   const screenSharingStreamRef = useRef(null);

//   const mediaRecorderRef = useRef(null);
//   const recordedChunksRef = useRef([]);

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
//       2,
//       "0"
//     )}:${String(secs).padStart(2, "0")}`;
//   };

//   // Update elapsed time every second
//   useEffect(() => {
//     let timerInterval;

//     if (isRecording) {
//       timerInterval = setInterval(() => {
//         setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
//       }, 1000);
//     } else {
//       clearInterval(timerInterval);
//     }

//     return () => {
//       clearInterval(timerInterval);
//     };
//   }, [isRecording]);

//   const toggleCamera = async () => {
//     if (!isCameraOn) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         cameraVideoRef.current.srcObject = stream;
//         setIsCameraOn(true);
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }
//     } else {
//       const stream = cameraVideoRef.current.srcObject;
//       if (stream) {
//         const tracks = stream.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//       cameraVideoRef.current.srcObject = null;
//       setIsCameraOn(false);
//     }
//   };

//   // toogle microphone.
//   const toggleMicrophone = async () => {
//     if (!isMicrophoneOn) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//         });
//         microphoneStream.current = stream;
//         setIsMicrophoneOn(true);
//       } catch (error) {
//         console.error("Error accessing microphone:", error);
//       }
//     } else {
//       const stream = microphoneStream.current;
//       if (stream) {
//         const tracks = stream.getAudioTracks();
//         tracks.forEach((track) => track.stop());
//       }
//       microphoneStream.current = null;
//       setIsMicrophoneOn(false);
//     }
//   };

//   //
//   const toggleScreenSharing = async () => {
//     if (!isScreenSharing) {
//       try {
//         const screenStream = await navigator.mediaDevices.getDisplayMedia({
//           video: true,
//         });
//         screenSharingVideoRef.current.srcObject = screenStream;
//         screenSharingStreamRef.current = screenStream;
//         setIsScreenSharing(true);
//       } catch (error) {
//         console.error("Error accessing screen sharing:", error);
//       }
//     } else {
//       const screenStream = screenSharingStreamRef.current;
//       if (screenStream) {
//         const tracks = screenStream.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//       screenSharingVideoRef.current.srcObject = null;
//       screenSharingStreamRef.current = null;
//       setIsScreenSharing(false);
//     }
//   };

//   const startRecording = async () => {
//     try {
//       // Get the video stream
//       const videoStream = isCameraOn
//         ? await navigator.mediaDevices.getUserMedia({ video: true })
//         : null;

//       // Get the audio stream
//       const audioStream = isMicrophoneOn
//         ? await navigator.mediaDevices.getUserMedia({ audio: true })
//         : null;

//       // Combine the video, audio, and screen sharing streams
//       const combinedStream = new MediaStream();

//       if (screenSharingStream) {
//         screenSharingStream.getTracks().forEach((track) => combinedStream.addTrack(track));
//       }

//       if (audioStream) {
//         audioStream.getTracks().forEach((track) => combinedStream.addTrack(track));
//       }

//       if (videoStream) {
//         videoStream.getTracks().forEach((track) => combinedStream.addTrack(track));
//       }

//       // Create a MediaRecorder with the combined stream
//       mediaRecorderRef.current = new MediaRecorder(combinedStream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           recordedChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         // Recording stopped
//         stopRecording(); // You can implement this function to save the recorded chunks as a video file.
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Error accessing the audio or video stream:", error);
//     }
//   };

//   const stopRecording = () => {
//     const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });

//     // Create an object URL for the blob
//     const url = window.URL.createObjectURL(blob);

//     // Create a download link
//     const a = document.createElement("a");
//     a.style.display = "none";
//     a.href = url;
//     a.download = "recording.webm";

//     // Append the download link to the body
//     document.body.appendChild(a);

//     // Trigger a click event on the download link
//     a.click();

//     // Remove the download link from the body
//     document.body.removeChild(a);

//     // Revoke the object URL to free up resources
//     window.URL.revokeObjectURL(url);
//   };

//   const toggleRecording = () => {
//     if (isRecording) {
//       // Stop recording
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//       stopRecording(); // You can implement this function to save the recorded chunks as a video file.
//     } else {
//       // Start recording
//       startRecording();
//     }
//   };

//   return (
//     <Box
//       h="80vh"
//       width={theatreMode ? "120%" : "90%"}
//       borderRadius="12px"
//       boxShadow="md"
//       position="relative"
//       display="flex"
//       flexDirection="column"
//       bg={"black"}
//     >
//       <Stack
//         position="absolute"
//         top="20px"
//         left="20px"
//         zIndex="1"
//         direction="column"
//       >
//         <HStack gap={"18px"}>
//           <Circle size="40px" bg="white">
//             <Tooltip label="Theatre Mode" placement="right">
//               <IconButton
//                 isRound
//                 icon={<Icon as={FaExpand} boxSize={4} />}
//                 size="sm"
//                 onClick={() => setTheatreMode(!theatreMode)}
//               />
//             </Tooltip>
//           </Circle>

//           <Box top="20px" bg={"#F1F5F8"} padding="5px" borderRadius="27px">
//             {formatTime(elapsedTime)}
//           </Box>
//         </HStack>
//         <Circle size="40px" bg="white" mt={10}>
//           <Tooltip
//             label={isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
//             placement="right"
//           >
//             <IconButton
//               isRound
//               icon={
//                 <Icon as={isCameraOn ? FaVideo : FaVideoSlash} boxSize={4} />
//               }
//               size="sm"
//               onClick={toggleCamera}
//             />
//           </Tooltip>
//         </Circle>
//         <Circle size="40px" bg="white">
//           <Tooltip
//             label={isMicrophoneOn ? "Mute Microphone" : "Unmute Microphone"}
//             placement="right"
//           >
//             <IconButton
//               isRound
//               icon={
//                 <Icon
//                   as={isMicrophoneOn ? FaMicrophone : FaMicrophoneSlash}
//                   boxSize={4}
//                 />
//               }
//               size="sm"
//               onClick={toggleMicrophone} // Toggle microphone on click
//             />
//           </Tooltip>
//         </Circle>

//         <Circle size="40px" bg="white" mt={5}>
//           <Tooltip
//             label={isRecording ? "Stop Recording" : "Start Recording"}
//             placement="right"
//           >
//             <IconButton
//               isRound
//               icon={
//                 isRecording ? (
//                   <Icon as={BsRecord} boxSize={4} />
//                 ) : (
//                   <Icon as={AiOutlineStop} boxSize={4} />
//                 )
//               }
//               size="sm"
//               onClick={toggleRecording}
//             />
//           </Tooltip>
//         </Circle>

//         <Circle size="40px" bg="white">
//           <Tooltip label="Screen Sharing" placement="right">
//             <IconButton
//               icon={
//                 isScreenSharing ? (
//                   <Icon as={FaDesktop} boxSize={4} />
//                 ) : (
//                   <Icon as={MdDesktopAccessDisabled} boxSize={4} />
//                 )
//               }
//               size="sm"
//               onClick={toggleScreenSharing}
//             />
//           </Tooltip>
//         </Circle>

//         <Button
//           bg="#F63F4A"
//           w="50px"
//           borderRadius="27px"
//           color="white"
//           mt={"50%"}
//           fontWeight={500}
//           size="sm"
//         >
//           End
//         </Button>
//       </Stack>

//       <Box position="absolute" top="0" left="0" width="100%" height="100%">
//         <video
//           ref={screenSharingVideoRef}
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             overflow: "hidden",
//             borderRadius: "20px",
//             background: "black",
//           }}
//           autoPlay
//         />
//       </Box>

//       <Box position="absolute" top="50px" right="10px" width="30%" height="35%">
//         {/* Small video box for camera feed */}
//         <video
//           ref={cameraVideoRef}
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             overflow: "hidden",
//             borderRadius: "10px",
//             background: "black",
//             visibility: isCameraOn ? "visible" : "hidden",
//           }}
//           autoPlay
//         />
//       </Box>
//     </Box>
//   );
// };

// export default RecordingLectures;

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  Icon,
  Circle,
  Stack,
  Tooltip,
  HStack,
  Collapse,
  useDisclosure
} from "@chakra-ui/react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaExpand,
  FaDesktop,
} from "react-icons/fa";
import { BsRecord } from "react-icons/bs";
import { MdDesktopAccessDisabled } from "react-icons/md";
import { AiOutlineStop } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../../constants/staticurls";
import { useNavigate } from "react-router-dom";

const RecordingLectures = () => {
  const navigate = useNavigate();
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
 

  const [elapsedTime, setElapsedTime] = useState(0);

  const cameraVideoRef = useRef(null);
  const screenSharingVideoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

 

  useEffect(() => {
    let timerInterval;

    if (isRecording) {
      timerInterval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1); // Update elapsed time using useState
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRecording]);

  const toggleCamera = async () => {
    if (!isCameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        cameraVideoRef.current.srcObject = stream;
        setIsCameraOn(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    } else {
      const stream = cameraVideoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      cameraVideoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };
  const audioStreamRef = useRef(null); // Ref to store the audio stream

  const toggleMicrophone = async () => {
    if (!isMicrophoneOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioStreamRef.current = stream; // Store the audio stream in the ref
        setIsMicrophoneOn(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    } else {
      // Stop the audio tracks from the stored audio stream
      const audioStream = audioStreamRef.current;
      if (audioStream) {
        const audioTracks = audioStream.getAudioTracks();
        audioTracks.forEach((track) => track.stop());
      }
      audioStreamRef.current = null;
      setIsMicrophoneOn(false);
    }
  };

  const toggleScreenSharing = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        screenSharingVideoRef.current.srcObject = screenStream;
        setScreenSharingStream(screenStream);
        setIsScreenSharing(true);
      } catch (error) {
        console.error("Error accessing screen sharing:", error);
      }
    } else {
      const screenStream = screenSharingStream;
      if (screenStream) {
        const tracks = screenStream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      screenSharingVideoRef.current.srcObject = null;
      setScreenSharingStream(null);
      setIsScreenSharing(false);
    }
  };

  const startRecording = async () => {
    try {
      // Get the video stream
      const videoStream = isCameraOn
        ? await navigator.mediaDevices.getUserMedia({ video: true })
        : null;

      // Get the audio stream
      const audioStream = isMicrophoneOn
        ? audioStreamRef.current // Use the stored audio stream
        : null;

      // Combine the video, audio, and screen sharing streams
      const combinedStream = new MediaStream();

      if (screenSharingStream) {
        screenSharingStream
          .getTracks()
          .forEach((track) => combinedStream.addTrack(track));
      }

      if (audioStream) {
        audioStream
          .getTracks()
          .forEach((track) => combinedStream.addTrack(track));
      }

      if (videoStream) {
        videoStream
          .getTracks()
          .forEach((track) => combinedStream.addTrack(track));
      }

      // Create a MediaRecorder with the combined stream
      mediaRecorderRef.current = new MediaRecorder(combinedStream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        // Recording stopped
        stopRecording(); // You can implement this function to save the recorded chunks as a video file.
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing the audio or video stream:", error);
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });

      // Create an object URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a download link
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "recorded-video.webm"; // You can change the filename as needed

      // Append the download link to the body
      document.body.appendChild(a);

      // Trigger a click event on the download link
      a.click();

      // Remove the download link from the body
      document.body.removeChild(a);

      // Revoke the object URL to free up resources
      window.URL.revokeObjectURL(url);

      console.log("Recording stopped. Video URL:", url);
    }
  };

  //   const toggleRecording = () => {
  //     if (isRecording) {
  //       // Stop recording
  //       stopRecording();
  //     } else {
  //       // Start recording
  //       startRecording();
  //     }
  //   };

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      stopRecording();
    } else {
      if (isScreenSharing && isMicrophoneOn) {
        // Start recording
        startRecording();
      } else {
        // You can provide a message or an alert to the user to indicate that both screen share and microphone must be enabled before starting the recording.
        alert(
          "Please enable both screen sharing and microphone before starting the recording."
        );
      }
    }
  };

  return (
    <Box
      h="80vh"
      width={"90%"}
      borderRadius="12px"
      boxShadow="md"
      position="relative"
      display="flex"
      flexDirection="column"
      bg={"black"}
    >
   
      <Stack
        position="absolute"
        top="20px"
        left="20px"
        zIndex="1"
        direction="column"
      >
        <HStack gap={"18px"}>
          <Circle size="40px" bg="white">
            <Tooltip label="Theatre Mode" placement="right">
              <IconButton
                isRound
                icon={<Icon as={FaExpand} boxSize={4} />}
                size="sm"
                
              />
            </Tooltip>
          </Circle>

          <Box top="20px" bg={"#F1F5F8"} padding="5px" borderRadius="27px">
            {formatTime(elapsedTime)}
          </Box>
        </HStack>
        <Circle size="40px" bg="white" mt={10}>
          <Tooltip
            label={isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
            placement="right"
          >
            <IconButton
              isRound
              icon={
                <Icon as={isCameraOn ? FaVideo : FaVideoSlash} boxSize={4} />
              }
              size="sm"
              onClick={toggleCamera}
            />
          </Tooltip>
        </Circle>
        <Circle size="40px" bg="white">
          <Tooltip
            label={isMicrophoneOn ? "Mute Microphone" : "Unmute Microphone"}
            placement="right"
          >
            <IconButton
              isRound
              icon={
                <Icon
                  as={isMicrophoneOn ? FaMicrophone : FaMicrophoneSlash}
                  boxSize={4}
                />
              }
              size="sm"
              onClick={toggleMicrophone}
            />
          </Tooltip>
        </Circle>

        <Circle size="40px" bg="white" mt={5}>
          <Tooltip
            label={isRecording ? "Stop Recording" : "Start Recording"}
            placement="right"
          >
            <IconButton
              isRound
              icon={
                isRecording ? (
                  <Icon as={BsRecord} boxSize={4} />
                ) : (
                  <Icon as={AiOutlineStop} boxSize={4} />
                )
              }
              size="sm"
              onClick={toggleRecording}
            />
          </Tooltip>
        </Circle>

        <Circle size="40px" bg="white">
          <Tooltip label="Screen Sharing" placement="right">
            <IconButton
              icon={
                isScreenSharing ? (
                  <Icon as={FaDesktop} boxSize={4} />
                ) : (
                  <Icon as={MdDesktopAccessDisabled} boxSize={4} />
                )
              }
              size="sm"
              onClick={toggleScreenSharing}
            />
          </Tooltip>
        </Circle>

        <Button
          bg="#F63F4A"
          w="50px"
          borderRadius="27px"
          color="white"
          mt={"50%"}
          fontWeight={500}
          size="sm"
        >
          End
        </Button>
      </Stack>
     

      <Box position="absolute" top="0" left="0" width="100%" height="100%">
        <video
          ref={screenSharingVideoRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            overflow: "hidden",
            borderRadius: "20px",
            background: "black",
          }}
          autoPlay
        />
      </Box>

      <Box position="absolute" top="50px" right="10px" width="30%" height="35%">
        {/* Small video box for camera feed */}
        <video
          ref={cameraVideoRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            overflow: "hidden",
            borderRadius: "10px",
            background: "black",
            visibility: isCameraOn ? "visible" : "hidden",
          }}
          autoPlay
        />
      </Box>
    </Box>
  );
};

export default RecordingLectures;

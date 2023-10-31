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
import { CiPause1 } from "react-icons/ci";
import { MdDesktopAccessDisabled } from "react-icons/md";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../../constants/staticurls";
import { useNavigate } from "react-router-dom";
const RecordingLectures = () => {
  const navigate = useNavigate();
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [cameraState, setCameraState] = useState("disabled");
  const [microphoneState, setMicrophoneState] = useState("disabled");
  const [videoStream, setVideoStream] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [classEnded, setClassEnded] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // Define elapsedTime here
  const screenSharingVideoRef = useRef(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const { soloClassRoomId } = useParams();

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  // Update elapsed time every second
  useEffect(() => {
    let timerInterval;

    if (isRecording) {
      timerInterval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRecording]);

  const toggleScreenSharing = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: { cursor: "never" },
          audio: false,
        });

        // Display the screen sharing video in the big box
        screenSharingVideoRef.current.srcObject = screenStream;
        setScreenSharingStream(screenStream);

        setIsScreenSharing(true);
      } catch (error) {
        console.error("Error sharing the screen:", error);
      }
    } else {
      // Stop screen sharing
      if (screenSharingStream) {
        screenSharingStream.getTracks().forEach((track) => track.stop());
      }

      screenSharingVideoRef.current.srcObject = null;
      setScreenSharingStream(null);

      setIsScreenSharing(!isScreenSharing);
    }
  };

  const toggleCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsCameraOn(videoTrack.enabled);
      setCameraState(videoTrack.enabled ? "on" : "off");
    }
  };

  const toggleMicrophone = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicrophoneOn(audioTrack.enabled);
      setMicrophoneState(audioTrack.enabled ? "on" : "off");
    }
  };

  const startRecording = async () => {
    console.log("Start Recording");
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      let combinedStream = new MediaStream();

      if (screenSharingStream) {
        combinedStream.addTrack(screenSharingStream.getVideoTracks()[0]);
      }

      combinedStream.addTrack(videoStream.getVideoTracks()[0]);
      combinedStream.addTrack(audioStream.getAudioTracks()[0]);

      videoRef.current.srcObject = combinedStream;

      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: "video/webm",
      });
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setRecordedVideo(URL.createObjectURL(blob));
        // Now that recording is complete, upload the video to AWS
        uploadVideoToAWS(blob, soloClassRoomId);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing camera or microphone:", error);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
    }

    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }

    videoRef.current.srcObject = null; // Stop the video playback
  };
  const toggleRecording = () => {
    setIsRecording(!isRecording);

    // setTimerActive(true);
    if (isRecording) {
      setCameraState("disabled");
      setMicrophoneState("disabled");
    } else {
      setCameraState("on");
      setMicrophoneState("on");
    }
  };

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  const uploadVideoToAWS = async (recordedVideo, soloClassRoomId) => {
    const fileName = `sololecture_${soloClassRoomId}.webm`;

    const file = new File([recordedVideo], fileName, {
      type: "video/webm",
    });
    const formData = new FormData();

    formData.append("files", file);
    formData.append("soloClassRoomId", soloClassRoomId);

    try {
      const response = await fetch(
        `${BASE_URL}/solo-lecture/solo-classroom-recording/${soloClassRoomId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      //   if (response.ok) {
      //     setClassEnded(true);
      //     // End the class immediately regardless of video upload status
      //     window.location.href = "/homepage";
      //   } else {
      //     console.error("Error uploading video to AWS:", response.status);
      //     // Handle the error as needed
      //   }
    } catch (error) {
      console.error("Error uploading video to AWS:", error);
      // Handle the error as needed
    }
  };

  const endClass = () => {
    if (isRecording) {
      // If recording is in progress, stop recording
      toggleRecording();
    }

    // Now that the class has ended, you can navigate to the homepage
    window.location.href = "/homepage";

    // Replace the current history entry with a new entry that has the same pathname.
    window.history.replaceState(null, null, `/mentor/solo-recordings/topic`);
  };

  return (
    <Box
      h="80vh"
      width={"95%"}
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
                isRound={"true"}
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
          <Tooltip label={`Camera ${cameraState}`} placement="right">
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
          <Tooltip label={`Microphone ${microphoneState}`} placement="right">
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
              icon={<Icon as={BsRecord} boxSize={4} />}
              size="sm"
              onClick={toggleRecording}
            />
          </Tooltip>
        </Circle>

        {/* <Circle size="40px" bg="white">
          <Tooltip label={"Pause"} placement="right">
            <IconButton
              isRound
              icon={<Icon as={CiPause1} boxSize={4} />}
              size="sm"
            />
          </Tooltip>
        </Circle> */}
        <Circle size="40px" bg="white">
          <Tooltip label="Screen Sharing " placement="right">
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
          onClick={endClass}
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

      <Box position="absolute" ml={"70%"} mt={"8%"}>
        <video
          ref={videoRef}
          style={{
            width: "80%",
            height: "80%",

            objectFit: "cover",
            overflow: "hidden",
            borderRadius: "20px",
            background: "black",
          }}
          autoPlay
        />
      </Box>
    </Box>
  );
};
export default RecordingLectures;

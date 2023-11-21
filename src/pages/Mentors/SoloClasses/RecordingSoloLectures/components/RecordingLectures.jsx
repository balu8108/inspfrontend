import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  Tooltip,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { RiFullscreenLine } from "react-icons/ri";
import {
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiCircle,
  FiMonitor,
} from "react-icons/fi";
import { LuMonitorOff, LuCircleOff } from "react-icons/lu";

import { boxShadowStyles } from "../../../../../utils";
const RecordingLectures = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const cameraVideoRef = useRef(null);
  const audioStreamRef = useRef(null);
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

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        if (recordedChunksRef.current.length > 0) {
          // Combine the recorded chunks into a single Blob
          const blob = new Blob(recordedChunksRef.current, {
            type: "video/webm",
          });

          // Create an object URL for the Blob
          const url = window.URL.createObjectURL(blob);

          // Create a download link for the video
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "recorded-video.webm";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          // Revoke the object URL to free up resources
          window.URL.revokeObjectURL(url);
        }
        recordedChunksRef.current = [];
      };
    }
  };

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

  const endClass = () => {
    if (isRecording) {
      toggleRecording();
    }
    window.location.href = "/homepage";
    window.history.replaceState(null, null, `/mentor/solo-recordings/topic`);
  };

  return (
    <Box
      w={"100%"}
      h={"95vh"}
      bg={"#F1F5F8"}
      borderRadius={"26px"}
      position="relative"
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
    >
      <Box
        h={"90vh"}
        bg={"black"}
        m={"12px"}
        borderRadius={"8"}
        position="relative"
      >
        <Flex
          height={"100%"}
          direction={"column"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          ml={"16px"}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        >
          <Stack>
            <HStack spacing={"16px"}>
              <Tooltip label="Theatre Mode" placement="right">
                <IconButton
                  isRound={true}
                  variant="solid"
                  fontSize="20px"
                  mt={"16px"}
                  icon={<RiFullscreenLine />}
                />
              </Tooltip>

              <Box mt="3" bg={"#F1F5F8"} padding="5px" borderRadius="27px">
                {formatTime(elapsedTime)}
              </Box>
            </HStack>
          </Stack>

          <Stack>
            <Tooltip
              label={isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
              placement="right"
            >
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme={isCameraOn ? "gray" : "red"}
                aria-label="Toggle Camera"
                fontSize="20px"
                mt={"20px"}
                icon={isCameraOn ? <FiVideo /> : <FiVideoOff />}
                onClick={toggleCamera}
              />
            </Tooltip>
            <Tooltip
              label={
                isMicrophoneOn ? "Turn Off Microphone" : "Turn On Microphone"
              }
              placement="right"
            >
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme={isMicrophoneOn ? "gray" : "red"}
                aria-label="Done"
                fontSize="20px"
                icon={isMicrophoneOn ? <FiMic /> : <FiMicOff />}
                onClick={toggleMicrophone}
              />
            </Tooltip>
          </Stack>
          <Stack>
            <IconButton
              isRound={true}
              variant="solid"
              colorScheme={isRecording ? "gray" : "red"}
              aria-label="Done"
              fontSize="20px"
              icon={isRecording ? <FiCircle /> : <LuCircleOff />}
              onClick={toggleRecording}
            />

            <Tooltip
              label={isScreenSharing ? "Stop Presenting" : "Present Now"}
              placement="right"
            >
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme={isScreenSharing ? "gray" : "red"}
                aria-label="Done"
                fontSize="20px"
                icon={isScreenSharing ? <FiMonitor /> : <LuMonitorOff />}
                onClick={toggleScreenSharing}
              />
            </Tooltip>
          </Stack>
          <Button
            bg="#F63F4A"
            w="80px"
            h="40px"
            borderRadius="27px"
            color="white"
            fontWeight={500}
            size="sm"
            mb={"25px"}
            _hover={"#F63F4A"}
          >
            End
          </Button>
        </Flex>

        <Box position="absolute" top="0" right="0" width="100%" height="100%">
          <video
            ref={screenSharingVideoRef}
            style={{
              width: "100%",
              height: "100%",
              background: "black",
              borderRadius: "8px",
              objectFit: "cover",
              visibility: isScreenSharing ? "visible" : "hidden",
            }}
            autoPlay
          />
        </Box>

        <Box
          position="absolute"
          top="50px"
          right="10px"
          width="30%"
          height="35%"
        >
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
    </Box>
  );
};

export default RecordingLectures;

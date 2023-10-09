import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  Icon,
  Circle,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaExpand,
} from "react-icons/fa";
import { BsRecord } from "react-icons/bs";
import { MdOutlineScreenshotMonitor } from "react-icons/md";
import { useParams } from "react-router-dom";
const RecordingLectures = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);

  const chunksRef = useRef([]);

  const { soloClassRoomId } = useParams();

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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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

    const videoBlob = new Blob(chunksRef.current, { type: "video/webm" });
    setVideoFile(videoBlob);
  };

  const uploadVideoToAWS = async () => {
    const formData = new FormData();
    formData.append("files", videoFile);
    formData.append("soloClassRoomId", soloClassRoomId);
    const response = await fetch(
      `http://localhost:5000/solo-lecture/solo-classroom-recording/${soloClassRoomId}`,
      {
        method: "POST",
        body: formData,
      }
    );
  };

  return (
    <Box
      h="80vh"
      // w="80%"
      width={isExpanded ? "120%" : "80%"}
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
        <Circle size="40px" bg="white">
          <Tooltip label="Expand">
            <IconButton
              isRound={"true"}
              icon={<Icon as={FaExpand} boxSize={4} />}
              size="sm"
              onClick={toggleExpand}
            />
          </Tooltip>
        </Circle>

        <Circle size="40px" bg="white" mt={10}>
          <Tooltip label="Microphone">
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
          </Tooltip>
        </Circle>
        <Circle size="40px" bg="white">
          <Tooltip label="Camera">
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
          </Tooltip>
        </Circle>
        <Circle size="40px" bg="white">
          <Tooltip label="Recording">
            <IconButton
              aria-label="Stop recording"
              isRound
              icon={<Icon as={BsRecord} boxSize={4} />}
              size="sm"
              onClick={() => setIsRecording(!isRecording)}
            />
          </Tooltip>
        </Circle>
        <Circle size="40px" bg="white">
          <Tooltip label="Screen Sharing ">
            <IconButton
              isRound
              icon={<Icon as={MdOutlineScreenshotMonitor} boxSize={4} />}
              size="sm"
              onClick={toggleScreenSharing}
            />
          </Tooltip>
        </Circle>
      </Stack>

      <Box position="absolute" top={"5%"} left={"80%"} mr={5} zIndex={1}>
        <video
          ref={videoRef}
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
        onClick={() => {
          stopRecording();
          uploadVideoToAWS();
        }}
      >
        End
      </Button>
    </Box>
  );
};

export default RecordingLectures;

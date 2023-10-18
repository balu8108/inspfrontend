import React, { useState, useEffect, useRef } from "react";
import { Box, Button, IconButton, Icon, Circle, Stack, Tooltip } from "@chakra-ui/react";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaExpand } from "react-icons/fa";
import { BsRecord } from "react-icons/bs";
import { MdOutlineScreenshotMonitor } from "react-icons/md";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../../constants/staticurls";

const RecordingLectures = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [recordedVideo, setRecordedVideo] = useState(null);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

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

  const startRecording = async() => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const stream = new MediaStream([
        ...videoStream.getTracks(),
        ...audioStream.getTracks(),
      ]);
      videoRef.current.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setRecordedVideo(URL.createObjectURL(blob));
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
  };

  const uploadVideoToAWS = async () => {
    const formData = new FormData();
    formData.append("files", recordedVideo);
    formData.append("soloClassRoomId", soloClassRoomId);
    const response = await fetch(
      `${BASE_URL}/solo-lecture/solo-classroom-recording/${soloClassRoomId}`,
      {
        method: "POST",
        body: formData,
      }
    );

    // End the class immediately regardless of video upload status
    window.location.href = "/mentor/solo-recordings/topic";
  };

  return (
    <Box
      h="80vh"
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

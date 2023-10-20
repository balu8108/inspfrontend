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
} from "react-icons/fa";
import { BsRecord } from "react-icons/bs";
import { CiPause1 } from "react-icons/ci";
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
  const [classEnded, setClassEnded] = useState(false);
  const [isCameraDisabled, setIsCameraDisabled] = useState(false);
  const [isMicrophoneDisabled, setIsMicrophoneDisabled] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [cameraState, setCameraState] = useState("disabled");
  const [microphoneState, setMicrophoneState] = useState("disabled");
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState(0); // Track the time when the timer is paused
  const [timerOffset, setTimerOffset] = useState(0);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const { soloClassRoomId } = useParams();

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    setTimerActive(!isRecording);
    // setTimerActive(true);
    if (isRecording) {
      setCameraState("disabled");
      setMicrophoneState("disabled");
      pauseTimer();
    } else {
      setCameraState("on");
      setMicrophoneState("on");
      startTimer();
    }
  };

  // const togglePause = () => {
  //   if (isRecording) {
  //     if (isTimerPaused) {
  //       // If the timer is paused, resume it
  //       setTimerActive(true);
  //       setCameraState("on"); // Camera is on
  //       setMicrophoneState("on"); // Microphone is on
  //     } else {
  //       // If the timer is not paused, pause it
  //       setTimerActive(false);
  //       setCameraState("off"); // Camera is off
  //       setMicrophoneState("off"); // Microphone is off
  //     }
  //     setIsTimerPaused(!isTimerPaused); // Toggle the pause state
  //   }
  // };

  const togglePause = () => {
    if (isRecording) {
      if (isTimerPaused) {
        // If the timer is paused, resume it
        const currentTime = new Date();
        const elapsedMilliseconds = currentTime - pausedTime;
        setStartTime(new Date(startTime.getTime() + elapsedMilliseconds));
        setTimerActive(true);
        setCameraState("on");
        setMicrophoneState("on");
      } else {
        setTimerActive(false);
        setCameraState("off");
        setMicrophoneState("off");
        const currentTime = new Date();
        setPausedTime(currentTime);
      }
      setIsTimerPaused(!isTimerPaused);
    }
  };

  useEffect(() => {
    if (isRecording && !isTimerPaused) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording, isTimerPaused]);
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

  useEffect(() => {
    let timerInterval;
    if (timerActive) {
      timerInterval = setInterval(() => {
        if (startTime) {
          const currentTime = new Date();
          const elapsedMilliseconds = currentTime - startTime;
          setElapsedTime(elapsedMilliseconds);
        }
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval); // Clean up the interval on unmount
    };
  }, [timerActive, startTime]);

  // const toggleScreenSharing = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getDisplayMedia({
  //       video: true,
  //       audio: true,
  //     });
  //     videoRef.current.srcObject = stream;
  //     setIsScreenSharing(true);
  //   } catch (error) {
  //     console.error("Error accessing screen sharing:", error);
  //   }
  // };
  const toggleScreenSharing = () => {
    try {
      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: true })
        .then((stream) => {
          const videoTracks = stream.getVideoTracks();
          if (videoTracks.length > 0) {
            // Set the main video source to the screen sharing stream
            videoRef.current.srcObject = new MediaStream(videoTracks);
          }
          setIsScreenSharing(true);
        });
    } catch (error) {
      console.error("Error accessing screen sharing:", error);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const startTimer = () => {
    setStartTime(new Date());
  };

  const pauseTimer = () => {
    if (startTime) {
      const currentTime = new Date();
      const elapsedMilliseconds = currentTime - startTime;
      setElapsedTime(elapsedMilliseconds);
    }
  };

  const formatElapsedTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}: ${String(
      remainingMinutes
    ).padStart(2, "0")}: ${String(remainingSeconds).padStart(2, "0")}`;

    return formattedTime;
  };

  const startRecording = async () => {
    console.log("Start Recording")
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

      const mediaRecorder = new MediaRecorder(stream, {
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
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing camera or microphone:", error);
    }
  };

  // const stopRecording = () => {
  //   if (
  //     mediaRecorderRef.current &&
  //     mediaRecorderRef.current.state === "recording"
  //   ) {
  //     mediaRecorderRef.current.stop();
  //   }

  //   if (videoStream) {
  //     videoStream.getTracks().forEach((track) => track.stop());
  //   }

  //   if (audioStream) {
  //     audioStream.getTracks().forEach((track) => track.stop());
  //   }

  //   videoRef.current.srcObject = null; // Stop the video playback
  // };

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

    if (isTimerPaused) {
      // If the timer was paused, add the time when it was paused to elapsed time
      const currentTime = new Date();
      const elapsedMilliseconds = currentTime - pausedTime;
      setElapsedTime(elapsedTime + elapsedMilliseconds);
    }
console.log("Stopping recording", recordedVideo)
    videoRef.current.srcObject = null; // Stop the video playback
  };

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

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

      if (response.ok) {
        setClassEnded(true);
        // End the class immediately regardless of video upload status
        window.location.href = "/homepage";
      } else {
        console.error("Error uploading video to AWS:", response.status);
        // Handle the error as needed
      }
    } catch (error) {
      console.error("Error uploading video to AWS:", error);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    if (classEnded) {
      // Prevent the page from appearing when clicked on the arrow or go back button
      window.history.replaceState(null, null, `/mentor/solo-recordings/topic`);
    }
  }, [classEnded]);

  return (
    <Box
      h="80vh"
      width={isExpanded ? "120%" : "95%"}
      borderRadius="12px"
      boxShadow="md"
      position="relative"
      display="flex"
      flexDirection="column"
      bg={"black"}
      m={"15px"}
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
                onClick={toggleExpand}
              />
            </Tooltip>
          </Circle>

          <Box top="20px" bg={"#F1F5F8"} padding="5px" borderRadius="27px">
            {formatElapsedTime(elapsedTime)}
          </Box>
        </HStack>

        <Circle size="40px" bg="white" mt={10}>
          <Tooltip label={`Camera ${cameraState}`} placement="right">
            <IconButton
              isRound
              icon={
                cameraState === "on" ? (
                  <Icon as={FaVideo} boxSize={4} />
                ) : cameraState === "off" ? (
                  <Icon as={FaVideoSlash} boxSize={4} />
                ) : (
                  // Default to camera disabled when not recording
                  <Icon
                    as={FaVideoSlash}
                    boxSize={4}
                    style={{ color: "gray" }}
                  />
                )
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
                microphoneState === "on" ? (
                  <Icon as={FaMicrophone} boxSize={4} />
                ) : microphoneState === "off" ? (
                  <Icon as={FaMicrophoneSlash} boxSize={4} />
                ) : (
                  // Default to microphone disabled when not recording
                  <Icon
                    as={FaMicrophoneSlash}
                    boxSize={4}
                    style={{ color: "gray" }}
                  />
                )
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
              aria-labell={isRecording ? "Stop recording" : "Start recording"}
              isRound
              icon={<Icon as={BsRecord} boxSize={4} />}
              size="sm"
              onClick={toggleRecording}
            />
          </Tooltip>
        </Circle>

        <Circle size="40px" bg="white">
          <Tooltip label={isTimerPaused ? "Resume" : "Pause"} placement="right">
            <IconButton
              isRound
              icon={<Icon as={CiPause1} boxSize={4} />}
              size="sm"
              onClick={togglePause}
            />
          </Tooltip>
        </Circle>
        <Circle size="40px" bg="white" mt={5}>
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
        <source src={recordedVideo} type="video/webm" />
      </Box>

      <Button
        bg="#F63F4A"
        w="50px"
        position="absolute"
        bottom="20px"
        mt="100px"
        left="20px"
        borderRadius="27px"
        color="white"
        fontWeight={500}
        size="sm"
        onClick={() => {
          stopRecording();
          toggleCamera();
          toggleMicrophone();
          if (isRecording) {
            setTimerActive(false);
          }
          uploadVideoToAWS(recordedVideo, soloClassRoomId);
        }}
      >
        End
      </Button>
    </Box>
  );
};

export default RecordingLectures;

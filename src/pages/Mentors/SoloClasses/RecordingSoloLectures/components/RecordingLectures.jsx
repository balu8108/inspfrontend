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
import { useParams, useNavigate } from "react-router-dom";
import { RiFullscreenExitFill } from "react-icons/ri";
import { useToastContext } from "../../../../../components/toastNotificationProvider/ToastNotificationProvider";
import { boxShadowStyles } from "../../../../../utils";
import { BASE_URL } from "../../../../../constants/staticurls";
const RecordingLectures = ({ toggleDataVisibility, isTheatreMode }) => {
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
  const { soloClassRoomId } = useParams();
  const { addNotification } = useToastContext();
  const navigate = useNavigate();
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
        setElapsedTime((prevTime) => prevTime + 1);
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
        audioStreamRef.current = stream;
        setIsMicrophoneOn(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    } else {
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
      const videoStream = isCameraOn
        ? await navigator.mediaDevices.getUserMedia({ video: true })
        : null;

      const audioStream = isMicrophoneOn ? audioStreamRef.current : null;

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
      mediaRecorderRef.current = new MediaRecorder(combinedStream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        stopRecording();
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing the audio or video stream:", error);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      mediaRecorderRef.current.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
          const blob = new Blob(recordedChunksRef.current, {
            type: "video/webm",
          });

          if (soloClassRoomId) {
            await uploadVideoToAWS(blob, soloClassRoomId);
          } else {
            console.error("Solo classroom ID not found in the URL");
          }
        }
      };

      mediaRecorderRef.current.onstop = () => {
        toggleMicrophone();
        setElapsedTime(0);
        setIsScreenSharing();

        recordedChunksRef.current = [];
      };
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      if (isScreenSharing && isMicrophoneOn) {
        startRecording();
      } else {
        addNotification(
          "Please enable both screen sharing and microphone !",
          "info",
          1800
        );
      }
    }
  };

  const endClass = () => {
    if (isRecording) {
      toggleRecording();
    }
    window.location.href = "/homepage";
    window.history.replaceState(null, null, `/homepage`);
  };

  const stopScreenShare = () => {
    setIsScreenSharing(false);
    setScreenSharingStream(null);
  };

  useEffect(() => {
    if (screenSharingStream) {
      const screenShareTrack = screenSharingStream.getVideoTracks()[0];
      screenShareTrack.addEventListener("ended", stopScreenShare);
      return () => {
        screenShareTrack.removeEventListener("ended", stopScreenShare);
      };
    }
  }, [screenSharingStream]);

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
        addNotification("Lecture is uploaded successfully", "success", 3000);
        navigate("/homepage");
        window.history.replaceState(null, null, `/homepage`);
      } else {
        console.error("Error uploading video to AWS:", response.status);
      }
    } catch (error) {
      console.error("Error uploading video to AWS:", error);
    }
  };

  return (
    <Box
      w={"100%"}
      h={"100%"}
      bg={"#F1F5F8"}
      borderRadius={"26px"}
      position="relative"
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      mb={"20px"}
    >
      <Box
        h={"73vh"}
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
              <Tooltip
                label={isTheatreMode ? "Exit Full Screen" : "Full screen"}
                placement="top"
              >
                <IconButton
                  isRound={true}
                  variant="solid"
                  fontSize="20px"
                  mt={"16px"}
                  colorScheme={"red"}
                  icon={
                    isTheatreMode ? (
                      <RiFullscreenExitFill />
                    ) : (
                      <RiFullscreenLine />
                    )
                  }
                  onClick={() => {
                    toggleDataVisibility();
                  }}
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
            <Tooltip
              label={isRecording ? "Stop Recording " : "Start Recording"}
              placement="right"
            >
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme={isRecording ? "gray" : "red"}
                aria-label="Done"
                fontSize="20px"
                icon={isRecording ? <FiCircle /> : <LuCircleOff />}
                onClick={toggleRecording}
              />
            </Tooltip>

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
            onClick={endClass}
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
              objectFit: "fill",
              visibility: isScreenSharing ? "visible" : "hidden",
            }}
            autoPlay
          />
        </Box>

        <Box
          position="absolute"
          top="10px"
          right="10px"
          width="150px"
          height="120px"
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

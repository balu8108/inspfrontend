//In this component where mentor will record the solo-lecture and video will be uploaded to aws.
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  Tooltip,
  Stack,
  HStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import { RiFullscreenLine, RiFullscreenExitFill } from "react-icons/ri";
import {
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiCircle,
  FiMonitor,
} from "react-icons/fi";
import { IoStopOutline } from "react-icons/io5";
import { LuMonitorOff, LuCircleOff } from "react-icons/lu";
import { CiPause1 } from "react-icons/ci";
import { useParams, useNavigate } from "react-router-dom";
import { useToastContext } from "../../../../../components/toastNotificationProvider/ToastNotificationProvider";
import { boxShadowStyles } from "../../../../../utils";
import { uploadSoloClassRoomRecordingApi } from "../../../../../api/soloclassrooms";
const RecordingLectures = ({ toggleDataVisibility, isTheatreMode }) => {
  const [mentorStream, setMentorStream] = useState(null);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const mentorVideoRef = useRef(null);
  const audioStreamRef = useRef(null);
  const screenSharingVideoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const { soloClassRoomId } = useParams();
  const { addNotification } = useToastContext();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { primaryBlue, primaryBlueLight } = useTheme().colors.pallete;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formatNumber = (num) => (num < 10 ? `0${num}` : `${num}`);

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      remainingSeconds
    )}`;
  };

  useEffect(() => {
    let timerInterval;

    if (isRecording && !isPaused) {
      if (!startTime) {
        setStartTime(Date.now() - pausedTime);
      }

      timerInterval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      clearInterval(timerInterval);

      if (isPaused) {
        setPausedTime(Date.now() - startTime);
      } else {
        setStartTime(0);
        setElapsedTime(0);
        setPausedTime(0);
      }
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRecording, isPaused, startTime, pausedTime]);

  const pauseRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      setPausedTime(Date.now() - startTime);
    }
  };

  const resumeRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      setStartTime(Date.now() - elapsedTime * 1000);
    } else {
      startRecording();
    }
  };

  const toggleMentorStream = async () => {
    if (!mentorStream) {
      try {
        const mentorStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        mentorVideoRef.current.srcObject = mentorStream;
        setMentorStream(mentorStream);
      } catch (error) {
        console.error("Error accessing mentor stream:", error);
      }
    } else {
      const currentMentorStream = mentorStream;
      if (currentMentorStream) {
        const tracks = currentMentorStream.getTracks();
        tracks.forEach((track) => track.stop());
      }

      mentorVideoRef.current.srcObject = null;
      setMentorStream(null);
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
      const videoStream = mentorStream
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
      setIsPaused(false);
    } catch (error) {
      console.error("Error accessing the audio or video stream:", error);
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

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();

      mediaRecorderRef.current.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        setElapsedTime(0);

        setIsRecording(false);

        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });
        if (blob.size > 0) {
          if (soloClassRoomId) {
            await uploadVideoToAWS(blob, soloClassRoomId);
          } else {
          }
        }
        recordedChunksRef.current = [];
      };
    }
  };

  const endClass = () => {
    if (isRecording) {
      stopRecording().then(() => {
        navigate("/homepage", { replace: true });
        window.history.replaceState(null, null, `/homepage`);
      });
    } else {
      navigate("/homepage");
    }
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
      addNotification("Uploading lecture video.Please wait ...", "info", 3000);
      const response = await uploadSoloClassRoomRecordingApi(
        soloClassRoomId,
        formData
      );
      if (response.status === 201) {
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

  const stopStream = (stream) => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    return () => {
      if (isMicrophoneOn) {
        const audioStream = audioStreamRef.current;
        if (audioStream) {
          stopStream(audioStream);
        }
      }
    };
  }, [isMicrophoneOn]);

  useEffect(() => {
    return () => {
      stopStream(mentorStream);
    };
  }, [mentorStream]);

  useEffect(() => {
    return () => {
      if (screenSharingStream) {
        stopStream(screenSharingStream);
      }
    };
  }, [screenSharingStream]);

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
              label={mentorStream ? "Turn Off Camera" : "Turn On Camera"}
              placement="right"
            >
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme={mentorStream ? "gray" : "red"}
                aria-label="Toggle Camera"
                fontSize="20px"
                mt={"20px"}
                icon={mentorStream ? <FiVideo /> : <FiVideoOff />}
                onClick={toggleMentorStream}
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
              label={isPaused ? "Resume Recording" : "Pause Recording"}
              placement="right"
            >
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme={isPaused ? "gray" : "red"}
                aria-label="Done"
                fontSize="20px"
                icon={isPaused ? <IoStopOutline /> : <CiPause1 />}
                onClick={isPaused ? resumeRecording : pauseRecording}
              />
            </Tooltip>
          </Stack>

          <Stack>
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
          <Stack>
            <Button
              bg="#F63F4A"
              w="80px"
              h="40px"
              borderRadius="27px"
              color="white"
              fontWeight={500}
              size="sm"
              mb={"25px"}
              _hover={{ bg: "#F63F4A" }}
              onClick={onOpen}
            >
              End
            </Button>
            <AlertDialog
              motionPreset="scale"
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader></AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  Are you sure you want to end the lecture?
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button
                    ref={cancelRef}
                    fontWeight={500}
                    color={primaryBlue}
                    onClick={onClose}
                    flex={0.5}
                  >
                    No
                  </Button>
                  <Button
                    ml={3}
                    fontWeight={500}
                    color="white"
                    flex={0.5}
                    bg={primaryBlue}
                    onClick={endClass}
                    _hover={{ bg: primaryBlueLight }}
                  >
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Stack>
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
            ref={mentorVideoRef}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              overflow: "hidden",
              borderRadius: "10px",
              background: "black",
              visibility: mentorStream ? "visible" : "hidden",
            }}
            autoPlay
          />
        </Box>
      </Box>
    </Box>
  );
};

export default RecordingLectures;

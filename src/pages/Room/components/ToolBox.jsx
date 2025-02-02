import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Stack,
  Flex,
  HStack,
  useTheme,
  useMediaQuery,
} from "@chakra-ui/react";

import {
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiCircle,
  FiMonitor,
} from "react-icons/fi";

import { LuSettings, LuMonitorOff, LuCircleOff } from "react-icons/lu";
import { RiFullscreenFill } from "react-icons/ri";
import {
  socket,
  producerPauseHandler,
  producerResumeHandler,
  producerTransport,
  setIsAudioStreamEnabled,
  startRecordingHandler,
  stopRecordingHandler,
} from "../../../socketconnections/socketconnections";
import {
  staticVariables,
  toolTipMsgs,
  userType,
} from "../../../constants/staticvariables";
import { roomData } from "../data/roomData";
import PostPoll from "../../../components/popups/PostPoll";
import { LeaveBtn } from "../../../components/button";

import { shallowEqual, useSelector } from "react-redux";
import { checkUserType } from "../../../utils";
import FullScreenModeButton from "./FullScreenBtn";

export const TheatreModeBtn = ({ isEnlarged, setIsEnlarged }) => {
  const { primaryBlue } = useTheme().colors.pallete;
  return (
    <Tooltip label={roomData.theatreMode} placement={"right"}>
      <IconButton
        isRound={true}
        bg={isEnlarged ? primaryBlue : "gray.200"}
        _hover={{ bg: isEnlarged ? primaryBlue : "gray.200" }}
        icon={
          <RiFullscreenFill size={20} color={isEnlarged ? "white" : "black"} />
        }
        onClick={(e) => {
          setIsEnlarged(!isEnlarged);
        }}
      />
    </Tooltip>
  );
};

const ToolBox = ({
  isScreenShare,
  setIsScreenShare,
  screenShareRef,
  setScreenShareStream,
  screenShareStream,
  mentorVideoStream,
  setMentorVideoStream,
  mentorVideoRef,
  micStream,
  setMicStream,
  micRef,
  onOpenLeaveOrEndClass,
  fullScreenRef,
}) => {
  const [isLargerThan768] = useMediaQuery(["(min-width: 768px)"]);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isMentorVideoOn, setIsMentorVideoOn] = useState(false);
  const [isRecordOn, setIsRecordOn] = useState(false);
  const [isLeaveLoading, setIsLeaveLoading] = useState(false); // for leave button loading state
  const [isRecordingLoading, setIsRecordingLoading] = useState(false);
  const [producerScreenShare, setProducerScreenShare] = useState(null);
  const [producerMentorVideoShare, setProducerMentorVideoShare] =
    useState(null);
  const [producerAudioShare, setProducerAudioShare] = useState(null);
  const { isPreviewVideoOn, isPreviewAudioOn } = useSelector(
    (state) => state.streamControls
  );
  const { userProfile } = useSelector((state) => state.auth);
  const { redBtnColor } = useTheme().colors.pallete;
  const userRoleType = checkUserType(userProfile);

  const { selfDetails } = useSelector((state) => state.stream, shallowEqual);
  const getScreenShareFeed = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      if (screenShareRef.current) {
        screenShareRef.current.srcObject = stream;

        // call produce method using produceTransport to send this media to everybody else in real time

        const track = stream.getVideoTracks()[0];

        if (producerTransport) {
          // if there is producerTransport
          if (producerScreenShare) {
            await producerScreenShare.replaceTrack({ track: track });
            setScreenShareStream(stream);
            setIsScreenShare(true);
            return;
          }

          const producerScreenShareRec = await producerTransport.produce({
            track: track,
            appData: {
              streamType: staticVariables.screenShare,
              isTeacher: true,
            },
          });
          setProducerScreenShare(producerScreenShareRec);
          setScreenShareStream(stream);
          setIsScreenShare(true);
        }
      }
    } catch (err) {
      console.log("Screen share feed error = ", err);
    }
  };
  const handleScreenShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isScreenShare) {
      // off screen share
      if (screenShareStream) {
        const tracks = screenShareStream.getTracks();
        tracks.forEach((track) => (track.enabled = false));
      }
      setIsScreenShare(false);
    } else {
      // on the screen share
      await getScreenShareFeed();
    }
  };

  const getVideoStreamFeed = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (mentorVideoRef.current) {
        mentorVideoRef.current.srcObject = stream;
        setMentorVideoStream(stream);
        setIsMentorVideoOn(true);
        // call produce method using produceTransport to send this media to everybody else in real time

        const track = stream.getVideoTracks()[0];

        if (producerTransport) {
          // if there is producerTransport

          if (producerMentorVideoShare) {
            // if already this user has shared their stream once then we don't need to create a new producer
            // we can just replace the track and resume the existing producer
            await producerMentorVideoShare.replaceTrack({ track: track });
            await producerMentorVideoShare.resume();
            producerResumeHandler(producerMentorVideoShare);

            return;
          }

          const producerMentorVideoShareRec = await producerTransport.produce({
            track: track,
            appData: {
              streamType: staticVariables.videoShare,
              isTeacher: true,
            },
          });

          setProducerMentorVideoShare(producerMentorVideoShareRec);
        }
      }
    } catch (err) {
      console.log("Video feed error = ", err);
    }
  };

  const getAudioStreamFeed = async () => {
    try {
      if (micStream) {
        const tracks = micStream.getTracks();
        tracks.forEach((track) => (track.enabled = true));
        setIsAudioStreamEnabled(true, producerAudioShare?.id); // send socket even to all peers that this audio is enabled
        setIsMicOn(true);
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: false,
      });
      if (micRef.current) {
        micRef.current.srcObject = stream;

        const track = stream.getAudioTracks()[0];

        if (producerTransport) {
          let appData = {
            streamType: staticVariables.audioShare,
          };
          const producerAudioShareRec = await producerTransport.produce({
            track: track,
            appData: appData,
          });
          setProducerAudioShare(producerAudioShareRec);
          setIsAudioStreamEnabled(true, producerAudioShareRec?.id); // send socket even to all peers tha this audio is enabled
          setMicStream(stream);
          setIsMicOn(true);
        }
      }
    } catch (err) {
      console.log("Screen share feed error = ", err);
    }
  };

  const handleVideoShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMentorVideoOn) {
      // off the video stream
      if (mentorVideoStream) {
        const tracks = mentorVideoStream.getTracks();

        tracks.forEach((track) => track.stop());
        mentorVideoRef.current.srcObject = null;
        setMentorVideoStream(null); // Clear the stored stream
      }
      setIsMentorVideoOn(false);
      // close video share
      // instead of stopping the producer we can check if video share producer already available and he clicks stop video share then we can just pause it and resume later on
      if (producerMentorVideoShare) {
        producerMentorVideoShare.pause();
        // emit event to backend  for pause one so that backend producer can also pauses
        producerPauseHandler(producerMentorVideoShare);
      }
    } else {
      // on The video stream
      getVideoStreamFeed();
    }
  };

  const handleMicrophone = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMicOn) {
      // off the mic clear the audio track
      if (micStream) {
        const tracks = micStream.getTracks();

        tracks.forEach((track) => (track.enabled = false));

        setIsAudioStreamEnabled(false, producerAudioShare?.id);
      }
      setIsMicOn(false);
    } else {
      // get audio stream
      await getAudioStreamFeed();
    }
  };

  const triggerStartRecording = () => {
    if (socket) {
      startRecordingHandler({ producerScreenShare, producerAudioShare });
      setIsRecordOn(true);
    }
  };
  const triggerStopRecording = () => {
    if (socket) {
      stopRecordingHandler();
      setIsRecordOn(false);
    }
  };
  const recordingHandler = () => {
    setIsRecordingLoading(true);

    if (isRecordOn) {
      // stop recording triggered
      triggerStopRecording();
    } else {
      // start recording
      // at the moment we will only record screenshare then will look into audio
      triggerStartRecording();
    }
    setIsRecordingLoading(false);
  };

  const leaveRoomOrEndMeetHandler = async () => {
    setIsLeaveLoading(true);
    onOpenLeaveOrEndClass();
    setIsLeaveLoading(false);
  };

  const stopMicStream = () => {
    if (micStream) {
      const tracks = micStream.getTracks();
      tracks.forEach((track) => (track.enabled = false));
      setIsAudioStreamEnabled(false, producerAudioShare?.id);
    }
  };

  useEffect(() => {
    // for mic off is blcoked by mentor
    if (
      selfDetails &&
      (selfDetails?.isAudioBlocked || !selfDetails?.isAudioEnabled)
    ) {
      stopMicStream(); //required for enabled mic as off
      setIsMicOn(false);
    }
  }, [selfDetails, setIsMicOn]);

  useEffect(() => {
    if (isMicOn && isScreenShare && !isRecordOn) {
      triggerStartRecording();
    } else if (!isMicOn && !isScreenShare) {
      triggerStopRecording();
    }
  }, [isMicOn, isScreenShare, isRecordOn]);

  useEffect(() => {
    if (isPreviewVideoOn) {
      getVideoStreamFeed();
    }
  }, [isPreviewVideoOn]);

  useEffect(() => {
    if (isPreviewAudioOn) {
      getAudioStreamFeed();
    }
  }, [isPreviewAudioOn]);

  return (
    <Box
      height={["auto", "auto", "100%", "100%"]}
      width={["100%", "100%", "auto", "auto"]}
      position={"absolute"}
      p={4}
      zIndex={4}
      bottom={0}
    >
      <Flex
        height={["auto", "auto", "100%", "100%"]}
        direction={["row", "row", "column", "column"]}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
      >
        <Stack visibility={isLargerThan768 ? "visible" : "hidden"}>
          {userRoleType !== userType.teacher && (
            <FullScreenModeButton fullScreenRef={fullScreenRef} />
          )}
        </Stack>

        <Flex direction={["row", "row", "column", "column"]} gap={2}>
          <Tooltip
            label={
              userRoleType !== userType.teacher && selfDetails?.isAudioBlocked
                ? toolTipMsgs.audioNotAvailable
                : roomData.mic
            }
            placement="right"
          >
            <IconButton
              isRound={true}
              isDisabled={
                userRoleType !== userType.teacher && selfDetails?.isAudioBlocked
              }
              bg={isMicOn ? "gray.200" : "red"}
              onClick={(e) => handleMicrophone(e)}
              _hover={{ bg: isMicOn ? "gray.200" : "red" }}
              icon={
                isMicOn ? (
                  <FiMic size={20} />
                ) : (
                  <FiMicOff size={20} color="white" />
                )
              }
            />
          </Tooltip>

          <Tooltip
            label={
              userRoleType !== userType.teacher
                ? toolTipMsgs.videoNotAvailable
                : roomData.video
            }
            placement="right"
          >
            <IconButton
              isRound={true}
              isDisabled={userRoleType === userType.student}
              bg={isMentorVideoOn ? "gray.200" : "red"}
              _hover={{ bg: isMentorVideoOn ? "gray.200" : "red" }}
              icon={
                isMentorVideoOn ? (
                  <FiVideo size={20} color="black" />
                ) : (
                  <FiVideoOff size={20} color="white" />
                )
              }
              onClick={(e) => handleVideoShare(e)}
            />
          </Tooltip>

          {userRoleType === userType.teacher && (
            <Tooltip label={roomData.recording} placement="right">
              <IconButton
                isRound={true}
                isDisabled={true}
                isLoading={isRecordingLoading}
                bg={isRecordOn ? "gray.200" : "red"}
                onClick={recordingHandler}
                _hover={{ bg: isRecordOn ? "gray.200" : "red" }}
                icon={
                  isRecordOn ? (
                    <FiCircle size={20} />
                  ) : (
                    <LuCircleOff size={20} color="white" />
                  )
                }
              />
            </Tooltip>
          )}
        </Flex>
        <Flex direction={["row", "row", "column", "column"]} gap={2}>
          <Tooltip
            label={
              userRoleType !== userType.teacher
                ? toolTipMsgs.screenShareNotAvailable
                : roomData.screenShare
            }
            placement="right"
          >
            <IconButton
              isRound={true}
              isDisabled={userRoleType === userType.student}
              icon={
                isScreenShare ? (
                  <FiMonitor size={20} color="black" />
                ) : (
                  <LuMonitorOff size={20} color="white" />
                )
              }
              bg={isScreenShare ? "gray.200" : "red"}
              _hover={{ bg: isScreenShare ? "gray.200" : "red" }}
              onClick={(e) => handleScreenShare(e)}
            />
          </Tooltip>

          {userRoleType === userType.teacher && <PostPoll />}
        </Flex>

        <HStack>
          <Tooltip label={roomData.settings} placement="right">
            <IconButton isRound={true} icon={<LuSettings size={20} />} />
          </Tooltip>
          {isLargerThan768 && (
            <LeaveBtn
              isLoading={isLeaveLoading}
              text={
                userRoleType === userType.teacher
                  ? roomData.end
                  : roomData.leave
              }
              backColor={redBtnColor}
              textColor="white"
              onClickHandler={leaveRoomOrEndMeetHandler}
            />
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default ToolBox;

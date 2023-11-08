import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Stack,
  Flex,
  Button,
  HStack,
  useTheme,
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
import { SiMiro } from "react-icons/si";
import { RiFullscreenFill } from "react-icons/ri";
import {
  socket,
  endMeetHandler,
  leaveRoomHandler,
  producerPauseHandler,
  producerResumeHandler,
  producerTransport,
  raiseHandHandler,
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
import { useParams, useNavigate } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { checkUserType } from "../../../utils";
let producerScreenShare = null;
let producerMentorVideoShare = null;
let producerAudioShare = null;

const ToolBox = ({
  primaryBlue,
  isScreenShare,
  setIsScreenShare,
  screenShareRef,
  setScreenShareStream,
  screenShareStream,
  isEnlarged,
  setIsEnlarged,
  isMentorVideoOn,
  setIsMentorVideoOn,
  mentorVideoStream,
  setMentorVideoStream,
  mentorVideoRef,
  isMicOn,
  setIsMicOn,
  micStream,
  setMicStream,
  micRef,
  isRecordOn,
  setIsRecordOn,
  onOpenLeaveOrEndClass,
}) => {
  const [isRaiseHand, setIsRaiseHand] = useState(false);
  const [isLeaveLoading, setIsLeaveLoading] = useState(false); // for leave button loading state
  // const [QNo, setQNo] = useState(0);
  const [isRecordingLoading, setIsRecordingLoading] = useState(false);
  const { redBtnColor } = useTheme().colors.pallete;
  const userRoleType = checkUserType();

  const { roomPreviewData, selfDetails } = useSelector(
    (state) => state.socket,
    shallowEqual
  );

  const openMiroBoardAuth = () => {
    window.miroBoardsPicker.open({
      clientId: process.env.REACT_APP_MIRO_CLIENT_ID, // Replace it with your app ClientId
      action: "select",
      success: (data) => {
        window.open(data?.viewLink, "_blank");
        // dispatch(
        //   setMiroBoardData({ boardId: data.id, mode: miroViewMode.edit })
        // );
        // sendMiroBoardData({ boardId: data.id, mode: miroViewMode.view }); // Broadcast to all as view mode for miro board
      },
    });
  };
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

          producerScreenShare = await producerTransport.produce({
            track: track,
            appData: {
              streamType: staticVariables.screenShare,
              isTeacher: true,
            },
          });
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
        // tracks.forEach((track) => track.stop());
      }
      setIsScreenShare(false);
    } else {
      // on the screen share
      await getScreenShareFeed();
    }

    // recording handler trigger
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

          producerMentorVideoShare = await producerTransport.produce({
            track: track,
            appData: {
              streamType: staticVariables.videoShare,
              isTeacher: true,
            },
          });
        }
      }
    } catch (err) {
      console.log("Screen share feed error = ", err);
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
        audio: true,
      });
      if (micRef.current) {
        micRef.current.srcObject = stream;

        const track = stream.getAudioTracks()[0];

        if (producerTransport) {
          let appData = {
            streamType: staticVariables.audioShare,
          };
          producerAudioShare = await producerTransport.produce({
            track: track,
            appData: appData,
          });

          setIsAudioStreamEnabled(true, producerAudioShare?.id); // send socket even to all peers tha this audio is enabled
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

  const handRaisedHandler = () => {
    if (isRaiseHand) {
      setIsRaiseHand(false);
      raiseHandHandler(false);
    } else {
      setIsRaiseHand(true);
      raiseHandHandler(true);
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
    // if (userRoleType === userType.teacher) {
    //   await endMeetHandler();
    // } else {
    //   await leaveRoomHandler();
    //   navigate(`/room-preview/${roomId}`);
    // }

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
  return (
    <Box position={"absolute"} height={"100%"} p={4} zIndex={4}>
      <Flex
        height={"100%"}
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
      >
        <Stack>
          <Tooltip label={roomData.theatreMode} placement={"right"}>
            <IconButton
              isRound={true}
              bg={isEnlarged ? primaryBlue : "gray.200"}
              _hover={{ bg: isEnlarged ? primaryBlue : "gray.200" }}
              icon={
                <RiFullscreenFill
                  size={20}
                  color={isEnlarged ? "white" : "black"}
                />
              }
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEnlarged(!isEnlarged);
              }}
            />
          </Tooltip>
        </Stack>
        <Stack>
          <Tooltip
            label={
              userRoleType !== userType.teacher &&
              roomPreviewData?.muteAllStudents
                ? toolTipMsgs.audioNotAvailable
                : roomData.mic
            }
            placement="right"
          >
            <IconButton
              isRound={true}
              isDisabled={
                userRoleType !== userType.teacher &&
                (roomPreviewData?.muteAllStudents ||
                  selfDetails?.isAudioBlocked)
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
        </Stack>
        <Stack>
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
          {/* <Button
            bg={isRaiseHand ? primaryBlue : "gray.200"}
            _hover={{ bg: isRaiseHand ? primaryBlue : "gray.200" }}
            borderRadius={"100%"}
            p={0}
            onClick={handRaisedHandler}
          >
            {"\u{1F44B}"}
          </Button> */}
          {/* <IconButton isRound={true} icon={<FiMenu size={20} />} /> */}
          {userRoleType === userType.teacher && (
            <IconButton
              isRound={true}
              icon={<SiMiro size={20} />}
              onClick={openMiroBoardAuth}
            />
          )}

          {userRoleType === userType.teacher && (
            <PostPoll
              // QNo={QNo}
              // setQNo={setQNo}
              screenShareStream={screenShareStream}
            />
          )}
        </Stack>

        <HStack>
          <Tooltip label={roomData.settings} placement="right">
            <IconButton isRound={true} icon={<LuSettings size={20} />} />
          </Tooltip>
          <LeaveBtn
            isLoading={isLeaveLoading}
            text={
              userRoleType === userType.teacher ? roomData.end : roomData.leave
            }
            backColor={redBtnColor}
            textColor="white"
            onClickHandler={leaveRoomOrEndMeetHandler}
          />
        </HStack>
        {/* <Stack>
          <VideoSection mentorVideoRef={mentorVideoRef} />
        </Stack> */}
        {/* <Stack>
          <VideoSection />
        </Stack> */}
      </Flex>
    </Box>
  );
};

export default ToolBox;

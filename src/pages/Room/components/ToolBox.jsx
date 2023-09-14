import { useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

import {
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiCircle,
  FiMonitor,
  FiMenu,
} from "react-icons/fi";

import { LuSettings, LuMonitorOff, LuCircleOff } from "react-icons/lu";
import { SiMiro } from "react-icons/si";
import { RiFullscreenFill } from "react-icons/ri";
import {
  endMeetHandler,
  leaveRoomHandler,
  producerPauseHandler,
  producerResumeHandler,
  producerTransport,
  raiseHandHandler,
  sendMiroBoardData,
  startRecordingHandler,
  stopProducing,
} from "../../../socketconnections/socketconnections";
import {
  miroViewMode,
  staticVariables,
  userType,
} from "../../../constants/staticvariables";
import { roomData } from "../data/roomData";
import PostPoll from "../../../components/popups/PostPoll";
import { LeaveBtn } from "../../../components/button";

import { useDispatch } from "react-redux";
import { setMiroBoardData } from "../../../store/actions/socketActions";
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
}) => {
  const [isRaiseHand, setIsRaiseHand] = useState(false);
  const [isLeaveLoading, setIsLeaveLoading] = useState(false); // for leave button loading state
  const [QNo, setQNo] = useState(0);
  const navigate = useNavigate();
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const { redBtnColor } = useTheme().colors.pallete;
  const userRoleType = checkUserType();

  const openMiroBoardAuth = () => {
    window.miroBoardsPicker.open({
      clientId: "3458764563018758552", // Replace it with your app ClientId
      action: "select",
      success: (data) => {
        dispatch(
          setMiroBoardData({ boardId: data.id, mode: miroViewMode.edit })
        );
        sendMiroBoardData({ boardId: data.id, mode: miroViewMode.view }); // Broadcast to all as view mode for miro board
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
        setScreenShareStream(stream);
        setIsScreenShare(true);

        // call produce method using produceTransport to send this media to everybody else in real time

        const track = stream.getVideoTracks()[0];

        if (producerTransport) {
          // if there is producerTransport
          if (producerScreenShare) {
            await producerScreenShare.replaceTrack({ track: track });
            await producerScreenShare.resume();
            producerResumeHandler(producerScreenShare);
            return;
          }

          producerScreenShare = await producerTransport.produce({
            track: track,
            appData: {
              streamType: staticVariables.screenShare,
              isTeacher: true,
            },
          });
        }
      }
    } catch (err) {
      console.log("Screen share feed error = ", err);
    }
  };
  const handleScreenShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isScreenShare) {
      // off screen share
      if (screenShareStream) {
        const tracks = screenShareStream.getTracks();
        tracks.forEach((track) => track.stop());
        mentorVideoRef.current.srcObject = null;
        setScreenShareStream(null); // Clear the stored stream
      }
      setIsScreenShare(false);
      // stop producing the stream
      // stopProducing(producerScreenShare.id, producerScreenShare.appData);
      if (producerScreenShare) {
        producerScreenShare.pause();
        producerPauseHandler(producerScreenShare);
      }
    } else {
      // on the screen share
      getScreenShareFeed();
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
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      if (micRef.current) {
        micRef.current.srcObject = stream;
        setMicStream(stream);
        setIsMicOn(true);
        const track = stream.getAudioTracks()[0];
        if (producerTransport) {
          let appData = {
            streamType: staticVariables.audioShare,
          };
          producerAudioShare = await producerTransport.produce({
            track: track,
            appData: appData,
          });
          if (isRecordOn) {
            startRecordingHandler({ producerAudioShare });
          }
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

  const handleMicrophone = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMicOn) {
      // off the mic clear the audio track
      if (micStream) {
        const tracks = micStream.getTracks();
        tracks.forEach((track) => track.stop());
        micRef.current.srcObject = null;
        setMicStream(null); // Clear the stored stream
      }
      setIsMicOn(false);
    } else {
      // get audio stream
      getAudioStreamFeed();
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
  const startRecording = () => {
    if (isRecordOn) {
      // stop recording triggered

      setIsRecordOn(false);
    } else {
      // start recording
      // at the moment we will only record screenshare then will look into audio

      // startRecordingHandler(producerScreenShare);
      startRecordingHandler({ producerScreenShare, producerAudioShare });
      setIsRecordOn(true);
    }
  };

  const leaveRoomOrEndMeetHandler = async () => {
    setIsLeaveLoading(true);
    if (userRoleType === userType.teacher) {
      await endMeetHandler();
    } else {
      await leaveRoomHandler();
    }

    navigate(`/room-preview/${roomId}`);
    setIsLeaveLoading(false);
  };
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
          <Tooltip label={roomData.mic} placement="right">
            <IconButton
              isRound={true}
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
          <Tooltip label={roomData.video} placement="right">
            <IconButton
              isRound={true}
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
          <Tooltip label={roomData.recording} placement="right">
            <IconButton
              isRound={true}
              bg={isRecordOn ? "gray.200" : "red"}
              onClick={startRecording}
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
        </Stack>
        <Stack>
          <Tooltip label={roomData.screenShare} placement="right">
            <IconButton
              isRound={true}
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
          <Button
            bg={isRaiseHand ? primaryBlue : "gray.200"}
            _hover={{ bg: isRaiseHand ? primaryBlue : "gray.200" }}
            borderRadius={"100%"}
            p={0}
            onClick={handRaisedHandler}
          >
            {"\u{1F44B}"}
          </Button>
          {/* <IconButton isRound={true} icon={<FiMenu size={20} />} /> */}
          <IconButton
            isRound={true}
            icon={<SiMiro size={20} />}
            onClick={openMiroBoardAuth}
          />

          {checkUserType() === userType.teacher && (
            <PostPoll
              QNo={QNo}
              setQNo={setQNo}
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

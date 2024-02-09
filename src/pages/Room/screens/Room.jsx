import { useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  useDisclosure,
  useMediaQuery,
  useTheme,
} from "@chakra-ui/react";

import LiveSessionDescription, {
  FilesForSmallerScreen,
} from "../components/LiveSessionDescription";
import LiveSessionStream from "../components/LiveSessionStream";
import LiveSessionMembers from "../components/LiveSessionMembers";
import {
  createSendTransportHandler,
  getProducersHandler,
  initializeDeviceHandler,
  leaveRoomHandler,
  socket,
} from "../../../socketconnections/socketconnections";
import { useDispatch, useSelector } from "react-redux";
import {
  fileTypes,
  liveSessionMemberViewType,
} from "../../../constants/staticvariables";
import { useToastContext } from "../../../components/toastNotificationProvider/ToastNotificationProvider";
import { useNavigate, useParams } from "react-router-dom";
import { checkUserType, screenshotHandler } from "../../../utils";
import LiveSessionInteraction from "../components/LiveSessionInteraction";
import LeaveOrEndClassPopup from "../../../components/popups/LeaveOrEndClassPopup";
import KickFromClassPopup from "../../../components/popups/KickFromClassPopup";
import {
  resetChatMessages,
  resetQuestionMessags,
} from "../../../store/actions/socketActions";
import { createLiveClassNotes } from "../../../api/genericapis";
import FileBoxComponent from "../../../components/filebox/FileBoxComponent";

const Room = () => {
  const [isScreenShare, setIsScreenShare] = useState(false);
  const [screenShareStream, setScreenShareStream] = useState(null);
  const [isEnlarged, setIsEnlarged] = useState(false); // for enlarging screen
  const [isMentorVideoOn, setIsMentorVideoOn] = useState(false);
  const [mentorVideoStream, setMentorVideoStream] = useState(null);
  const [isMicOn, setIsMicOn] = useState(false);
  const [micStream, setMicStream] = useState(null);
  const [isRecordOn, setIsRecordOn] = useState(false);
  const [peersViewType, setPeersViewType] = useState(
    liveSessionMemberViewType.compact
  );
  const [kickedPersonDetails, setKickedPersonDetails] = useState(null);
  const { rtpCapabilities, isMeetEnd, isKickedOut } = useSelector(
    (state) => state.socket
  );
  const { addNotification } = useToastContext();
  const userRoleType = checkUserType();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const micRef = useRef();
  const screenShareRef = useRef();
  const mentorVideoRef = useRef();
  const {
    isOpen: isOpenLeaveOrEndClass,
    onOpen: onOpenLeaveOrEndClass,
    onClose: onCloseLeaveOrEndClass,
  } = useDisclosure();
  const {
    isOpen: isOpenKickFromClass,
    onOpen: onOpenKickFromClass,
    onClose: onCloseKickFromClass,
  } = useDisclosure();
  const dispatch = useDispatch();

  const theme = useTheme();
  const { primaryBlue, outerBackground } = theme.colors.pallete;

  const [isLargerThan480, isLargerThan768] = useMediaQuery([
    "(min-width: 480px)",
    "(min-width: 768px)",
  ]);

  const stopScreenShare = () => {
    setIsScreenShare(false);
    setScreenShareStream(null);
  };

  const renderColumns = (peersViewType, isEnlarged) => {
    if (isEnlarged) {
      return "1fr";
    } else if (peersViewType === liveSessionMemberViewType.compact) {
      // return [
      //   "1.5fr 3.5fr 0.25fr",
      //   "1.5fr 3.5fr 0.25fr",
      //   "1.5fr 3.5fr 0.25fr",
      //   "0.9fr 4fr 0.25fr",
      // ];
      return ["1fr", "1fr", "1.5fr 3.5fr 0.25fr", "0.9fr 4fr 0.25fr"];
    } else if (peersViewType === liveSessionMemberViewType.expanded) {
      // return "1.2fr 6fr 1fr";
      return ["1fr", "1fr", "1.5fr 3.5fr 0.25fr", "1.2fr 6fr 1fr"];
    }
  };

  const deviceInitialize = async (rtpCapabilities) => {
    try {
      await initializeDeviceHandler(rtpCapabilities);
    } catch (err) {
      console.log("failed to initialize device");
    }
  };

  /* use effect starts */

  useEffect(() => {
    if (screenShareStream) {
      const screenShareTrack = screenShareStream.getVideoTracks()[0];
      screenShareTrack.addEventListener("ended", stopScreenShare);
      return () => {
        screenShareTrack.removeEventListener("ended", stopScreenShare);
      };
    }
  }, [screenShareStream]);

  useEffect(() => {
    const initialization = async () => {
      if (rtpCapabilities) {
        // create device -> create producer send transport -> get all existed producer from the server and create consumers for each
        await deviceInitialize(rtpCapabilities);
        await createSendTransportHandler();
        getProducersHandler();
      }
    };
    initialization();
  }, [rtpCapabilities]);

  useEffect(() => {
    if (!socket) {
      addNotification("Class leaved", "info", 3000);
      navigate(`/room-preview/${roomId}`);
    }
  }, [roomId, addNotification, navigate]);

  // if meet ended by mentor then redirect to room preview in backend everything cleans up automatically
  useEffect(() => {
    if (isMeetEnd) {
      addNotification("Class Ended", "success", 3000);
      navigate("/homepage");
    }
  }, [isMeetEnd, roomId, addNotification, navigate]);

  useEffect(() => {
    return async () => {
      // on Unmount disconnect the participant  from room

      if (socket) {
        addNotification("Class leaved", "info", 3000);
        await leaveRoomHandler();
      }
    };
  }, [roomId, userRoleType, addNotification, navigate]);

  useEffect(() => {
    const leavingRoom = async () => {
      if (isKickedOut) {
        // if kicked out then emit leave the room;
        await leaveRoomHandler();

        navigate(`/room-preview/${roomId}`);
      }
    };
    leavingRoom();
  }, [isKickedOut]);

  useEffect(() => {
    return () => {
      // clear chat box and question container on unmounting
      dispatch(resetChatMessages());
      dispatch(resetQuestionMessags());
    };
  }, [dispatch]);

  const stopMediaStream = (stream) => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  // This useEffect will clear all the mic,video,screenshare stream if component is unmounting
  useEffect(() => {
    return () => {
      stopMediaStream(micStream);
    };
  }, [micStream]);

  useEffect(() => {
    return () => {
      stopMediaStream(mentorVideoStream);
    };
  }, [mentorVideoStream]);
  useEffect(() => {
    return () => {
      stopMediaStream(screenShareStream);
    };
  }, [screenShareStream]);

  useEffect(() => {
    const ssId = setInterval(async () => {
      try {
        if (screenShareStream) {
          const videoTracks = screenShareStream.getVideoTracks();
          if (videoTracks.length > 0) {
            const track = videoTracks[0];
            if (track.enabled) {
              const screenshot = await screenshotHandler(screenShareStream);
              const formData = new FormData();
              formData.append("screenshot", screenshot);
              formData.append("roomId", roomId);

              if (screenshot) {
                await createLiveClassNotes(formData); // send screenshot to backend
              }
            }
          }
        } else {
        }
      } catch (err) {
        console.log("error in screenshot", err);
      }
    }, 10000);
    return () => {
      clearInterval(ssId);
    };
  }, [screenShareStream]);

  /* use effect end */
  return (
    <>
      {isOpenLeaveOrEndClass && (
        <LeaveOrEndClassPopup
          isOpen={isOpenLeaveOrEndClass}
          onClose={onCloseLeaveOrEndClass}
        />
      )}
      {isOpenKickFromClass && (
        <KickFromClassPopup
          isOpen={isOpenKickFromClass}
          onClose={onCloseKickFromClass}
          kickedPersonDetails={kickedPersonDetails}
        />
      )}

      <Box py={4} px={[2, 4, 4, 10]}>
        <Grid
          templateColumns={renderColumns(peersViewType, isEnlarged)}
          templateRows={[
            "repeat(12,1fr)",
            "repeat(12,1fr)",
            "repeat(6,1fr)",
            "repeat(6,1fr)",
          ]}
          gap={[2, 2, 2, 4]}
          h={[isLargerThan768 ? "85vh" : isEnlarged ? "85vh" : "100%"]}
          className="scrollbar-parent"
        >
          {!isEnlarged && (
            <GridItem
              rowSpan={[1, 1, 2, 2]}
              bg={outerBackground}
              borderRadius={"md"}
              className="scrollbar-primary"
              overflowY={["hidden", "hidden", "scroll", "scroll"]}
            >
              <LiveSessionDescription
                onOpenLeaveOrEndClass={onOpenLeaveOrEndClass}
              />
            </GridItem>
          )}

          <GridItem
            rowSpan={[isEnlarged ? 12 : 5, isEnlarged ? 12 : 5, 6, 6]}
            bg={outerBackground}
            p={[2, 2, 2, 4]}
            borderRadius={"md"}
          >
            <LiveSessionStream
              primaryBlue={primaryBlue}
              isScreenShare={isScreenShare}
              setIsScreenShare={setIsScreenShare}
              screenShareRef={screenShareRef}
              screenShareStream={screenShareStream}
              setScreenShareStream={setScreenShareStream}
              isEnlarged={isEnlarged}
              setIsEnlarged={setIsEnlarged}
              isMentorVideoOn={isMentorVideoOn}
              setIsMentorVideoOn={setIsMentorVideoOn}
              mentorVideoStream={mentorVideoStream}
              setMentorVideoStream={setMentorVideoStream}
              mentorVideoRef={mentorVideoRef}
              isMicOn={isMicOn}
              setIsMicOn={setIsMicOn}
              micStream={micStream}
              setMicStream={setMicStream}
              micRef={micRef}
              isRecordOn={isRecordOn}
              setIsRecordOn={setIsRecordOn}
              onOpenLeaveOrEndClass={onOpenLeaveOrEndClass}
            />
          </GridItem>

          {!isEnlarged && (
            <GridItem
              rowSpan={[1, 1, 6, 6]}
              cursor={"pointer"}
              onClick={() => {
                if (peersViewType === liveSessionMemberViewType.compact) {
                  setPeersViewType(liveSessionMemberViewType.expanded);
                } else {
                  setPeersViewType(liveSessionMemberViewType.compact);
                }
              }}
            >
              <LiveSessionMembers
                primaryBlue={primaryBlue}
                outerBackground={outerBackground}
                viewType={peersViewType}
                onOpenKickFromClass={onOpenKickFromClass}
                setKickedPersonDetails={setKickedPersonDetails}
              />
            </GridItem>
          )}

          {!isLargerThan768 && (
            <GridItem rowSpan={1} bg={outerBackground} borderRadius={"md"}>
              <FilesForSmallerScreen />
            </GridItem>
          )}

          {!isEnlarged && (
            <GridItem
              rowSpan={[5, 5, 4, 4]}
              bg={outerBackground}
              borderRadius={"md"}
            >
              <LiveSessionInteraction />
            </GridItem>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Room;

import { useEffect, useState } from "react";
import {
  GridItem
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LiveSessionStream from "./LiveSessionStream";
import {
  createSendTransportHandler,
  getProducersHandler,
  initializeDeviceHandler,
  leaveRoomHandler,
  socket,
} from "../../../socketconnections/socketconnections";
import { useToastContext } from "../../../components/toastNotificationProvider/ToastNotificationProvider";
import { checkUserType, screenshotHandler } from "../../../utils";
import { createLiveClassNotes } from "../../../api/genericapis";

const LiveSession = ({outerBackground, roomId, isEnlarged, setIsEnlarged, onOpenLeaveOrEndClass}) => {
  console.log("SESSION")
  const [isScreenShare, setIsScreenShare] = useState(false);
  const [mentorVideoStream, setMentorVideoStream] = useState(null);
  const [screenShareStream, setScreenShareStream] = useState(null);
  const [micStream, setMicStream] = useState(null);
  const stopMediaStream = (stream) => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const { rtpCapabilities, isMeetEnd, isKickedOut } = useSelector(
    (state) => state.stream
  );

  const { addNotification } = useToastContext();
  const userRoleType = checkUserType();
  const navigate = useNavigate();

  const stopScreenShare = () => {
    setIsScreenShare(false);
    setScreenShareStream(null);
  };

  const deviceInitialize = async (rtpCapabilities) => {
    try {
      await initializeDeviceHandler(rtpCapabilities);
    } catch (err) {
      console.log("failed to initialize device");
    }
  };

  useEffect(() => {
    const initialization = async () => {
      if (rtpCapabilities) {
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
  
    if (isMeetEnd) {
      addNotification("Class Ended", "success", 3000);
      navigate("/homepage");
    }
  
    return async () => {
      if (socket) {
        addNotification("Class leaved", "info", 3000);
        await leaveRoomHandler();
      }
    };
  }, [socket, roomId, isMeetEnd, userRoleType, addNotification, navigate, leaveRoomHandler]);
  
  useEffect(() => {
    const leavingRoom = async () => {
      if (isKickedOut) {
        await leaveRoomHandler();
        navigate(`/room-preview/${roomId}`);
      }
    };
    leavingRoom();
  }, [isKickedOut]);

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
        }
      } catch (err) {
        console.log("error in screenshot", err);
      }
    }, 10000);

    if (screenShareStream) {
      const screenShareTrack = screenShareStream.getVideoTracks()[0];
      screenShareTrack.addEventListener("ended", stopScreenShare);

      return () => {
        clearInterval(ssId);
        screenShareTrack.removeEventListener("ended", stopScreenShare);
        stopMediaStream(screenShareStream);
      };
    }

    return () => {
      clearInterval(ssId);
    };
  }, [screenShareStream]);

  return (
    <GridItem
    rowSpan={[isEnlarged ? 12 : 5, isEnlarged ? 12 : 5, 6, 6]}
    bg={outerBackground}
    p={[2, 2, 2, 4]}
    borderRadius={"md"}
    >
    <LiveSessionStream
        isScreenShare={isScreenShare}
        setIsScreenShare={setIsScreenShare}
        screenShareStream={screenShareStream}
        setScreenShareStream={setScreenShareStream}
        isEnlarged={isEnlarged}
        setIsEnlarged={setIsEnlarged}
        mentorVideoStream={mentorVideoStream}
        setMentorVideoStream={setMentorVideoStream}
        micStream={micStream}
        setMicStream={setMicStream}
        onOpenLeaveOrEndClass={onOpenLeaveOrEndClass}
    />
    </GridItem>
  );
};

export default LiveSession;

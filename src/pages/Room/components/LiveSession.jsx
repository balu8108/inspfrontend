import { useEffect, useState } from "react";
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
import { checkUserType } from "../../../utils";

const LiveSession = ({
  roomId,
  isEnlarged,
  setIsEnlarged,
  onOpenLeaveOrEndClass,
}) => {
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
  const { userProfile } = useSelector((state) => state.auth);
  const userRoleType = checkUserType(userProfile);
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
  }, [
    socket,
    roomId,
    isMeetEnd,
    userRoleType,
    addNotification,
    navigate,
    leaveRoomHandler,
  ]);

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
    return () => {
      stopMediaStream(screenShareStream);
    };
  }, [screenShareStream]);

  useEffect(() => {
    if (screenShareStream) {
      const screenShareTrack = screenShareStream.getVideoTracks()[0];
      screenShareTrack.addEventListener("ended", stopScreenShare);
      return () => {
        screenShareTrack.removeEventListener("ended", stopScreenShare);
      };
    }
  }, [screenShareStream]);

  return (
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
  );
};

export default LiveSession;

import { useEffect, useRef } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import ToolBox, { TheatreModeBtn } from "./ToolBox";
import ChatToolBox from "./ChatToolBox";
import StudentPollsMCQBox from "./StudentPollsMCQBox";
import RaiseHand from "./RaiseHand";
import WebAudioPlayer from "../../../components/webaudioplayer/WebAudioPlayer";
import MiroBoard from "./MiroBoard";
import { checkUserType, getStorageData } from "../../../utils";
import { userType } from "../../../constants/staticvariables";
import WaterMark from "../../../components/watermark/WaterMark";
import FullScreenModeButton from "./FullScreenBtn";

const LiveSessionStream = (props) => {
  const {
    isScreenShare,
    setIsScreenShare,
    screenShareStream,
    setScreenShareStream,
    isEnlarged,
    setIsEnlarged,
    mentorVideoStream,
    setMentorVideoStream,
    micStream,
    setMicStream,
    onOpenLeaveOrEndClass,
  } = props;
  const micRef = useRef();
  const screenShareRef = useRef();
  const mentorVideoRef = useRef();
  const [isLargerThan480, isLargerThan768] = useMediaQuery([
    "(min-width: 480px)",
    "(min-width: 768px)",
  ]);

  const { mentorScreenShareConsumer, audioConsumers, raiseHands, question } =
    useSelector((state) => state.stream);
  const userRoleType = checkUserType();
  const { data: inspUserProfile } = getStorageData("insp_user_profile");

  const renderMentorScreenShare = () => {
    const getMentorScreenShare = mentorScreenShareConsumer;
    const { track, appData } = getMentorScreenShare;
    const stream = new MediaStream([track]);
    screenShareRef.current.srcObject = stream;
  };

  const removeMentorScreenShare = () => {
    if (screenShareRef.current) {
      screenShareRef.current.srcObject = null;
      if (mentorScreenShareConsumer) {
        const { track } = mentorScreenShareConsumer;
        if (track) {
          track.stop();
        }
      }
    }
  };

  useEffect(() => {
    if (mentorScreenShareConsumer) {
      renderMentorScreenShare();
    } else {
      removeMentorScreenShare();
    }
  }, [mentorScreenShareConsumer]);

  useEffect(() => {
    const checkWaterMark = () => {
      if (userRoleType === userType.student) {
        const watermarkUserName = document.getElementById(
          "watermark-user-name"
        );
        const watermarkUserEmail = document.getElementById(
          "watermark-user-email"
        );

        let isWaterMark = true;
        if (!watermarkUserName || !watermarkUserEmail) {
          isWaterMark = false;
        } else if (
          (watermarkUserName &&
            (watermarkUserName.style.display === "none" ||
              watermarkUserName.style.visibility === "hidden")) ||
          (watermarkUserEmail &&
            (watermarkUserEmail.style.display === "none" ||
              watermarkUserEmail.style.visibility === "hidden"))
        ) {
          isWaterMark = false;
        } else if (
          watermarkUserName.textContent !== inspUserProfile.name ||
          watermarkUserEmail.textContent !== inspUserProfile.email
        ) {
          isWaterMark = false;
        }
        if (!isWaterMark) {
          screenShareRef.current.srcObject = null;
        }
      }
    };
    const watermarkCheckInterval = setInterval(checkWaterMark, 2000);
    return () => {
      clearInterval(watermarkCheckInterval);
    };
  }, []);

  const fullScreenRef = useRef(null);

  return (
    <>
      <Box
        width={"100%"}
        height={"100%"}
        bg="black"
        borderRadius={"10px"}
        position={"relative"}
        ref={fullScreenRef}
      >
        {!isLargerThan768 && (
          <Box position={"absolute"} zIndex={4} top={2} left={2}>
            <FullScreenModeButton fullScreenRef={fullScreenRef} />
          </Box>
        )}

        {question && <StudentPollsMCQBox question={question} />}
        {raiseHands.map((peer) => (
          <RaiseHand key={peer.id} peer={peer} />
        ))}

        <MiroBoard />

        <video
          ref={screenShareRef}
          autoPlay
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "contain", // Reset the objectFit property
            borderRadius: "10px",
          }}
          muted={true}
        />
        {userRoleType === userType.student && (
          <WaterMark inspUserProfile={inspUserProfile} />
        )}
        <audio ref={micRef} hidden muted />
        <Box id="remote_audios">
          {audioConsumers.length > 0 &&
            audioConsumers.map((consumer) => (
              <WebAudioPlayer
                key={consumer.id}
                mediaStreamTrack={consumer.track}
              />
            ))}
        </Box>

        <ToolBox
          fullScreenRef={fullScreenRef}
          isScreenShare={isScreenShare}
          setIsScreenShare={setIsScreenShare}
          screenShareRef={screenShareRef}
          screenShareStream={screenShareStream}
          setScreenShareStream={setScreenShareStream}
          isEnlarged={isEnlarged}
          setIsEnlarged={setIsEnlarged}
          mentorVideoStream={mentorVideoStream}
          setMentorVideoStream={setMentorVideoStream}
          mentorVideoRef={mentorVideoRef}
          micStream={micStream}
          setMicStream={setMicStream}
          micRef={micRef}
          onOpenLeaveOrEndClass={onOpenLeaveOrEndClass}
        />
        {/*below is mentor video Share */}
        <ChatToolBox mentorVideoRef={mentorVideoRef} />
      </Box>
    </>
  );
};

export default LiveSessionStream;

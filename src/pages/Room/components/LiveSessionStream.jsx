import { useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import ToolBox from "./ToolBox";
import ChatToolBox from "./ChatToolBox";
import StudentPollsMCQBox from "./StudentPollsMCQBox";
import RaiseHand from "./RaiseHand";
import WebAudioPlayer from "../../../components/webaudioplayer/WebAudioPlayer";
import MiroBoard from "./MiroBoard";
import { checkUserType, getStorageData } from "../../../utils";
import { userType } from "../../../constants/staticvariables";
import WaterMark from "../../../components/watermark/WaterMark";

const LiveSessionStream = (props) => {
  const {
    primaryBlue,
    isScreenShare,
    setIsScreenShare,
    screenShareRef,
    screenShareStream,
    setScreenShareStream,
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
  } = props;

  const { question } = useSelector((state) => state.socket);

  const { mentorScreenShareConsumer, audioConsumers, raiseHands } = useSelector(
    (state) => state.socket
  );
  const userRoleType = checkUserType();
  const { data: inspUserProfile } = getStorageData("insp_user_profile");

  const renderMentorScreenShare = () => {
    const getMentorScreenShare = mentorScreenShareConsumer;
    const { track } = getMentorScreenShare;
    const stream = new MediaStream([track]);
    screenShareRef.current.srcObject = stream;
  };

  // const renderAudioStreams = () => {
  //   audioConsumers.forEach((consumer) => {
  //     const { track } = consumer;

  //     if (track) {
  //       const audioElement = document.createElement("audio");
  //       audioElement.srcObject = new MediaStream([track]);
  //       audioElement.autoplay = true;
  //       audioElement.playsInline = true;
  //       document.getElementById("remote_audios").appendChild(audioElement);
  //     }
  //   });
  // };

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
  // useEffect(() => {
  //   if (audioConsumers && audioConsumers.length > 0) {
  //     renderAudioStreams();
  //   }
  // }, [audioConsumers]);

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

  return (
    <>
      <Box
        width={"100%"}
        height={"100%"}
        bg="black"
        borderRadius={"10px"}
        position={"relative"}
      >
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
            objectFit: "fill", // Reset the objectFit property
            borderRadius: "10px",
          }}
        />
        {userRoleType === userType.student && (
          <WaterMark inspUserProfile={inspUserProfile} />
        )}
        <audio ref={micRef} autoPlay playsInline hidden muted />
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
        <ChatToolBox
          isScreenShare={isScreenShare}
          mentorVideoRef={mentorVideoRef}
        />
      </Box>
    </>
  );
};

export default LiveSessionStream;

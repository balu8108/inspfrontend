import { useEffect, useState } from "react";
import {
  Box,
  Text,
  IconButton,
  Tooltip,
  Stack,
  Flex,
  HStack,
  Input,
  InputGroup,
  Collapse,
  useDisclosure,
  Avatar,
  useTheme,
} from "@chakra-ui/react";
import {
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiCircle,
  FiMonitor,
  FiMenu,
} from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { LuSettings, LuMonitorOff, LuCircleOff } from "react-icons/lu";
import { BiBarChart } from "react-icons/bi";
import { RiFullscreenFill } from "react-icons/ri";
import { roomData } from "../data/roomData";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {
  producerTransport,
  stopProducing,
} from "../../../socketconnections/socketconnections";
import { staticVariables } from "../../../constants/staticvariables";
import { useSelector } from "react-redux";

let producerScreenShare = null;
let producerMentorVideoShare = null;

const MentorVideoSection = ({ mentorVideoRef }) => {
  const { mentorVideoShareConsumer } = useSelector((state) => state.socket);

  const renderMentorVideoStream = () => {
    const getMentorVideoStream = mentorVideoShareConsumer;
    const { track } = getMentorVideoStream;
    const stream = new MediaStream([track]);
    mentorVideoRef.current.srcObject = stream;
  };

  const removeMentorVideoStream = () => {
    if (mentorVideoRef.current) {
      mentorVideoRef.current.srcObject = null;
      if (mentorVideoShareConsumer) {
        const { track } = mentorVideoShareConsumer;
        if (track) {
          track.stop();
        }
      }
    }
  };
  useEffect(() => {
    if (mentorVideoShareConsumer) {
      renderMentorVideoStream();
    } else {
      removeMentorVideoStream();
    }
  }, [mentorVideoShareConsumer]);

  return (
    <Box
      position={"relative"}
      width={"150px"}
      height={"120px"}
      borderRadius={"10px"}
      bg="transparent"
    >
      <video
        ref={mentorVideoRef}
        autoPlay
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      />
    </Box>
  );
};

const ChatContainer = ({ isChatOpened, isScreenShare }) => {
  const theme = useTheme();
  const { primaryBlue } = theme.colors.pallete;

  return (
    <>
      <Collapse in={isChatOpened} style={{ zIndex: "2" }}>
        <SimpleBar
          style={{ maxHeight: "250px" }}
          autoHide={false}
          color="white"
        >
          {roomData.chats.map((chat) => {
            return (
              <Box
                key={chat.id}
                mb={4}
                color={isScreenShare ? "black" : "white"}
              >
                <HStack>
                  <Avatar bg={primaryBlue} size={"sm"} name={chat.peerName} />
                  <Text fontSize={"14px"}>{chat.peerName}</Text>
                </HStack>
                <Box>
                  <Text fontSize={"12px"}>{chat.message}</Text>
                </Box>
              </Box>
            );
          })}
        </SimpleBar>
      </Collapse>
    </>
  );
};
const ChatToolBox = ({ mentorVideoRef, isScreenShare }) => {
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [isQuestionBoxExpanded, setIsQuestionBoxExpanded] = useState(false);

  const { isOpen: isChatOpened, onToggle: onChatToggle } = useDisclosure();
  return (
    <Box position={"absolute"} height={"100%"} p={4} right={0}>
      <Flex
        height={"100%"}
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={"flex-end"}
      >
        <MentorVideoSection mentorVideoRef={mentorVideoRef} />

        <Flex alignItems={"flex-end"} gap={2}>
          <HStack borderRadius={"full"} bg="white">
            <IconButton
              borderRadius={"full"}
              bg="white"
              onClick={() => {
                setIsQuestionBoxExpanded(!isQuestionBoxExpanded);
              }}
              icon={<TfiMenuAlt size={20} />}
            />

            {isQuestionBoxExpanded && (
              <>
                <Input
                  type="text"
                  placeholder={roomData.askQuestion}
                  borderRadius="full"
                  border={"none"}
                  px={1}
                  transition={"all 0.3 ease"}
                  overflow={"hidden"}
                  _focus={{
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                  }}
                />

                <IconButton
                  bg="white"
                  transition={"all 0.3 ease"}
                  borderRadius={"full"}
                  icon={<PiPaperPlaneTiltBold size={20} />}
                />
              </>
            )}
          </HStack>

          <Stack>
            <ChatContainer
              isChatOpened={isChatOpened}
              isScreenShare={isScreenShare}
            />
            <InputGroup bg="white" borderRadius={"full"}>
              <IconButton
                bg="white"
                borderRadius={"full"}
                onClick={() => {
                  setIsChatExpanded(!isChatExpanded);
                  onChatToggle();
                }}
                icon={<FaRegComment size={20} />}
              />

              {isChatExpanded && (
                <>
                  <Input
                    type="text"
                    placeholder={roomData.typeSomething}
                    borderRadius="full"
                    border={"none"}
                    px={1}
                    transition={"all 0.3 ease"}
                    overflow={"hidden"}
                    _focus={{
                      outline: "none",
                      boxShadow: "none",
                      border: "none",
                    }}
                  />

                  <IconButton
                    bg="white"
                    transition={"all 0.3 ease"}
                    borderRadius={"full"}
                    icon={<PiPaperPlaneTiltBold size={20} />}
                  />
                </>
              )}
            </InputGroup>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

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
      stopProducing(producerScreenShare.id, producerScreenShare.appData);
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
        video: false,
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
          producerTransport.produce({
            track: track,
            appData: appData,
          });
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

      stopProducing(
        producerMentorVideoShare.id,
        producerMentorVideoShare.appData
      );
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
  return (
    <Box position={"absolute"} height={"100%"} p={4}>
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
          <IconButton isRound={true} icon={<FiMenu size={20} />} />
          <IconButton isRound={true} icon={<BiBarChart size={20} />} />
        </Stack>
        <Stack>
          <Tooltip label={roomData.settings} placement="right">
            <IconButton isRound={true} icon={<LuSettings size={20} />} />
          </Tooltip>
        </Stack>
        {/* <Stack>
            <VideoSection />
          </Stack> */}
      </Flex>
    </Box>
  );
};

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
  } = props;
  const [activeAudioConsumers, setActiveAudioConsumers] = useState([]);

  const { mentorScreenShareConsumer } = useSelector((state) => state.socket);
  const { audioConsumers } = useSelector((state) => state.socket);

  const renderMentorScreenShare = () => {
    const getMentorScreenShare = mentorScreenShareConsumer;
    const { track } = getMentorScreenShare;
    const stream = new MediaStream([track]);
    screenShareRef.current.srcObject = stream;
  };

  const renderAudioStreams = () => {
    audioConsumers.forEach((consumer) => {
      const { track } = consumer;

      if (track) {
        const audioElement = document.createElement("audio");
        audioElement.srcObject = new MediaStream([track]);
        audioElement.autoplay = true;
        audioElement.playsInline = true;
        document.getElementById("remote_audios").appendChild(audioElement);
      }
    });
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
    if (audioConsumers && audioConsumers.length > 0) {
      renderAudioStreams();
    }
  }, [audioConsumers]);
  useEffect(() => {
    if (mentorScreenShareConsumer) {
      renderMentorScreenShare();
    } else {
      removeMentorScreenShare();
    }
  }, [mentorScreenShareConsumer]);
  return (
    <>
      <Box
        width={"100%"}
        height={"100%"}
        bg="black"
        borderRadius={"10px"}
        position={"relative"}
      >
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
        <audio ref={micRef} autoPlay playsInline hidden muted />
        <Box id="remote_audios"></Box>

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
        />
        <ChatToolBox
          isScreenShare={isScreenShare}
          mentorVideoRef={mentorVideoRef}
        />

        {(!isScreenShare || !screenShareStream) && (
          <Text
            position={"absolute"}
            top={"50%"}
            left={"50%"}
            fontSize={"2rem"}
            color={"white"}
            transform={"translate(-50%,-50%)"}
          >
            {roomData.mentorScreenShareOff}
          </Text>
        )}
      </Box>
    </>
  );
};

export default LiveSessionStream;

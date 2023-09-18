import {
  Box,
  Flex,
  VStack,
  useTheme,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FiMic, FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";
import { LuSettings } from "react-icons/lu";
import { liveSessionData } from "../data/liveSessionData";
import { useDispatch } from "react-redux";
import {
  setAudioControl,
  setVideoControl,
} from "../../../store/actions/streamControlActions";
import { checkUserType } from "../../../utils";

const RoomPreviewVideo = () => {
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const dispatch = useDispatch();
  const videoRef = useRef();
  const theme = useTheme();
  const { backgroundLightBlue } = theme.colors.pallete;

  const getWebCamFeed = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setVideoStream(stream);
      }
    } catch (err) {
      console.log("webcam feed error = ", err);
    }
  };

  const toggleVideo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isVideoOn) {
      if (videoStream) {
        const tracks = videoStream.getTracks();
        tracks.forEach((track) => track.stop());

        setVideoStream(null); // Clear the stored stream
      }
      dispatch(setVideoControl(false)); // Set the video control to false
      setIsVideoOn(false);
    } else {
      getWebCamFeed();
      dispatch(setVideoControl(true)); // set video control to true
      setIsVideoOn(true);
    }
  };

  const toggleAudio = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMicOn) {
      dispatch(setAudioControl(false)); // set audio control as false
      setIsMicOn(false);
    } else {
      dispatch(setAudioControl(true)); // set audio control as true (default
      setIsMicOn(true);
    }
  };
  useEffect(() => {
    if (isVideoOn) {
      getWebCamFeed();
    }

    return () => {
      if (videoStream) {
        const tracks = videoStream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isVideoOn]);
  return (
    <>
      <Box bg={backgroundLightBlue} width={"70%"} borderRadius={"2xl"} p={6}>
        <VStack>
          <Box width="100%" height={"500px"} position={"relative"}>
            {!isVideoOn && (
              <Text
                color="white"
                position={"absolute"}
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                fontSize={"2rem"}
              >
                {liveSessionData.cameraOff}
              </Text>
            )}

            <video
              ref={videoRef}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                overflow: "hidden",
                borderRadius: "20px",
                background: "black",
              }}
              autoPlay
            />
          </Box>
        </VStack>
        <Box pt={6}>
          <Flex px={10} justifyContent={"space-between"}>
            <HStack>
              <Box pr={4}>
                <IconButton
                  icon={isMicOn ? <FiMic size={20} /> : <FiMicOff size={20} />}
                  isRound={true}
                  bg={isMicOn ? "gray.200" : "red"}
                  _hover={{ bg: isMicOn ? "gray.200" : "red" }}
                  onClick={(e) => toggleAudio(e)}
                />
              </Box>
              <Box>
                <IconButton
                  icon={
                    isVideoOn ? <FiVideo size={20} /> : <FiVideoOff size={20} />
                  }
                  isRound={true}
                  bg={isVideoOn ? "gray.200" : "red"}
                  _hover={{ bg: isVideoOn ? "gray.200" : "red" }}
                  onClick={(e) => toggleVideo(e)}
                />
              </Box>
            </HStack>
            <Box>
              <IconButton
                icon={<LuSettings size={20} />}
                isRound={true}
                bg={"gray.200"}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default RoomPreviewVideo;

import { useEffect, useRef, useState } from "react";
import { Box, Grid, GridItem, useTheme } from "@chakra-ui/react";

import LiveSessionDescription from "../components/LiveSessionDescription";
import LiveSessionStream from "../components/LiveSessionStream";
import LiveSessionMembers from "../components/LiveSessionMembers";
import {
  createSendTransportHandler,
  getProducersHandler,
  initializeDeviceHandler,
} from "../../../socketconnections/socketconnections";
import { useSelector } from "react-redux";
import { liveSessionMemberViewType } from "../../../constants/staticvariables";

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
  const { rtpCapabilities } = useSelector((state) => state.socket);

  const micRef = useRef();
  const screenShareRef = useRef();
  const mentorVideoRef = useRef();

  const theme = useTheme();
  const { primaryBlue, backgroundLightBlue } = theme.colors.pallete;

  const stopScreenShare = () => {
    setIsScreenShare(false);
    setScreenShareStream(null);
  };

  const renderColumns = (peersViewType, isEnlarged) => {
    if (isEnlarged) {
      return "1fr";
    } else if (peersViewType === liveSessionMemberViewType.compact) {
      return "15% 80% 5%";
    } else if (peersViewType === liveSessionMemberViewType.expanded) {
      return "1.3fr 6fr 1fr";
    }
  };

  useEffect(() => {
    if (screenShareStream) {
      const screenShareTrack = screenShareStream.getVideoTracks()[0];
      screenShareTrack.addEventListener("ended", stopScreenShare);
      return () => {
        screenShareTrack.removeEventListener("ended", stopScreenShare);
      };
    }
  }, [screenShareStream]);

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
        // create device -> create producer send transport -> get all existed producer from the server and create consumers for each
        await deviceInitialize(rtpCapabilities);
        await createSendTransportHandler();
        getProducersHandler();
      }
    };
    initialization();
  }, [rtpCapabilities]);

  useEffect(() => {
    return () => {
      // on Unmount disconnect the participant  from room
      console.log("unmounting room");
    };
  }, []);
  return (
    <>
      <Box pt={4} pb={4} px={10}>
        <Grid
          templateColumns={renderColumns(peersViewType, isEnlarged)}
          gap={4}
          alignItems={"start"}
          justifyContent={"space-between"}
        >
          {!isEnlarged && (
            <GridItem bg={backgroundLightBlue} borderRadius={"md"}>
              <LiveSessionDescription />
            </GridItem>
          )}

          <GridItem
            height={isEnlarged && "90vh"}
            bg={backgroundLightBlue}
            p={4}
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
            />
          </GridItem>

          {!isEnlarged && (
            <GridItem
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
                viewType={peersViewType}
              />
            </GridItem>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Room;

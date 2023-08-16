import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  useTheme,
  HStack,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { liveSessionData } from "../data/liveSessionData";
import { MainBtn } from "../../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { joinRoomHandler } from "../../../socketconnections/socketconnections";
import { setRtpCapabilities } from "../../../store/actions/socketActions";

const PeerList = ({ peers, type }) => {
  const theme = useTheme();
  const { primaryBlue } = theme.colors.pallete;
  // TODO - filter the list of peers based on type if mentor then show mentors list if students then students
  return (
    <>
      {peers.map((peer, index) => (
        <Box key={peer.id} p={2} borderRadius={"md"} bg={"gray.200"}>
          <Avatar
            name={peer.name}
            bg={primaryBlue}
            size={"xs"}
            borderRadius={"md"}
          />
        </Box>
      ))}
    </>
  );
};

const renderPeerData = (isPeerLoading, peers, liveSessionData, type) => {
  if (isPeerLoading) {
    return <Spinner />;
  }
  if (peers.length === 0) {
    return (
      <Text fontSize={"12px"}>
        {type === liveSessionData.mentor
          ? liveSessionData.noMentorsJoined
          : liveSessionData.noStudentsJoined}
      </Text>
    );
  }
  return <PeerList peers={peers} type={type} />;
};

const RoomPreviewJoinDescription = ({ roomId }) => {
  const [isRoomLoading, setIsRoomLoading] = useState(false);
  const theme = useTheme();
  const {
    backgroundLightBlue,
    primaryBlue,
    mainTextColor,
    secondaryTextColor,
  } = theme.colors.pallete;

  const { isPeerLoading, peers } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const navigateToRoom = async () => {
    setIsRoomLoading(true);

    // join room
    try {
      const res = await joinRoomHandler(roomId);
      if (res.success) {
        dispatch(setRtpCapabilities(res.rtpCapabilities));
        navigate(`/room/${roomId}`);
      } else {
        // later on add notification
        console.log("something went wrong in join room ", res);
      }
    } catch (err) {
      // Later on add notification
      console.log("join room error", err);
    }

    setIsRoomLoading(false);
  };

  return (
    <>
      <Box bg={backgroundLightBlue} width={"30%"} borderRadius={"2xl"} p={8}>
        <Box>
          <HStack>
            <Box
              bg={primaryBlue}
              width="12px"
              height="25px"
              borderRadius={"20px"}
            ></Box>
            <Text fontWeight={"400"}>{liveSessionData.liveSessionText}</Text>
          </HStack>
          <Box pt={6}>
            <Flex justifyContent={"space-between"}>
              <Box>
                <Text fontSize={"14px"} color={mainTextColor}>
                  {liveSessionData.liveSessionTopic}
                </Text>
                <Text color={secondaryTextColor} fontSize={"12px"}>
                  {liveSessionData.liveSessionMentor}
                </Text>
              </Box>
              <Box>
                <Text pt={1} color={secondaryTextColor} fontSize={"12px"}>
                  {liveSessionData.liveSessionTimings}
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box pt={6}>
            <Text fontSize={"14px"} color={mainTextColor}>
              {liveSessionData.description}
            </Text>
            <Text color={secondaryTextColor} fontSize={"12px"}>
              {liveSessionData.liveSessionDescription}
            </Text>
          </Box>
          <Box pt={6}>
            <Text fontSize={"14px"} color={mainTextColor}>
              {liveSessionData.agenda}
            </Text>
            {liveSessionData.liveSessionAgendas.map((agenda, index) => (
              <HStack key={agenda.id} pt={1}>
                <Box
                  width={"15px"}
                  height={"15px"}
                  bg={"gray.200"}
                  borderRadius={"100%"}
                />
                <Text color={secondaryTextColor} fontSize={"12px"}>
                  {agenda.value}
                </Text>
              </HStack>
            ))}
          </Box>

          <Box pt={6}>
            <VStack>
              <Text fontSize={"14px"} color={mainTextColor}>
                {liveSessionData.mentorsJoined}
              </Text>
              <Flex gap={2}>
                {renderPeerData(
                  isPeerLoading,
                  peers,
                  liveSessionData,
                  liveSessionData.mentor
                )}
              </Flex>
            </VStack>
            <VStack pt={2}>
              <Text fontSize={"14px"} color={mainTextColor}>
                {liveSessionData.studentsJoined}
              </Text>
              <Flex gap={2}>
                {renderPeerData(
                  isPeerLoading,
                  peers,
                  liveSessionData,
                  liveSessionData.student
                )}
                {peers.length > 4 && (
                  <Box p={2} borderRadius={"md"} bg={"gray.200"}>
                    <Avatar
                      name={"9 +"}
                      bg={primaryBlue}
                      size={"xs"}
                      borderRadius={"md"}
                    />
                  </Box>
                )}
              </Flex>
            </VStack>
          </Box>

          <Box pt={6}>
            <MainBtn
              isLoading={isRoomLoading}
              text={liveSessionData.joinClass}
              backColor={primaryBlue}
              textColor="white"
              onClickHandler={navigateToRoom}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RoomPreviewJoinDescription;

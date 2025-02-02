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
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { liveSessionData } from "../data/liveSessionData";
import { MainBtn } from "../../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { joinRoomHandler } from "../../../socketconnections/socketconnections";
import {
  setRtpCapabilities,
  setSelfDetails,
} from "../../../store/actions/socketActions";
import { capitalize, formatTime, renderLeftMembersCount } from "../../../utils";
import { useToastContext } from "../../../components/toastNotificationProvider/ToastNotificationProvider";

const PeerList = ({ peers, type }) => {
  const theme = useTheme();
  const { primaryBlue } = theme.colors.pallete;

  let displayedPeers = [];
  if (type === liveSessionData.mentor) {
    // for displaying mentor if out of all peers there is no mentor present then return text as no mentor joined
    displayedPeers = peers.filter((peer) => peer.isTeacher).slice(0, 3);
    if (displayedPeers.length === 0) {
      return <Text fontSize={"12px"}>{liveSessionData.noMentorsJoined}</Text>;
    }
  } else {
    displayedPeers = peers.filter((peer) => !peer.isTeacher).slice(0, 3);
    if (displayedPeers.length === 0) {
      return <Text fontSize={"12px"}>{liveSessionData.noStudentsJoined}</Text>;
    }
  }

  return (
    <>
      {displayedPeers.map((peer) => (
        <Box key={peer.id} p={2} borderRadius={"md"} bg={"gray.200"}>
          <Avatar
            color={"white"}
            name={peer.name}
            bg={primaryBlue}
            size={"sm"}
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
    primaryBlue,
    primaryBlueLight,
    mainTextColor,
    secondaryTextColor,
    outerBackground,
  } = theme.colors.pallete;

  const { roomPreviewData } = useSelector((state) => state.socket);
  const { isPeerLoading, peers } = useSelector((state) => state.member);
  const { userProfile: userProfile } = useSelector((state) => state.auth);

  const { addNotification } = useToastContext();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const studentPeerCount = peers?.reduce((acc, curr) => {
    if (!curr.isTeacher) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const navigateToRoom = async () => {
    setIsRoomLoading(true);

    // join room
    try {
      const res = await joinRoomHandler(roomId, userProfile);
      if (res.success) {
        dispatch(setSelfDetails(res.selfDetails));
        dispatch(setRtpCapabilities(res.rtpCapabilities));
        navigate(`/room/${roomId}`);
      } else {
        // later on add notification
        addNotification("Something went wrong in join room", "error", 3000);
      }
    } catch (err) {
      // Later on add notification
      addNotification(err?.errMsg, "error", 3000);
    }
    setIsRoomLoading(false);
  };

  return (
    <Box
      bg={outerBackground}
      width={["100%", "100%", "40%", "30%"]}
      borderRadius={"2xl"}
      p={8}
    >
      <Flex
        height={"100%"}
        direction={"column"}
        justifyContent={"space-between"}
      >
        <Box>
          <HStack mb={4}>
            <Box
              bg={primaryBlue}
              width="12px"
              height="25px"
              borderRadius={"20px"}
            ></Box>
            <Text fontWeight={"400"}>{liveSessionData.liveSessionText}</Text>
          </HStack>
          <Box pt={6} mb={4}>
            <Flex justifyContent={"space-between"}>
              <Box>
                <Text fontSize={"14px"} color={mainTextColor} mb={2}>
                  {capitalize(
                    roomPreviewData?.LiveClassRoomDetail?.topicName
                  ) || liveSessionData.noData}
                </Text>
                <Text color={secondaryTextColor} fontSize={"12px"}>
                  {roomPreviewData?.mentorName || liveSessionData.noData}
                </Text>
              </Box>
              <Box>
                <Text pt={1} color={secondaryTextColor} fontSize={"12px"}>
                  {formatTime(roomPreviewData?.scheduledStartTime)} -
                  {formatTime(roomPreviewData?.scheduledEndTime)}
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box pt={6} mb={4}>
            <Text fontSize={"14px"} color={mainTextColor} mb={2}>
              {liveSessionData.description}
            </Text>
            <Text color={secondaryTextColor} fontSize={"12px"} noOfLines={2}>
              {roomPreviewData?.LiveClassRoomDetail?.description ||
                liveSessionData.noData}
            </Text>
          </Box>
          <Box pt={6}>
            <Text fontSize={"14px"} color={mainTextColor} mb={2}>
              {liveSessionData.agenda}
            </Text>
            {roomPreviewData?.LiveClassRoomDetail?.agenda ? (
              roomPreviewData.LiveClassRoomDetail.agenda
                .split("\r\n")
                .slice(0, 4) // Take only the first 4 items
                .map((agenda, index) => (
                  <HStack key={index} pt={1}>
                    <Box
                      width={"13px"}
                      height={"13px"}
                      bg={"gray.200"}
                      borderRadius={"100%"}
                    />
                    <Text color={secondaryTextColor} fontSize={"12px"}>
                      {agenda}
                    </Text>
                  </HStack>
                ))
            ) : (
              <Text color={secondaryTextColor} fontSize={"12px"} noOfLines={2}>
                {liveSessionData.noData}
              </Text>
            )}
          </Box>
        </Box>
        <Box>
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
                  <Center p={2} borderRadius={"md"} bg={"gray.200"}>
                    <Flex
                      borderRadius={"md"}
                      w={"30px"}
                      height={"30px"}
                      bg={primaryBlue}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Text color={"white"} fontWeight={600} fontSize={"10px"}>
                        +{renderLeftMembersCount(studentPeerCount, 3)}
                      </Text>
                    </Flex>
                  </Center>
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
              hoverColor={primaryBlueLight}
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default RoomPreviewJoinDescription;

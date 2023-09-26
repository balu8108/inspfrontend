import {
  Stack,
  Box,
  Avatar,
  Flex,
  HStack,
  Text,
  IconButton,
  Center,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { liveSessionMemberViewType } from "../../../constants/staticvariables";
import { useState, useEffect } from "react";
import { FiMic, FiMicOff, FiVideoOff } from "react-icons/fi";
import { renderLeftMembersCount } from "../../../utils";
import SimpleBar from "simplebar-react";

const LiveSessionMembers = ({ primaryBlue, viewType }) => {
  const { peers } = useSelector((state) => state.socket);
  const [isMicOn, setIsMicOn] = useState(false);
  const [maxBoxesPerRow, setMaxBoxesPerRow] = useState(3);

  useEffect(() => {
    const calculateMaxBoxesPerRow = () => {
      const screenHeight = window.innerHeight;
      const rowHeight =
        viewType === liveSessionMemberViewType.compact ? 80 : 120; // Adjust row height as needed

      const calculatedMaxBoxes = Math.floor(screenHeight / rowHeight) - 1;
      setMaxBoxesPerRow(calculatedMaxBoxes > 0 ? calculatedMaxBoxes : 1); // Ensure at least one box per row
    };

    calculateMaxBoxesPerRow(); // Initial calculation

    // Add a listener for window resize events
    window.addEventListener("resize", calculateMaxBoxesPerRow);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", calculateMaxBoxesPerRow);
    };
  }, [viewType]);

  const renderExpandedPeers = () => {
    return (
      <>
        {peers.map((peer) => (
          <Flex justifyContent={"space-between"} key={peer.id}>
            <HStack mr={4}>
              <Box
                key={peer.id}
                p={2}
                borderRadius={"md"}
                bg={"gray.200"}
                alignItems={"center"}
              >
                <Avatar
                  color={"white"}
                  name={peer.name}
                  bg={primaryBlue}
                  size={"xs"}
                  borderRadius={"md"}
                />
              </Box>
              <Text fontSize={"0.9rem"}>{peer.name}</Text>
            </HStack>
            <HStack>
              <IconButton
                isRound={true}
                size={"sm"}
                bg={isMicOn ? "gray.200" : "red"}
                _hover={{ bg: isMicOn ? "gray.200" : "red" }}
                icon={
                  isMicOn ? (
                    <FiMic size={15} />
                  ) : (
                    <FiMicOff size={15} color="white" />
                  )
                }
              />
              <IconButton
                isRound={true}
                size={"sm"}
                bg={"red"}
                _hover={{ bg: "red" }}
                icon={<FiVideoOff size={15} color="white" />}
              />
            </HStack>
          </Flex>
        ))}
      </>
    );
  };

  const renderCompactPeers = () => {
    const peersToDisplay =
      viewType === liveSessionMemberViewType.compact
        ? peers.slice(0, maxBoxesPerRow)
        : peers;
    return (
      <>
        {peersToDisplay.map((peer) => (
          <Flex
            justifyContent={"center"}
            key={peer.id}
            p={2}
            borderRadius={"md"}
            bg={"gray.200"}
            alignItems={"center"}
          >
            <Avatar
              color={"white"}
              name={peer.name}
              bg={primaryBlue}
              size={"md"}
              borderRadius={"md"}
            />
          </Flex>
        ))}

        {peers.length > maxBoxesPerRow && (
          <Center px={3} py={2} borderRadius={"md"} bg={"gray.200"}>
            <Flex
              borderRadius={"md"}
              w={"100%"}
              height={"50px"}
              bg={primaryBlue}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text color={"white"} fontWeight={600} fontSize={"10px"}>
                +{renderLeftMembersCount(peers.length, maxBoxesPerRow)}
              </Text>
            </Flex>
          </Center>
        )}
      </>
    );
  };

  return (
    <>
      {viewType === liveSessionMemberViewType.compact ? (
        <Stack gap={4}>{renderCompactPeers()}</Stack>
      ) : (
        <>
          <Stack gap={4} maxHeight={"85vh"} overflowY={"auto"}>
            {renderExpandedPeers()}
          </Stack>
        </>
      )}
    </>
  );
};

export default LiveSessionMembers;

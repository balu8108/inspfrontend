import {
  Stack,
  Box,
  Avatar,
  Flex,
  HStack,
  Text,
  IconButton,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import {
  liveSessionMemberViewType,
  userType,
} from "../../../constants/staticvariables";
import { useState, useEffect } from "react";
import { FiMic, FiMicOff, FiVideoOff } from "react-icons/fi";
import { checkUserType, renderLeftMembersCount } from "../../../utils";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsMicMute } from "react-icons/bs";
import {
  blockOrUnblockMic,
  muteMicCommandByMentor,
} from "../../../socketconnections/socketconnections";
import Scrollbars from "rc-scrollbars";
const Actions = ({ peer, onOpenKickFromClass, setKickedPersonDetails }) => {
  const [isMicBlocked, setIsMicBlocked] = useState(peer?.isAudioBlocked);

  const changeMicAccess = (e) => {
    e.stopPropagation();
    if (isMicBlocked) {
      setIsMicBlocked(false);
      blockOrUnblockMic(false, peer?.socketId, peer?.id);
    } else {
      setIsMicBlocked(true);
      blockOrUnblockMic(true, peer?.socketId, peer?.id);
    }
  };
  return (
    <>
      <Menu>
        <MenuButton
          onClick={(e) => e.stopPropagation()}
          as={IconButton}
          aria-label="Options"
          icon={<BiDotsVerticalRounded />}
          isRound={true}
        />
        <MenuList>
          <MenuItem
            icon={<IoIosRemoveCircleOutline size={20} />}
            isDisabled={peer.isTeacher}
            fontSize={"1rem"}
            onClick={(e) => {
              e.stopPropagation();
              setKickedPersonDetails(peer);
              onOpenKickFromClass();
            }}
          >
            Kick from class
          </MenuItem>
          <MenuItem
            icon={<BsMicMute size={20} />}
            fontSize={"1rem"}
            onClick={changeMicAccess}
            isDisabled={peer.isTeacher}
          >
            {isMicBlocked ? "Unblock Mic" : "Block Mic"}
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

const LiveSessionMembers = ({
  primaryBlue,
  outerBackground,
  viewType,
  onOpenKickFromClass,
  setKickedPersonDetails,
}) => {
  const { peers, selfDetails } = useSelector((state) => state.socket);
  const [maxBoxesPerRow, setMaxBoxesPerRow] = useState(4);
  const userRoleType = checkUserType();
  const [isLargerThan480, isLargerThan768] = useMediaQuery([
    "(min-width: 480px)",
    "(min-width: 768px)",
  ]);

  useEffect(() => {
    const calculateMaxBoxesPerRow = () => {
      const screenHeight = window.innerHeight;
      const rowHeight =
        viewType === liveSessionMemberViewType.compact ? 80 : 120; // Adjust row height as needed

      const calculatedMaxBoxes = Math.floor(screenHeight / rowHeight) - 2;
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
    const audioEnabledHandler = (e, peer) => {
      e.stopPropagation();
      if (peer?.isAudioEnabled) {
        muteMicCommandByMentor(false, peer?.socketId, peer?.id);
      }
    };

    return (
      <>
        {peers.map((peer) => {
          console.log(peer);
          return(
            <Flex justifyContent={"space-between"} key={peer.id}>
              <HStack mr={4}>
                <Box
                  key={peer.id}
                  p={2}
                  borderRadius={"md"}
                  bg={outerBackground}
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
                <Text fontSize={"0.9rem"}>
                  {peer?.id === selfDetails?.id ? "You" : peer.name}
                </Text>
              </HStack>
              <HStack>
                <IconButton
                  isRound={true}
                  size={"sm"}
                  onClick={(e) => audioEnabledHandler(e, peer)}
                  isDisabled={userRoleType === userType.student}
                  bg={peer?.isAudioEnabled ? "gray.200" : "red"}
                  _hover={{ bg: peer?.isAudioEnabled ? "gray.200" : "red" }}
                  icon={
                    peer?.isAudioEnabled ? (
                      <FiMic size={15} />
                    ) : (
                      <FiMicOff size={15} color="white" />
                    )
                  }
                />
                <IconButton
                  isRound={true}
                  isDisabled={userRoleType === userType.student}
                  size={"sm"}
                  bg={"red"}
                  _hover={{ bg: "red" }}
                  icon={<FiVideoOff size={15} color="white" />}
                />
                {userRoleType === userType.teacher && (
                  <Actions
                    peer={peer}
                    onOpenKickFromClass={onOpenKickFromClass}
                    setKickedPersonDetails={setKickedPersonDetails}
                  />
                )}
              </HStack>
            </Flex>
          )

        }
        )}
      </>
    );
  };

  const renderCompactPeers = () => {
    // const peersToDisplay =
    //   viewType === liveSessionMemberViewType.compact
    //     ? peers.slice(0, maxBoxesPerRow)
    //     : peers;
    const peersToDisplay =
      viewType === liveSessionMemberViewType.compact ? peers : peers;
    return (
      <>
        {peersToDisplay.map((peer) => (
          <Flex
            justifyContent={"center"}
            key={peer.id}
            p={[1, 1, 2, 2]}
            borderRadius={"md"}
            bg={outerBackground}
            alignItems={"center"}
          >
            <Avatar
              color={"white"}
              name={peer.name}
              bg={primaryBlue}
              size={["sm", "sm", "sm", "md"]}
              borderRadius={"md"}
            />
          </Flex>
        ))}

        {/* {peers.length > maxBoxesPerRow && (
          <Center px={"10px"} py={2} borderRadius={"md"} bg={"gray.200"}>
            <Flex
              borderRadius={"md"}
              w={"100%"}
              bg={primaryBlue}
              height={"50px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text color={"white"} fontWeight={600} fontSize={"10px"}>
                +{renderLeftMembersCount(peers.length, maxBoxesPerRow)}
              </Text>
            </Flex>
          </Center>
        )} */}
      </>
    );
  };

  return (
    <>
      {viewType === liveSessionMemberViewType.compact ? (
        <Scrollbars autoHide="true">
          <Flex gap={"15px"} direction={["row", "row", "column", "column"]}>
            {renderCompactPeers()}
          </Flex>
        </Scrollbars>
      ) : (
        <>
          {isLargerThan768 ? (
            <Scrollbars autoHeight={true} autoHeightMin={"85vh"}>
              <Stack gap={4} maxHeight={"85vh"}>
                {renderExpandedPeers()}
              </Stack>
            </Scrollbars>
          ) : (
            <Scrollbars>
              <Flex gap={4}>{renderExpandedPeers()}</Flex>
            </Scrollbars>
          )}
        </>
      )}
    </>
  );
};

export default LiveSessionMembers;

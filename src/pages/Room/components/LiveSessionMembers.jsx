import {
  Stack,
  Box,
  Avatar,
  Flex,
  HStack,
  Text,
  IconButton,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
  InputRightElement,
  InputGroup,
  Input,
  Button,
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import KickFromClassPopup from "../../../components/popups/KickFromClassPopup";

import { useSelector } from "react-redux";
import {
  liveSessionMemberViewType,
  userType,
} from "../../../constants/staticvariables";
import { useState, useEffect } from "react";
import { FiMic, FiMicOff, FiVideoOff } from "react-icons/fi";
import { checkUserType } from "../../../utils";
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

const LiveSessionMembers = ({ primaryBlue, outerBackground }) => {
  const [viewType, setViewType] = useState("Compact");
  const [kickedPersonDetails, setKickedPersonDetails] = useState(null);
  const { peers } = useSelector((state) => state.member);
  const { selfDetails } = useSelector((state) => state.stream);
  const { userProfile } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const userRoleType = checkUserType(userProfile);
  const [isLargerThan768] = useMediaQuery(["(min-width: 768px)"]);

  const {
    isOpen: isOpenKickFromClass,
    onOpen: onOpenKickFromClass,
    onClose: onCloseKickFromClass,
  } = useDisclosure();

  const renderExpandedPeers = () => {
    const audioEnabledHandler = (e, peer) => {
      e.stopPropagation();
      if (peer?.isAudioEnabled) {
        muteMicCommandByMentor(false, peer?.socketId, peer?.id);
      }
    };

    return (
      <>
        {isOpenKickFromClass && (
          <KickFromClassPopup
            isOpen={isOpenKickFromClass}
            onClose={onCloseKickFromClass}
            kickedPersonDetails={kickedPersonDetails}
          />
        )}

        {filteredPeers.map((peer) => {
          return (
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
          );
        })}
      </>
    );
  };

  const renderCompactPeers = () => {
    const peersToDisplay = peers;
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
      </>
    );
  };
  const clearSearch = () => {
    setSearch("");
    setFilteredPeers(peers);
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value.trim());
  };
  const handleSearch = () => {
    const updatedPeers = peers.filter((peer) =>
      peer.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPeers(updatedPeers);
  };
  const [filteredPeers, setFilteredPeers] = useState([]);

  useEffect(() => {
    setFilteredPeers(peers);
  }, [peers]);

  return (
    <Flex flexDirection={"column"}>
      {userRoleType === userType.teacher && (
        <Flex
          style={{
            padding: 5,
            display:
              viewType === liveSessionMemberViewType.expanded ? "flex" : "none",
          }}
        >
          <InputGroup>
            <Input
              type="text"
              id="search"
              name="search"
              value={search}
              onChange={handleChange}
              placeholder="Search"
            />
            {search && (
              <InputRightElement cursor={"pointer"} onClick={clearSearch}>
                <RxCross2 />
              </InputRightElement>
            )}
          </InputGroup>
          <Button
            isDisabled={!search}
            type="button"
            ml={1}
            onClick={handleSearch}
          >
            <IoSearch />
          </Button>
        </Flex>
      )}
      <div
        style={{ padding: 5, height: isLargerThan768 ? "100%" : "30%" }}
        onClick={() => {
          if (viewType === liveSessionMemberViewType.compact) {
            clearSearch();
            setViewType(liveSessionMemberViewType.expanded);
          } else {
            setViewType(liveSessionMemberViewType.compact);
          }
        }}
      >
        {viewType === liveSessionMemberViewType.compact ? (
          <Scrollbars
            autoHide="true"
            style={{ width: isLargerThan768 ? 60 : "100%" }}
          >
            <Flex gap={"15px"} direction={["row", "row", "column", "column"]}>
              {renderCompactPeers()}
            </Flex>
          </Scrollbars>
        ) : (
          <>
            {isLargerThan768 ? (
              <Scrollbars
                autoHeight={true}
                autoHeightMin={"85vh"}
                style={{ width: 250 }}
              >
                <Stack gap={4} maxHeight={"85vh"}>
                  {renderExpandedPeers()}
                </Stack>
              </Scrollbars>
            ) : (
              <Scrollbars
                maxHeight={"85vh"}
                style={{ width: isLargerThan768 ? 100 : "100%" }}
              >
                <Flex gap={4}>{renderExpandedPeers()}</Flex>
              </Scrollbars>
            )}
          </>
        )}
      </div>
    </Flex>
  );
};

export default LiveSessionMembers;

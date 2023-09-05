import { useEffect, useState } from "react";
import {
  Box,
  Text,
  IconButton,
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
import { sendChatMessage } from "../../../socketconnections/socketconnections";

import { FaRegComment } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";

import { BsEmojiSmile } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { setChatMessage } from "../../../store/actions/socketActions";
import { roomData } from "../data/roomData";
import data from "@emoji-mart/data";
import { init, SearchIndex } from "emoji-mart";
import { containsEmoji } from "../../../utils";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import VideoSection from "./VideoSection";
const EmojiContainer = ({ isEmojiOpen }) => {
  const { lightGrey } = useTheme().colors.pallete;
  const [searchEmoticonValue, setSearchEmoticonValue] = useState("");
  const [emojis, setEmojis] = useState([]);
  const dispatch = useDispatch();

  const searchEmoticons = async (searchValue) => {
    init({ data });
    const searchResults = await SearchIndex.search(searchValue || "smile");
    if (searchResults) {
      const getEmojis = searchResults.flatMap(({ skins }) => skins);

      setEmojis(getEmojis);
    }
  };

  const sendEmoji = (e, emoji) => {
    dispatch(
      setChatMessage({
        msg: emoji.native,
        peerDetails: { name: "You", id: Math.random() },
      })
    );
    // send the chat msg to the server
    sendChatMessage(emoji.native);
  };
  useEffect(() => {
    searchEmoticons(searchEmoticonValue);
  }, [searchEmoticonValue]);
  return (
    <>
      {isEmojiOpen && (
        <Flex
          w="100%"
          height={"100px"}
          borderRadius={"md"}
          bg={lightGrey}
          position={"absolute"}
          zIndex={10}
          bottom={0}
          flexWrap={"wrap"}
          overflow={"auto"}
        >
          {emojis.length > 0 &&
            emojis.map((emoji) => (
              <Box
                onClick={(e) => sendEmoji(e, emoji)}
                cursor={"pointer"}
                key={emoji.unified}
                style={{ fontSize: "2em" }}
              >
                {emoji.native}
              </Box>
            ))}
        </Flex>
      )}
    </>
  );
};

const ChatContainer = ({
  isChatOpened,
  isScreenShare,
  setIsChatExpanded,
  onChatToggle,
}) => {
  const theme = useTheme();
  const { primaryBlue } = theme.colors.pallete;
  const { chatMessages } = useSelector((state) => state.socket);
  let hideChatTimer;
  const startHideTimer = () => {
    hideChatTimer = setTimeout(() => {
      setIsChatExpanded(false);
      onChatToggle();
    }, 5000);
  };
  const resetHideTimer = () => {
    clearTimeout(hideChatTimer);
    startHideTimer();
  };

  useEffect(() => {
    startHideTimer();
    return () => clearTimeout(hideChatTimer);
  }, []);

  return (
    <>
      <Collapse in={isChatOpened} style={{ zIndex: "2" }}>
        <SimpleBar
          style={{ maxHeight: "250px" }}
          autoHide={false}
          color="white"
        >
          {chatMessages.length === 0 ? (
            <Box mb={4} color={isScreenShare ? "black" : "white"}>
              <Text textAlign={"center"}> No Chats </Text>
            </Box>
          ) : (
            chatMessages?.map((chat) => {
              return (
                <Box
                  key={chat.peerDetails?.id}
                  mb={4}
                  color={isScreenShare ? "black" : "white"}
                >
                  <HStack>
                    <Avatar
                      bg={primaryBlue}
                      size={"sm"}
                      name={chat?.peerDetails?.name}
                    />

                    <Text fontSize={"14px"}>{chat?.peerDetails?.name}</Text>
                  </HStack>
                  <Box>
                    {containsEmoji(chat?.msg) ? (
                      <Box style={{ fontSize: "3em" }}>{chat?.msg}</Box>
                    ) : (
                      <Text fontSize={"12px"}>{chat?.msg}</Text>
                    )}
                  </Box>
                </Box>
              );
            })
          )}
        </SimpleBar>
      </Collapse>
    </>
  );
};
const ChatToolBox = ({ mentorVideoRef, isScreenShare }) => {
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [isQuestionBoxExpanded, setIsQuestionBoxExpanded] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [isSentBtnDisabled, setIsSentBtnDisabled] = useState(true);
  const [isChatSentLoading, setIsChatSentLoading] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const dispatch = useDispatch();

  const { isOpen: isChatOpened, onToggle: onChatToggle } = useDisclosure();

  const sendChatMsg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (chatMsg) {
      setIsChatSentLoading(true);
      dispatch(
        setChatMessage({
          msg: chatMsg,
          peerDetails: { name: "You", id: Math.random() },
        })
      );
      // send the chat msg to the server
      sendChatMessage(chatMsg);
      setIsSentBtnDisabled(true);
      setChatMsg("");
      setIsChatSentLoading(false);
    }
  };

  const handleChatMsgChange = (e) => {
    const value = e.target.value;
    if (value.trim().length > 0) {
      setChatMsg(value);
      setIsSentBtnDisabled(false);
    } else {
      setChatMsg("");
      setIsSentBtnDisabled(true);
    }
  };

  const handleChatToggling = () => {
    if (isChatExpanded) {
      // means clicked on emoji one
      setIsEmojiOpen(!isEmojiOpen);
    } else {
      setIsChatExpanded(true);
      onChatToggle();
    }
    // setIsChatExpanded(!isChatExpanded);
    // onChatToggle();
  };
  return (
    <Box position={"absolute"} height={"100%"} p={4} right={0}>
      <Flex
        height={"100%"}
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={"flex-end"}
      >
        {/* <MentorVideoSection mentorVideoRef={mentorVideoRef} /> */}
        {/* At the moment this video section belongs to mentor only */}
        <VideoSection mentorVideoRef={mentorVideoRef} />

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
                  placeholder={roomData.askSomething}
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
            <Box position={"relative"}>
              {isChatOpened && (
                <ChatContainer
                  isChatOpened={isChatOpened}
                  isScreenShare={isScreenShare}
                  setIsChatExpanded={setIsChatExpanded}
                  onChatToggle={onChatToggle}
                />
              )}
              <EmojiContainer isEmojiOpen={isEmojiOpen} />
            </Box>

            <InputGroup bg="white" borderRadius={"full"}>
              <IconButton
                bg="white"
                borderRadius={"full"}
                onClick={() => {
                  handleChatToggling();
                }}
                icon={
                  isChatExpanded ? (
                    <BsEmojiSmile size={20} />
                  ) : (
                    <FaRegComment size={20} />
                  )
                }
              />

              {isChatExpanded && (
                <>
                  <Input
                    type="text"
                    placeholder={roomData.typeSomething}
                    value={chatMsg}
                    onChange={(e) => handleChatMsgChange(e)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendChatMsg(e);
                      }
                    }}
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
                    isLoading={isChatSentLoading}
                    isDisabled={isSentBtnDisabled}
                    onClick={(e) => sendChatMsg(e)}
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

export default ChatToolBox;

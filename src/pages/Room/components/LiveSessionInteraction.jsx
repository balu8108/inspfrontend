import React, { useState, useEffect } from "react";
import {
  Flex,
  IconButton,
  Box,
  useTheme,
  InputGroup,
  Input,
  Text,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { BiBarChart } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { TfiMenuAlt } from "react-icons/tfi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import data from "@emoji-mart/data";
import { init, SearchIndex } from "emoji-mart";

import { setChatMessage } from "../../../store/actions/socketActions";
import { sendChatMessage } from "../../../socketconnections/socketconnections";
import SimpleBar from "simplebar-react";
import { containsEmoji } from "../../../utils";
import Leaderboard from "./Leaderboard";

// Active btns will be
// 1 - Leaderboard
// 2 - QnA
// 3 - Chat

const activeContentOptions = {
  Leaderboard: "Leaderboard",
  QnA: "Qna",
  Chat: "Chat",
};

const EmojiContainer = ({ isEmojiOpen, setIsEmojiOpen }) => {
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
    setIsEmojiOpen(false);
  };
  useEffect(() => {
    searchEmoticons(searchEmoticonValue);
  }, [searchEmoticonValue]);
  return (
    <>
      {isEmojiOpen && (
        <Flex
          w="100%"
          borderRadius={"md"}
          bg={lightGrey}
          position={"absolute"}
          zIndex={10}
          bottom={0}
          flexWrap={"wrap"}
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

const ChatContainer = () => {
  const theme = useTheme();
  const { primaryBlue } = theme.colors.pallete;
  const { chatMessages } = useSelector((state) => state.socket);

  return (
    <>
      <SimpleBar style={{ maxHeight: "200px" }} autoHide={false} color="white">
        {chatMessages.length === 0 ? (
          <Text textAlign={"center"} fontSize={"14px"}>
            No Chats
          </Text>
        ) : (
          chatMessages?.map((chat) => {
            return (
              <Box key={chat.peerDetails?.id} mb={4}>
                <HStack>
                  <Avatar
                    bg={primaryBlue}
                    color="white"
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
    </>
  );
};

const ChatBox = ({ chatMsg, setChatMsg }) => {
  const [isSentBtnDisabled, setIsSentBtnDisabled] = useState(true);
  const [isChatSentLoading, setIsChatSentLoading] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const dispatch = useDispatch();

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
  return (
    <>
      <Flex
        direction={"column"}
        height={"100%"}
        justifyContent={"space-between"}
      >
        <Box position={"relative"} height="100%">
          <ChatContainer />
          <EmojiContainer
            isEmojiOpen={isEmojiOpen}
            setIsEmojiOpen={setIsEmojiOpen}
          />
        </Box>

        <InputGroup bg="white" borderRadius={"full"} mt={2}>
          <IconButton
            bg="white"
            borderRadius={"full"}
            onClick={() => setIsEmojiOpen(!isEmojiOpen)}
            icon={<BsEmojiSmile size={16} />}
          />
          <Input
            type="text"
            placeholder={"Type something..."}
            borderRadius="full"
            border={"none"}
            fontSize={"12px"}
            value={chatMsg}
            onChange={(e) => handleChatMsgChange(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendChatMsg(e);
              }
            }}
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
            icon={<PiPaperPlaneTiltBold size={16} />}
          />
        </InputGroup>
      </Flex>
    </>
  );
};

const QuestioBox = () => {
  return (
    <>
      <Flex
        direction={"column"}
        height={"100%"}
        justifyContent={"space-between"}
      >
        <Box height={"100%"} textAlign={"center"}>
          <Text fontSize={"14px"}>No Questions</Text>
        </Box>
        <InputGroup bg="white" borderRadius={"full"} mt={2}>
          <IconButton
            borderRadius={"full"}
            bg="white"
            icon={<TfiMenuAlt size={16} />}
          />

          <Input
            type="text"
            placeholder={"Ask something..."}
            borderRadius="full"
            border={"none"}
            fontSize={"12px"}
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
            icon={<PiPaperPlaneTiltBold size={16} />}
          />
        </InputGroup>
      </Flex>
    </>
  );
};

const ActiveContent = ({ activeContent }) => {
  const [chatMsg, setChatMsg] = useState("");

  return (
    <>
      <Flex direction={"column"} height={"100%"}>
        {activeContent === activeContentOptions.Chat ? (
          <ChatBox chatMsg={chatMsg} setChatMsg={setChatMsg} />
        ) : activeContent === activeContentOptions.QnA ? (
          <QuestioBox />
        ) : (
          <Leaderboard isLeaderBoardOpen={true} />
        )}
      </Flex>
    </>
  );
};
const LiveSessionInteraction = () => {
  const [activeContent, setActiveContent] = useState(activeContentOptions.Chat);
  const { primaryBlue } = useTheme().colors.pallete;

  const handleActiveBtnChange = (type) => {
    setActiveContent(type);
  };
  return (
    <>
      <Flex
        px={4}
        py={2}
        direction={"column"}
        justifyContent={"space-between"}
        height="100%"
      >
        <ActiveContent activeContent={activeContent} />
        <Flex justifyContent={"space-between"} gap={2} mt={2}>
          <IconButton
            borderRadius={"full"}
            bg={
              activeContent === activeContentOptions.Leaderboard
                ? primaryBlue
                : "white"
            }
            color={
              activeContent === activeContentOptions.Leaderboard
                ? "white"
                : "black"
            }
            size="sm"
            onClick={() =>
              handleActiveBtnChange(activeContentOptions?.Leaderboard)
            }
            icon={<BiBarChart size={14} />}
          />

          <IconButton
            borderRadius={"full"}
            bg={
              activeContent === activeContentOptions.QnA ? primaryBlue : "white"
            }
            color={
              activeContent === activeContentOptions.QnA ? "white" : "black"
            }
            size="sm"
            onClick={() => handleActiveBtnChange(activeContentOptions?.QnA)}
            icon={<TfiMenuAlt size={14} />}
          />

          <IconButton
            bg={
              activeContent === activeContentOptions.Chat
                ? primaryBlue
                : "white"
            }
            color={
              activeContent === activeContentOptions.Chat ? "white" : "black"
            }
            transition={"all 0.3 ease"}
            size="sm"
            borderRadius={"full"}
            onClick={() => handleActiveBtnChange(activeContentOptions?.Chat)}
            icon={<PiPaperPlaneTiltBold size={14} />}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default LiveSessionInteraction;

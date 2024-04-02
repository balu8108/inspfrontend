import React, { useState, useEffect, useRef } from "react";
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
  Tooltip,
} from "@chakra-ui/react";
import { BiBarChart } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { TfiMenuAlt } from "react-icons/tfi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import data from "@emoji-mart/data";
import { init, SearchIndex } from "emoji-mart";
import { v4 as uuidv4 } from "uuid";
import { setChatMessage } from "../../../store/actions/socketActions";
import {
  sendChatMessage,
  sendQuestionMsg,
} from "../../../socketconnections/socketconnections";
import { Scrollbars } from "rc-scrollbars";
import { checkUserType, containsEmoji } from "../../../utils";
import Leaderboard from "./Leaderboard";
import { userType } from "../../../constants/staticvariables";
import PollResult from "./PollResult";
import PollTimer from "./PollTimer";
const activeContentOptions = {
  Leaderboard: "Leaderboard",
  QnA: "Qna",
  PollResult: "PollResult",
  Chat: "Chat",
};

const QuestionContainer = () => {
  const [autoScroll, setAutoScroll] = useState(true);
  const theme = useTheme();
  const { primaryBlue } = theme.colors.pallete;
  const { questionMessages } = useSelector((state) => state.chat);

  // Function to scroll to the latest message
  const scrollToLatestMessage = () => {
    const chatScroll = questionContainerRef.current;

    chatScroll.scrollToBottom();
  };
  const questionContainerRef = useRef(null);

  const handleScroll = () => {
    const scrollElement = questionContainerRef.current;
    const scrollTop = Math.ceil(scrollElement.getScrollTop());
    const clientHeight = scrollElement.getClientHeight();
    const scrollHeight = scrollElement.getScrollHeight();

    if (scrollTop + clientHeight < scrollHeight) {
      setAutoScroll(false);
    } else {
      setAutoScroll(true);
    }
  };
  useEffect(() => {
    if (autoScroll) {
      scrollToLatestMessage();
    }
  }, [questionMessages, autoScroll]);

  return (
    <Scrollbars
      ref={questionContainerRef}
      style={{ height: "100%" }}
      autoHide={true}
      onScroll={handleScroll}
    >
      {questionMessages.length === 0 ? (
        <Text textAlign={"center"} fontSize={"14px"}>
          No Questions
        </Text>
      ) : (
        questionMessages?.map((question) => {
          return (
            <Box key={question?.peerDetails?.id} mb={4}>
              <HStack>
                <Avatar
                  bg={primaryBlue}
                  color="white"
                  size={"xs"}
                  name={question?.peerDetails?.name}
                />

                <Text fontSize={"14px"}>{question?.peerDetails?.name}</Text>
              </HStack>
              <Box>
                <Text fontSize={"12px"}>{question?.questionMsg}</Text>
              </Box>
            </Box>
          );
        })
      )}
    </Scrollbars>
  );
};

const EmojiContainer = ({ isEmojiOpen, setIsEmojiOpen }) => {
  const { lightGrey } = useTheme().colors.pallete;
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
        peerDetails: { name: "You", id: uuidv4() },
      })
    );
    // send the chat msg to the server
    sendChatMessage(emoji.native);
    setIsEmojiOpen(false);
  };
  useEffect(() => {
    searchEmoticons("");
  }, []);
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
  const { chatMessages } = useSelector((state) => state.chat);
  const chatContainerRef = useRef(null);
  // Function to scroll to the latest message
  const scrollToLatestMessage = () => {
    const chatScroll = chatContainerRef.current;

    chatScroll.scrollToBottom();
  };
  useEffect(() => {
    scrollToLatestMessage();
  }, [chatMessages]);

  return (
    <Scrollbars
      ref={chatContainerRef}
      style={{ height: "100%" }}
      autoHide={true}
    >
      {chatMessages.length === 0 ? (
        <Text textAlign={"center"} fontSize={"14px"}>
          No Chats
        </Text>
      ) : (
        chatMessages?.map((chat) => {
          return (
            <Box key={uuidv4()} mb={4}>
              <HStack>
                <Avatar
                  bg={primaryBlue}
                  color="white"
                  size={"xs"}
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
    </Scrollbars>
  );
};

const ChatBox = () => {
  const inputRef = useRef("");
  const [isChatSentLoading, setIsChatSentLoading] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const dispatch = useDispatch();

  const sendChatMsg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const userMessage = inputRef.current?.value?.trim();
    if (userMessage.length > 0) {
      setIsChatSentLoading(true);
      dispatch(
        setChatMessage({
          msg: userMessage,
          peerDetails: { name: "You", id: uuidv4() },
        })
      );
      // send the chat msg to the server
      sendChatMessage(userMessage);
      setIsChatSentLoading(false);
      inputRef.current.value = "";
    }
  };

  return (
    <Flex direction={"column"} height={"100%"} justifyContent={"space-between"}>
      <Box height={"100%"} position={"relative"}>
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
          ref={inputRef}
          type="text"
          placeholder={"Type something..."}
          borderRadius="full"
          border={"none"}
          fontSize={"12px"}
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
          onClick={(e) => sendChatMsg(e)}
          icon={<PiPaperPlaneTiltBold size={16} />}
        />
      </InputGroup>
    </Flex>
  );
};

const QuestionBox = () => {
  const questionInputRef = useRef("");
  const [isSentBtnDisabled, setIsSentBtnDisabled] = useState(true);
  const [isQuestionSentLoading, setIsQuestionSentLoading] = useState(false);

  const userRoleType = checkUserType();

  const sendQuestionMsgHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const questionMsg = questionInputRef.current?.value?.trim();
    if (questionMsg.length > 0) {
      setIsQuestionSentLoading(true);

      // send the chat msg to the server
      sendQuestionMsg(questionMsg); // this will emit the message to backend and from backend it sends a callback to thhis user and the question is also sent to mentor as well
      setIsSentBtnDisabled(true);
      setIsQuestionSentLoading(false);
      questionInputRef.current.value = "";
    }
  };
  return (
    <Flex direction={"column"} height={"100%"} justifyContent={"space-between"}>
      <Box height={"100%"} position={"relative"}>
        <QuestionContainer />
      </Box>
      {userRoleType === userType.student && (
        <InputGroup bg="white" borderRadius={"full"} mt={2}>
          <IconButton
            borderRadius={"full"}
            bg="white"
            icon={<TfiMenuAlt size={16} />}
          />

          <Input
            ref={questionInputRef}
            type="text"
            placeholder={"Ask something..."}
            borderRadius="full"
            border={"none"}
            fontSize={"12px"}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendQuestionMsgHandler(e);
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
            isLoading={isQuestionSentLoading}
            isDisabled={isSentBtnDisabled}
            onClick={(e) => sendQuestionMsgHandler(e)}
            transition={"all 0.3 ease"}
            borderRadius={"full"}
            icon={<PiPaperPlaneTiltBold size={16} />}
          />
        </InputGroup>
      )}
    </Flex>
  );
};

const ActiveContent = ({ activeContent }) => {
  return (
    <Flex direction={"column"} height={"100%"} position={"relative"}>
      <PollTimer
        isVisible={activeContent === activeContentOptions.Leaderboard}
      />
      {activeContent === activeContentOptions.Chat ? (
        <ChatBox />
      ) : activeContent === activeContentOptions.QnA ? (
        <QuestionBox />
      ) : activeContent === activeContentOptions.PollResult ? (
        <PollResult />
      ) : (
        <Leaderboard isLeaderBoardOpen={true} />
      )}
    </Flex>
  );
};
const LiveSessionInteraction = () => {
  const [activeContent, setActiveContent] = useState(activeContentOptions.Chat);
  const { primaryBlue } = useTheme().colors.pallete;

  const handleActiveBtnChange = (type) => {
    setActiveContent(type);
  };
  return (
    <Flex
      px={4}
      py={2}
      direction={"column"}
      justifyContent={"space-between"}
      height="100%"
    >
      <ActiveContent activeContent={activeContent} />
      <Flex justifyContent={"space-between"} gap={2} mt={2}>
        <Tooltip hasArrow label={"Polls"}>
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
        </Tooltip>
        <Tooltip hasArrow label={"Poll Results"} placement="bottom">
          <IconButton
            borderRadius={"full"}
            bg={
              activeContent === activeContentOptions.PollResult
                ? primaryBlue
                : "white"
            }
            color={
              activeContent === activeContentOptions.PollResult
                ? "white"
                : "black"
            }
            size="sm"
            onClick={() =>
              handleActiveBtnChange(activeContentOptions?.PollResult)
            }
            icon={<BiBarChart size={14} />}
          />
        </Tooltip>
        <Tooltip placement="right" label="Ask a question">
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
        </Tooltip>
        <Tooltip hasArrow label="Chat" placement="right">
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
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default LiveSessionInteraction;

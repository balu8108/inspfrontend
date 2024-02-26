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
} from "@chakra-ui/react";
import { BiBarChart } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { TfiMenuAlt } from "react-icons/tfi";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import data from "@emoji-mart/data";
import { init, SearchIndex } from "emoji-mart";
import { v4 as uuidv4 } from 'uuid';
import {
  setChatMessage,
  setSendPollResponse,
} from "../../../store/actions/socketActions";
import {
  sendChatMessage,
  sendQuestionMsg,
} from "../../../socketconnections/socketconnections";
import { Scrollbars } from "rc-scrollbars";
import { checkUserType, containsEmoji } from "../../../utils";
import Leaderboard from "./Leaderboard";
import { userType } from "../../../constants/staticvariables";

const activeContentOptions = {
  Leaderboard: "Leaderboard",
  QnA: "Qna",
  Chat: "Chat",
};

const QuestionContainer = () => {
  const [autoScroll, setAutoScroll] = useState(true);
  const theme = useTheme();
  const { primaryBlue } = theme.colors.pallete;
  const { questionMessages } = useSelector(
    (state) => state.chat
  );

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

  console.log("Interaction")
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
        peerDetails: { name: "You", id: uuidv4() },
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
  const [autoScroll, setAutoScroll] = useState(true);
  console.log("chat reendered");

  const theme = useTheme();
  const { primaryBlue } = theme.colors.pallete;
  const { chatMessages } = useSelector((state) => state.chat);
  const chatContainerRef = useRef(null);
  console.log("chat messages", chatMessages);
  // Function to scroll to the latest message
  const scrollToLatestMessage = () => {
    const chatScroll = chatContainerRef.current;

    chatScroll.scrollToBottom();
  };

  const handleScroll = () => {
    const scrollElement = chatContainerRef.current;
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
    scrollToLatestMessage();
  }, [chatMessages]);

  return (
    <Scrollbars
      ref={chatContainerRef}
      style={{ height: "100%" }}
      //onScroll={handleScroll}
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

const ChatBox = ({ chatMsg, setChatMsg }) => {
  const inputRef = useRef('');
  const [isChatSentLoading, setIsChatSentLoading] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const dispatch = useDispatch();

  const sendChatMsg = (e) => {
    console.log(inputRef.current.value);
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current?.value.length > 0) {
      setIsChatSentLoading(true);
      dispatch(
        setChatMessage({
          msg: inputRef.current.value,
          peerDetails: { name: "You", id: uuidv4() },
        })
      );
      console.log("Chat message")
      // send the chat msg to the server
      sendChatMessage(inputRef.current.value);
      setChatMsg("");
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
  const [questionMsg, setQuestionMsg] = useState("");
  const [isSentBtnDisabled, setIsSentBtnDisabled] = useState(true);
  const [isQuestionSentLoading, setIsQuestionSentLoading] = useState(false);

  const userRoleType = checkUserType();

  const handleQuestionInputChange = (e) => {
    const value = e.target.value;
    if (value.trim().length > 0) {
      setQuestionMsg(value);
      setIsSentBtnDisabled(false);
    } else {
      setQuestionMsg("");
      setIsSentBtnDisabled(true);
    }
  };
  const sendQuestionMsgHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (questionMsg) {
      setIsQuestionSentLoading(true);

      // send the chat msg to the server
      sendQuestionMsg(questionMsg); // this will emit the message to backend and from backend it sends a callback to thhis user and the question is also sent to mentor as well
      setIsSentBtnDisabled(true);
      setQuestionMsg("");
      setIsQuestionSentLoading(false);
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
            type="text"
            placeholder={"Ask something..."}
            borderRadius="full"
            border={"none"}
            fontSize={"12px"}
            value={questionMsg}
            onChange={(e) => handleQuestionInputChange(e)}
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
  const [chatMsg, setChatMsg] = useState("");
  const [timer, setTimer] = useState(0);
  const { pollData } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pollData) {
      return;
    }
    setTimer(pollData?.time);
    const timerInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(timerInterval);
          dispatch(setSendPollResponse(null)); // time has elapsed now set poll timer box to null
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [pollData]);

  return (
    <Flex direction={"column"} height={"100%"} position={"relative"}>
      {activeContent === activeContentOptions.Chat ? (
        <ChatBox chatMsg={chatMsg} setChatMsg={setChatMsg} />
      ) : activeContent === activeContentOptions.QnA ? (
        <QuestionBox />
      ) : (
        <Leaderboard
          timer={timer}
          setTimer={setTimer}
          isLeaderBoardOpen={true}
        />
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
          color={activeContent === activeContentOptions.QnA ? "white" : "black"}
          size="sm"
          onClick={() => handleActiveBtnChange(activeContentOptions?.QnA)}
          icon={<TfiMenuAlt size={14} />}
        />

        <IconButton
          bg={
            activeContent === activeContentOptions.Chat ? primaryBlue : "white"
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
  );
};

export default LiveSessionInteraction;

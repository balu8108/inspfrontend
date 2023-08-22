import { useEffect, useState, useRef } from "react";
import {
  Box,
  Flex,
  HStack,
  Stack,
  Text,
  useTheme,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { roomData } from "../data/roomData";
import { MainBtn } from "../../../components/button";
const StudentPollsMCQBox = ({ question }) => {
  const [pollLimit, setPollLimit] = useState(0);
  const { primaryBlue, lightGrey } = useTheme().colors.pallete;
  const setTimerRef = useRef(null);

  const sendPollAnswer = () => {
    const data = { type: question.type, answer: "A", pollNo: 1 };
  };

  useEffect(() => {
    if (question.type === roomData.QnATypes.typePolls) {
      setPollLimit(12);
      setTimerRef.current = setInterval(() => {
        setPollLimit((prev) => {
          if (prev === 0) {
            clearInterval(setTimerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (setTimerRef.current) {
        clearInterval(setTimerRef.current);
      }
    };
  }, [question]);

  return (
    <>
      <Box
        zIndex={20}
        position={"absolute"}
        bg={lightGrey}
        right={5}
        bottom={20}
        borderRadius={"md"}
        p={6}
        w={"300px"}
      >
        <HStack>
          <Box
            bg={primaryBlue}
            width="12px"
            height="25px"
            borderRadius={"20px"}
          ></Box>
          {question.type === roomData.QnATypes.typePolls ? (
            <Flex width={"full"} justifyContent={"space-between"}>
              <Text fontSize={"0.9rem"} fontWeight={400}>
                {roomData.poll}
              </Text>
              <Text fontSize={"0.9rem"}>{pollLimit}s</Text>
            </Flex>
          ) : (
            <Text fontSize={"0.9rem"} fontWeight={400}>
              {roomData.chooseCorrectAnswer}
            </Text>
          )}
        </HStack>
        <Box my={6}>
          {question.type !== roomData.QnATypes.typePolls && (
            <Text fontSize={"0.8rem"} fontWeight={400}>
              {roomData.mcqQuestion}
            </Text>
          )}
        </Box>
        <RadioGroup>
          <Stack>
            <Radio mb={1} value="1">
              <Text fontSize={"0.8rem"}>
                {question.type === roomData.QnATypes.typePolls
                  ? "A"
                  : "Option 1"}
              </Text>
            </Radio>
            <Radio mb={1} value="2">
              <Text fontSize={"0.8rem"}>
                {question.type === roomData.QnATypes.typePolls
                  ? "B"
                  : "Option 2"}
              </Text>
            </Radio>
            <Radio mb={1} value="3">
              <Text fontSize={"0.8rem"}>
                {question.type === roomData.QnATypes.typePolls
                  ? "C"
                  : "Option 3"}
              </Text>
            </Radio>
            <Radio mb={1} value="4">
              <Text fontSize={"0.8rem"}>
                {question.type === roomData.QnATypes.typePolls
                  ? "D"
                  : "Option 4"}
              </Text>
            </Radio>
          </Stack>
        </RadioGroup>
        <Box mt={4}>
          <MainBtn
            isLoading={false}
            text={roomData.submit}
            backColor={primaryBlue}
            textColor={"white"}
            onClickHandler={() => sendPollAnswer()}
          />
        </Box>
      </Box>
    </>
  );
};

export default StudentPollsMCQBox;

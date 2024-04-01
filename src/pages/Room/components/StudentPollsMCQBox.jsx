import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Stack,
  Text,
  useTheme,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { roomData } from "../data/roomData";
import { MainBtn } from "../../../components/button";
import {
  setQuestion,
  setTimerIncrease,
} from "../../../store/actions/socketActions";
import { useDispatch, useSelector } from "react-redux";
import { sendAnswerHandler } from "../../../socketconnections/socketconnections";
const StudentPollsMCQBox = ({ question }) => {
  const [pollLimit, setPollLimit] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedCheckBox, setSelectedCheckbox] = useState([]);
  const { primaryBlue, lightGrey } = useTheme().colors.pallete;
  const { pollTimerIncrease } = useSelector((state) => state.stream);
  const dispatch = useDispatch();

  const renderAnswerOptions = (question) => {
    const handleRadioChange = (value) => {
      setSelectedAnswer(value);
      setAnswers([value]); // because radio meant to be include only one answer basically for True/False and MCQ
    };

    const handleCheckboxChange = (value) => {
      setSelectedCheckbox(value);
      setAnswers(value);
    };
    if (question.type === roomData.QnAType.MCQ) {
      return (
        <RadioGroup value={selectedAnswer} onChange={handleRadioChange}>
          <Stack>
            {Array.from({ length: question.noOfOptions }, (_, index) => {
              const optionLabel = String.fromCharCode(65 + index);
              return (
                <Radio key={optionLabel} mb={1} value={optionLabel}>
                  <Text fontSize={"0.8rem"}>{optionLabel}</Text>
                </Radio>
              );
            })}
          </Stack>
        </RadioGroup>
      );
    } else if (question.type === roomData.QnAType.TF) {
      return (
        <RadioGroup value={selectedAnswer} onChange={handleRadioChange}>
          <Stack>
            <Radio mb={1} value={"true"}>
              <Text fontSize={"0.8rem"}>True</Text>
            </Radio>
            <Radio mb={1} value={"false"}>
              <Text fontSize={"0.8rem"}>False</Text>
            </Radio>
          </Stack>
        </RadioGroup>
      );
    } else if (question.type === roomData.QnAType.POLL) {
      return (
        <CheckboxGroup value={selectedCheckBox} onChange={handleCheckboxChange}>
          <Stack>
            {Array.from({ length: question.noOfOptions }, (_, index) => {
              const optionLabel = String.fromCharCode(65 + index);
              return (
                <Checkbox mb={1} key={optionLabel} value={optionLabel}>
                  {optionLabel}
                </Checkbox>
              );
            })}
          </Stack>
        </CheckboxGroup>
      );
    } else {
      return <Text>No Options available</Text>;
    }
  };

  const sendAnswer = () => {
    if (!answers.length) {
      return; // later on will add notification or error
    } else {
      // send answer along with question id
      const data = {
        answers: answers,
        noOfOptions: question?.noOfOptions,
        type: question?.type,
        questionId: question?.questionId,
        responseTimeInSeconds: question.time - pollLimit,
      };
      sendAnswerHandler(data);
      setAnswerSubmitted(true);

      // dispatch(setQuestion(null)); // after sending response set question as null
    }
  };
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  useEffect(() => {
    if (!question) {
      return;
    }
    setPollLimit(question.time + 5);
    const countdownTimer = setInterval(() => {
      setPollLimit((prev) => {
        if (prev === 0) {
          clearInterval(countdownTimer);
          dispatch(setQuestion(null)); // time has elapsed now set question as null to remove it from view
          return 0;
        }
        if (prev === 5) {
          setShowAnswer(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownTimer) {
        clearInterval(countdownTimer);
        dispatch(setQuestion(null));
      }
    };
  }, [question, dispatch]);

  useEffect(() => {
    if (pollTimerIncrease) {
      setPollLimit((prev) => prev + pollTimerIncrease.timeIncreaseBy);
    }
    return () => {
      dispatch(setTimerIncrease(null));
    };
  }, [pollTimerIncrease, dispatch]);

  return (
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

        {!showAnswer ? (
          question.type ? (
            <Flex width={"full"} justifyContent={"space-between"}>
              <Text fontSize={"0.9rem"} fontWeight={400}>
                {roomData.QnATitle[question.type]}
              </Text>
              <Text fontSize={"0.9rem"}>{pollLimit - 5}s</Text>
            </Flex>
          ) : (
            <Text>No Type</Text>
          )
        ) : (
          <Flex width={"full"} justifyContent={"space-between"}>
            <Text fontSize={"0.9rem"} fontWeight={400}>
              Correct Answer Is{" "}
            </Text>
            <Text fontSize={"0.9rem"}>{pollLimit}s</Text>
          </Flex>
        )}
      </HStack>
      {showAnswer && (
        <Flex mt={"10px"}>
          {question.correctAnswers.map((answer) => (
            <Text fontSize={"0.9rem"}>{answer} </Text>
          ))}
        </Flex>
      )}
      {answerSubmitted && !showAnswer && (
        <Text mt={"5px"} fontSize={"0.9rem"}>
          Answer will display after poll end.
        </Text>
      )}
      {!answerSubmitted && !showAnswer && (
        <Box mt={4}>{renderAnswerOptions(question)}</Box>
      )}

      {!answerSubmitted && !showAnswer && (
        <Box mt={4}>
          <MainBtn
            isLoading={false}
            text={roomData.submit}
            backColor={primaryBlue}
            textColor={"white"}
            onClickHandler={sendAnswer}
          />
        </Box>
      )}
    </Box>
  );
};

export default StudentPollsMCQBox;

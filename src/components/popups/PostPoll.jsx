import {
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
  Text,
  Input,
  useTheme,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { BiBarChart } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { Select } from "chakra-react-select";
import { roomData } from "../../pages/Room/data/roomData";
import { MainBtn } from "../button";

import { sendQuestionHandler } from "../../socketconnections/socketconnections";
import { useState, useEffect } from "react";
import { screenshotHandler } from "../../utils";
import { imageToDocApi } from "../../api/genericapis";
import { Form, useParams } from "react-router-dom";

const questionTypeOptions = [
  { value: "poll", label: "Poll" },
  { value: "mcq", label: "MCQ" },
  { value: "tf", label: "True/False" },
];

const defaultAnswerOptions = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
];

const tfOptions = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];
const initialQnaData = {
  noOfOptions: "",
  time: "",
  questionNo: "",
  correctAnswers: [],
};

const PostPoll = ({ screenShareStream }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [questionType, setQuestionType] = useState(null);
  const [QNo, setQNo] = useState("");
  const [noOfOptions, setNoOfOptions] = useState("");
  const [answerOptions, setAnswerOptions] = useState(defaultAnswerOptions);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [qnaData, setQnaData] = useState(initialQnaData);
  const [errorData, setErrorData] = useState({});
  const [timer, setTimer] = useState("");
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { roomId } = useParams();

  const { primaryBlue } = useTheme().colors.pallete;

  const handleScreenshot = async () => {
    try {
      const screenshot = await screenshotHandler(screenShareStream);
      const formData = new FormData();

      formData.append("screenshot", screenshot);
      formData.append("data", JSON.stringify(qnaData));
      formData.append("roomId", roomId);

      if (screenshot) {
        await imageToDocApi(formData); // send screenshot to backend
      }
    } catch (err) {}
  };

  const resetForm = () => {
    setQuestionType(null);
    setQNo("");
    setTimer("");
    setNoOfOptions("");
    setSelectedAnswer(null);
    setQnaData(initialQnaData);
  };
  const sendPoll = async () => {
    setIsLoading(true);
    console.log("poll form data", qnaData);
    // set form error data
    const formErrorData = {};

    if (!questionType) {
      formErrorData.questionType = "Question type required";
    }
    if (!QNo) {
      formErrorData.questionNo = "Question no required";
    }
    if (!timer) {
      formErrorData.timer = "Timer is required";
    }
    if (!noOfOptions) {
      formErrorData.noOfOptions = "No of options is required";
    }
    if (!selectedAnswer) {
      formErrorData.correctAnswers = "Correct answer is required";
    }

    if (Object.keys(formErrorData).length > 0) {
      setErrorData(formErrorData);
      setIsLoading(false);
      return;
    }

    sendQuestionHandler(qnaData);
    await handleScreenshot();
    resetForm();
    setIsLoading(false);
    onClose();
  };

  const handleQuestionTypeChange = (object) => {
    setQuestionType(object);
    setSelectedAnswer(null);
    setQnaData((prev) => ({
      ...prev,
      correctAnswers: [],
    }));
    setQnaData((prev) => ({
      ...prev,
      type: object.value,
    }));
    setErrorData((prev) => ({
      ...prev,
      questionType: "",
    }));
    if (object.value === "tf") {
      setNoOfOptions(2);
      setQnaData((prev) => ({
        ...prev,
        noOfOptions: 2,
      }));
      setErrorData((prev) => ({
        ...prev,
        noOfOptions: "",
      }));
    } else {
      setNoOfOptions(4);
      setQnaData((prev) => ({
        ...prev,
        noOfOptions: 4,
      }));
      setErrorData((prev) => ({
        ...prev,
        noOfOptions: "",
      }));
    }
  };

  const handleQnoChange = (e) => {
    setQNo(parseInt(e.target.value));
    setQnaData((prev) => ({
      ...prev,
      questionNo: parseInt(e.target.value),
    }));
    setErrorData((prev) => ({
      ...prev,
      questionNo: "",
    }));
  };

  const handleTimerChange = (e) => {
    setTimer(parseInt(e.target.value));
    setQnaData((prev) => ({
      ...prev,
      time: parseInt(e.target.value),
    }));
    setErrorData((prev) => ({
      ...prev,
      timer: "",
    }));
  };
  const handleNoOfOptionsChange = (e) => {
    setNoOfOptions(parseInt(e.target.value));
    setQnaData((prev) => ({
      ...prev,
      noOfOptions: parseInt(e.target.value),
    }));
    setErrorData((prev) => ({
      ...prev,
      noOfOptions: "",
    }));
  };

  const generateAnswerOptions = (type, noOfOptions) => {
    if (type === "tf") {
      return tfOptions;
    } else if (noOfOptions && noOfOptions >= 2 && noOfOptions <= 10) {
      // generate A- no of Options
      let options = [];
      for (let i = 0; i < noOfOptions; i++) {
        let code = String.fromCharCode(65 + i);
        options.push({ value: code, label: code });
      }
      return options;
    }
  };

  const handleAnswerChange = (object) => {
    if (qnaData?.type === "poll") {
      // then it may have multiple answers

      setQnaData((prev) => ({
        ...prev,
        correctAnswers: object.map((item) => item.value),
      }));
    } else {
      setQnaData((prev) => ({
        ...prev,
        correctAnswers: [object.value],
      }));
    }
    setSelectedAnswer(object);
    setErrorData((prev) => ({
      ...prev,
      correctAnswers: null,
    }));
  };
  useEffect(() => {
    if (qnaData?.type) {
      const options = generateAnswerOptions(qnaData?.type, noOfOptions);
      setAnswerOptions(options);
    }
  }, [qnaData, noOfOptions]);

  useEffect(() => {
    setQnaData((prev) => ({
      ...prev,
      questionNo: QNo,
    }));
  }, [QNo]);

  return (
    <>
      <Popover
        placement="right"
        isOpen={isOpen}
        onOpen={() => {
          // setQNo(QNo + 1);
          onOpen();
        }}
        onClose={onClose}
      >
        <PopoverTrigger>
          <IconButton isRound={true} icon={<BiBarChart size={20} />} />
        </PopoverTrigger>

        <PopoverContent px={4} py={2} w="300px">
          <Stack>
            <Flex w="full" justifyContent="space-between" alignItems="center">
              <Text fontWeight={"bold"}>{roomData.pollMcqTF}</Text>
              <IconButton
                onClick={() => onClose()}
                icon={<MdClose size={20} />}
                bg="none"
                _hover={{ bg: "none" }}
              />
            </Flex>
            <Box py={2}>
              <FormControl isInvalid={!!errorData.questionType}>
                <Select
                  placeholder={roomData.selectQuestionType}
                  value={questionType}
                  onChange={handleQuestionTypeChange}
                  options={questionTypeOptions}
                  useBasicStyles
                />
                <FormErrorMessage>{errorData.questionType}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box py={2}>
              <FormControl isInvalid={!!errorData.questionNo}>
                <Input
                  value={QNo}
                  placeholder={roomData.questionNo}
                  type="number"
                  onChange={(e) => handleQnoChange(e)}
                />
                <FormErrorMessage>{errorData.questionNo}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box py={2}>
              <FormControl isInvalid={!!errorData.timer}>
                <Input
                  type="number"
                  value={timer}
                  placeholder={roomData.timerPlaceholder}
                  onChange={(e) => handleTimerChange(e)}
                />
                <FormErrorMessage>{errorData.timer}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box py={2}>
              <FormControl isInvalid={!!errorData.noOfOptions}>
                <Input
                  type="number"
                  value={
                    qnaData?.type && qnaData?.type === "tf" ? 2 : noOfOptions
                  }
                  onChange={(e) => handleNoOfOptionsChange(e)}
                  placeholder={roomData.selectNumberOfOptions}
                  isDisabled={!qnaData?.type}
                  min={2}
                  max={10}
                />
                <FormErrorMessage>{errorData.noOfOptions}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box py={2}>
              <FormControl isInvalid={!!errorData.correctAnswers}>
                <Select
                  value={selectedAnswer}
                  isMulti={qnaData?.type === "poll"}
                  placeholder={roomData.selectCorrectAnswer}
                  options={answerOptions}
                  isDisabled={!qnaData?.type}
                  onChange={handleAnswerChange}
                  useBasicStyles
                />
                <FormErrorMessage>{errorData.correctAnswers}</FormErrorMessage>
              </FormControl>
            </Box>
          </Stack>
          <Box width={"100%"} mb={2} mt={6} px={6}>
            <MainBtn
              isLoading={isLoading}
              text={roomData.send}
              backColor={primaryBlue}
              textColor={"white"}
              onClickHandler={() => sendPoll()}
            />
          </Box>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PostPoll;

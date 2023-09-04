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
} from "@chakra-ui/react";
import { BiBarChart } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { Select } from "chakra-react-select";
import { roomData } from "../../pages/Room/data/roomData";
import { MainBtn } from "../button";

import { sendQuestionHandler } from "../../socketconnections/socketconnections";
import { useState, useEffect } from "react";

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

const PostPoll = ({ QNo, setQNo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [noOfOptions, setNoOfOptions] = useState(4);
  const [answerOptions, setAnswerOptions] = useState(defaultAnswerOptions);

  const [qnaData, setQnaData] = useState({
    noOfOptions: 4,
    time: 60,
    questionNo: QNo,
    correctAnswers: [],
  });
  const [timer, setTimer] = useState(60);
  const { onOpen, onClose, isOpen } = useDisclosure();

  const { primaryBlue } = useTheme().colors.pallete;
  const sendPoll = () => {
    setIsLoading(true);
    sendQuestionHandler(qnaData);
    setIsLoading(false);
    onClose();
  };

  const handleQuestionTypeChange = (object) => {
    setQnaData((prev) => ({
      ...prev,
      type: object.value,
    }));
    if (object.value === "tf") {
      setNoOfOptions(2);
      setQnaData((prev) => ({
        ...prev,
        noOfOptions: 2,
      }));
    } else {
      setNoOfOptions(4);
      setQnaData((prev) => ({
        ...prev,
        noOfOptions: 4,
      }));
    }
  };

  const handleQnoChange = (e) => {
    setQNo(parseInt(e.target.value));
    setQnaData((prev) => ({
      ...prev,
      questionNo: parseInt(e.target.value),
    }));
  };

  const handleTimerChange = (e) => {
    setTimer(parseInt(e.target.value));
    setQnaData((prev) => ({
      ...prev,
      time: parseInt(e.target.value),
    }));
  };
  const handleNoOfOptionsChange = (e) => {
    setNoOfOptions(parseInt(e.target.value));
    setQnaData((prev) => ({
      ...prev,
      noOfOptions: parseInt(e.target.value),
    }));
  };

  const generateAnswerOptions = (type, noOfOptions) => {
    if (type === "tf") {
      return tfOptions;
    } else {
      if (noOfOptions && noOfOptions >= 2 && noOfOptions <= 10) {
        // generate A- no of Options
        let options = [];
        for (let i = 0; i < noOfOptions; i++) {
          let code = String.fromCharCode(65 + i);
          options.push({ value: code, label: code });
        }
        return options;
      }
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
          setQNo(QNo + 1);
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
              <Select
                placeholder={roomData.selectQuestionType}
                onChange={handleQuestionTypeChange}
                options={questionTypeOptions}
                useBasicStyles
              />
            </Box>
            <Box py={2}>
              <Input
                value={QNo}
                type="number"
                onChange={(e) => handleQnoChange(e)}
              />
            </Box>
            <Box py={2}>
              <Input
                type="number"
                value={timer}
                onChange={(e) => handleTimerChange(e)}
              />
            </Box>
            <Box py={2}>
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
            </Box>
            <Box py={2}>
              <Select
                isMulti={qnaData?.type === "poll"}
                placeholder={roomData.selectCorrectAnswer}
                options={answerOptions}
                isDisabled={!qnaData?.type}
                onChange={handleAnswerChange}
                useBasicStyles
              />
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

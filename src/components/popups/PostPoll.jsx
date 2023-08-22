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
import { QnATypes } from "../../constants/staticvariables";
import { sendQuestionHandler } from "../../socketconnections/socketconnections";
import { useState } from "react";

const options = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
];

const PostPoll = ({ pollNo, setPollNo }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { primaryBlue } = useTheme().colors.pallete;
  const sendPoll = () => {
    setIsLoading(true);
    const data = { type: QnATypes.poll, pollNo: pollNo, time: 60 };
    sendQuestionHandler(data);
    setIsLoading(false);
    onClose();
  };
  return (
    <>
      <Popover
        placement="right"
        isOpen={isOpen}
        onOpen={() => {
          setPollNo(pollNo + 1);
          onOpen();
        }}
        onClose={onClose}
      >
        <PopoverTrigger>
          <IconButton isRound={true} icon={<BiBarChart size={20} />} />
        </PopoverTrigger>
        <PopoverContent px={4} py={2} w="280px">
          <Stack>
            <Flex w="full" justifyContent="space-between" alignItems="center">
              <Text fontWeight={"bold"}>{roomData.poll}</Text>
              <IconButton
                onClick={() => onClose()}
                icon={<MdClose size={20} />}
                bg="none"
                _hover={{ bg: "none" }}
              />
            </Flex>
            <Box py={2}>
              <Input
                value={pollNo}
                type="number"
                onChange={(e) => setPollNo(parseInt(e.target.value))}
              />
            </Box>
            <Box py={2}>
              <Input type="number" value={60} />
            </Box>
            <Box py={2}>
              <Select
                placeholder={roomData.selectCorrectAnswer}
                options={options}
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

import { useState } from "react";
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
const StudentPollsMCQBox = ({ type }) => {
  const { primaryBlue, lightGrey } = useTheme().colors.pallete;
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
          <Text fontSize={"0.9rem"} fontWeight={400}>
            {roomData.chooseCorrectAnswer}
          </Text>
        </HStack>
        <Box my={6}>
          <Text fontSize={"0.8rem"} fontWeight={400}>
            {roomData.mcqQuestion}
          </Text>
        </Box>
        <RadioGroup>
          <Stack>
            <Radio mb={1} value="1">
              <Text fontSize={"0.8rem"}>Option 1</Text>
            </Radio>
            <Radio mb={1} value="2">
              <Text fontSize={"0.8rem"}>Option 2 </Text>
            </Radio>
            <Radio mb={1} value="3">
              <Text fontSize={"0.8rem"}>Option 3 </Text>
            </Radio>
            <Radio mb={1} value="4">
              <Text fontSize={"0.8rem"}>Option 4 </Text>
            </Radio>
          </Stack>
        </RadioGroup>
        <Box mt={4}>
          <MainBtn
            isLoading={false}
            text={roomData.submit}
            backColor={primaryBlue}
            textColor={"white"}
            onClickHandler={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};

export default StudentPollsMCQBox;

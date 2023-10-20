import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Grid, GridItem, useTheme } from "@chakra-ui/react";
import MainBtn from "../../../components/button/MainBtn";
import { useDispatch, useSelector } from "react-redux";
import { QnATypeValues } from "../../../constants/staticvariables";
import { setSendPollResponse } from "../../../store/actions/socketActions";
import { sendPollTimeIncreaseToServer } from "../../../socketconnections/socketconnections";

const PollTimer = () => {
  const { backgroundLightBlue, primaryBlue, primaryBlueLight } =
    useTheme().colors.pallete;
  const [timer, setTimer] = useState(0);
  const { pollData } = useSelector((state) => state.socket);
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

    return () => {
      dispatch(setSendPollResponse(null));
      clearInterval(timerInterval);
    };
  }, [pollData]);

  return (
    <>
      {pollData && (
        <Box position={"absolute"} bg={backgroundLightBlue} w={"full"} p={2}>
          <Text>Poll/Q&A</Text>
          <Flex
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            mt={4}
          >
            <Flex
              border="2px solid black"
              borderRadius={"100%"}
              fontSize={"1.2rem"}
              px={4}
              py={3}
            >
              <Text fontWeight={600}>{timer}</Text>
            </Flex>
            <Text fontSize={"0.8rem"}>Seconds</Text>
          </Flex>
          <Grid templateColumns="repeat(2, 1fr)" gap={4} my={4}>
            <GridItem justifyContent={"center"} alignItems={"center"}>
              <Text fontSize={"12px"} fontWeight={600}>
                Question Type
              </Text>
              <Text
                fontSize={"14px"}
                fontWeight={500}
                color={"rgba(58, 53, 65, 0.55)"}
              >
                {QnATypeValues[pollData?.type]}
              </Text>
            </GridItem>
            <GridItem>
              <Text fontSize={"12px"} fontWeight={600}>
                Question Number
              </Text>
              <Text
                fontSize={"14px"}
                fontWeight={500}
                color={"rgba(58, 53, 65, 0.55)"}
              >
                {pollData?.questionNo}
              </Text>
            </GridItem>
            <GridItem>
              <Text fontSize={"12px"} fontWeight={600}>
                No. of Options
              </Text>
              <Text
                fontSize={"14px"}
                fontWeight={500}
                color={"rgba(58, 53, 65, 0.55)"}
              >
                {pollData?.noOfOptions}
              </Text>
            </GridItem>
            <GridItem>
              <Text fontSize={"12px"} fontWeight={600}>
                Correct options
              </Text>
              <Text
                fontSize={"14px"}
                fontWeight={500}
                color={"rgba(58, 53, 65, 0.55)"}
              >
                {pollData?.correctAnswers.join(",")}
              </Text>
            </GridItem>
          </Grid>
          <MainBtn
            isLoading={false}
            text={"Add 10 seconds"}
            backColor={primaryBlue}
            textColor={"white"}
            onClickHandler={() => {
              setTimer((prev) => prev + 10);
              sendPollTimeIncreaseToServer(pollData.questionId, 10);
            }}
            hoverColor={primaryBlueLight}
          />
        </Box>
      )}
    </>
  );
};

export default PollTimer;

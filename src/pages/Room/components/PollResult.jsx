import React from "react";
import { Box, Text, Flex, HStack, useTheme, Progress } from "@chakra-ui/react";
import { roomData } from "../data/roomData";
import { useSelector } from "react-redux";
import { Scrollbars } from "rc-scrollbars";

const PollResult = () => {
  const { leaderBoardAnswerPercentage } = useSelector((state) => state.chat);
  const { primaryBlue } = useTheme().colors.pallete;
  return (
    <Box position={"relative"} height={"100%"}>
      <Scrollbars style={{ height: "100%" }} autoHide={true}>
        <Flex justifyContent={"space-between"} gap={6}>
          <HStack>
            <Box
              bg={primaryBlue}
              width="12px"
              height="23px"
              borderRadius={"20px"}
            ></Box>
            <Text fontWeight={"400"} fontSize={"12px"}>
              {roomData.pollResultText}
            </Text>
          </HStack>
        </Flex>
        <Box m={2}>
          {leaderBoardAnswerPercentage.length === 0 ? (
            <Flex
              fontSize={"12px"}
              justifyContent={"center"}
              alignItems={"center"}
              my={3}
            >
              <Text>No Data</Text>
            </Flex>
          ) : (
            leaderBoardAnswerPercentage.map((data, index) => {
              return (
                <Box my={3}>
                  <Flex
                    fontSize={"12px"}
                    key={index}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mb={1}
                  >
                    <HStack>
                      <Text>{data?.key}</Text>
                    </HStack>

                    <Text>{data?.value}%</Text>
                  </Flex>
                  <Progress size="md" value={data?.value} />
                </Box>
              );
            })
          )}
        </Box>
      </Scrollbars>
    </Box>
  );
};

export default PollResult;

import React from "react";
import { Box, Text, Flex, HStack, useTheme, Image } from "@chakra-ui/react";
import { roomData } from "../data/roomData";
import leaderboardRankingIcons from "../data/leaderboardRankingIcons";
import { shallowEqual, useSelector } from "react-redux";
import { formatSeconds } from "../../../utils";

import PollTimer from "./PollTimer";
import { Scrollbars } from "rc-scrollbars";
const Leaderboard = ({ isLeaderBoardOpen, timer, setTimer }) => {
  const { leaderBoard } = useSelector((state) => state.chat, shallowEqual);

  const { primaryBlue } = useTheme().colors.pallete;
  return (
    <>
      {isLeaderBoardOpen && (
        <Box position={"relative"} height={"100%"}>
          <PollTimer timer={timer} setTimer={setTimer} />
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
                  {roomData.leaderBoardText}
                </Text>
              </HStack>
            </Flex>
            <Box>
              {leaderBoard.length === 0 ? (
                <Flex
                  fontSize={"12px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  my={3}
                >
                  <Text>No Data</Text>
                </Flex>
              ) : (
                leaderBoard.map((data, index) => {
                  return (
                    <Flex
                      fontSize={"12px"}
                      key={data?.peerDetails?.id}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={8}
                      my={3}
                    >
                      <HStack>
                        <Image
                          h={"25px"}
                          src={leaderboardRankingIcons[index + 1]}
                          alt="rank_icon"
                        />
                        <Text>{data?.peerDetails?.name}</Text>
                      </HStack>

                      <Text>{data?.correctAnswers}</Text>
                      <Text>{formatSeconds(data?.combinedResponseTime)}</Text>
                    </Flex>
                  );
                })
              )}
            </Box>
          </Scrollbars>
        </Box>
      )}
    </>
  );
};

export default Leaderboard;

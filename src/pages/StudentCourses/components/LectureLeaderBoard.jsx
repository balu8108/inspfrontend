import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import leaderBoard from "../../../assets/images/leaderBoard.svg";
export default function LectureLeaderBoard({ lectureDetails, questionLog }) {
  return (
    <Flex>
      <img src={leaderBoard} alt="Leader Board" />
      <Box width={"100%"}>
        {lectureDetails?.LeaderBoards?.map((leaderBoard, index) => (
          <Flex
            key={leaderBoard?.id}
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={"3px"}
          >
            <Box width={"50%"}>
              <Text
                noOfLines={1}
                fontSize={"14px"}
                fontWeight={"400"}
                textColor={"#2C332978"}
              >
                {index + 1}. {leaderBoard?.peerName}
              </Text>
            </Box>
            <Text fontSize={"14px"} fontWeight={"400"} textColor={"#2C332978"}>
              {leaderBoard?.correctAnswers} / {questionLog}
            </Text>
            <Text fontSize={"14px"} fontWeight={"400"} textColor={"#2C332978"}>
              {leaderBoard?.combinedResponseTime} sec
            </Text>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
}

import React from "react";
import {
  Box,
  Text,
  Flex,
  HStack,
  useTheme,
  Button,
  Image,
} from "@chakra-ui/react";
import { roomData } from "../data/roomData";
import { GrRefresh } from "react-icons/gr";
import leaderboardRankingIcons from "../data/leaderboardRankingIcons";
const Leaderboard = ({ isLeaderBoardOpen }) => {
  const { primaryBlue, lightGrey } = useTheme().colors.pallete;
  return (
    <>
      {isLeaderBoardOpen && (
        <Box px={4} py={2} bg={lightGrey} borderRadius={"md"} mb={1}>
          <Flex justifyContent={"space-between"}>
            <HStack>
              <Box
                bg={primaryBlue}
                width="12px"
                height="23px"
                borderRadius={"20px"}
              ></Box>
              <Text fontWeight={"400"} fontSize={"14px"}>
                {roomData.leaderBoardText}
              </Text>
            </HStack>
            <Button
              fontWeight={400}
              fontSize={"10px"}
              leftIcon={<GrRefresh />}
              p={0}
            >
              {roomData.refreshText}
            </Button>
          </Flex>
          <Box>
            {roomData.leaderBoardData.map((data) => {
              return (
                <Flex
                  fontSize={"12px"}
                  key={data.id}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={10}
                  my={3}
                >
                  <HStack>
                    <Image
                      h={"25px"}
                      src={leaderboardRankingIcons[data.id]}
                      alt="rank_icon"
                    />
                    <Text>{data.name}</Text>
                  </HStack>

                  <Text>{data.correctAnswer}</Text>
                  <Text>{data.responseTime}</Text>
                </Flex>
              );
            })}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Leaderboard;

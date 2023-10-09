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
import { shallowEqual, useSelector } from "react-redux";
import { formatSeconds } from "../../../utils";
import SimpleBar from "simplebar-react";
const Leaderboard = ({ isLeaderBoardOpen }) => {
  const { leaderBoard } = useSelector((state) => state.socket, shallowEqual);

  const { primaryBlue, lightGrey } = useTheme().colors.pallete;
  return (
    <>
      {isLeaderBoardOpen && (
        // <Box
        //   borderRadius={"md"}
        //   mb={1}
        //   bg="red"

        // >
        <SimpleBar style={{ maxHeight: "250px" }}>
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
            <Button
              fontWeight={400}
              fontSize={"10px"}
              bg="none"
              leftIcon={<GrRefresh />}
              p={0}
            >
              {roomData.refreshText}
            </Button>
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
        </SimpleBar>
        // </Box>
      )}
    </>
  );
};

export default Leaderboard;

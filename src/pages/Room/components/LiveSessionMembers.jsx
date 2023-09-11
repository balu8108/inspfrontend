import {
  Stack,
  Box,
  Avatar,
  Flex,
  HStack,
  Text,
  IconButton,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { liveSessionMemberViewType } from "../../../constants/staticvariables";
import { useState } from "react";
import { FiMic, FiMicOff, FiVideoOff } from "react-icons/fi";
const LiveSessionMembers = ({ primaryBlue, viewType }) => {
  const { peers } = useSelector((state) => state.socket);
  const [isMicOn, setIsMicOn] = useState(false);

  return (
    <>
      <Stack gap={4}>
        {peers.map((peer) =>
          viewType === liveSessionMemberViewType.compact ? (
            <Flex
              justifyContent={"center"}
              key={peer.id}
              p={2}
              borderRadius={"md"}
              bg={"gray.200"}
              alignItems={"center"}
            >
              <Avatar
                name={peer.name}
                bg={primaryBlue}
                size={"md"}
                borderRadius={"md"}
              />
            </Flex>
          ) : (
            <Flex justifyContent={"space-between"} key={peer.id}>
              <HStack mr={4}>
                <Box
                  key={peer.id}
                  p={2}
                  borderRadius={"md"}
                  bg={"gray.200"}
                  alignItems={"center"}
                >
                  <Avatar
                    name={peer.name}
                    bg={primaryBlue}
                    size={"xs"}
                    borderRadius={"md"}
                  />
                </Box>
                <Text fontSize={"0.9rem"}>{peer.name}</Text>
              </HStack>
              <HStack>
                <IconButton
                  isRound={true}
                  size={"sm"}
                  bg={isMicOn ? "gray.200" : "red"}
                  _hover={{ bg: isMicOn ? "gray.200" : "red" }}
                  icon={
                    isMicOn ? (
                      <FiMic size={15} />
                    ) : (
                      <FiMicOff size={15} color="white" />
                    )
                  }
                />
                <IconButton
                  isRound={true}
                  size={"sm"}
                  bg={"red"}
                  _hover={{ bg: "red" }}
                  icon={<FiVideoOff size={15} color="white" />}
                />
              </HStack>
            </Flex>
          )
        )}
      </Stack>
    </>
  );
};

export default LiveSessionMembers;

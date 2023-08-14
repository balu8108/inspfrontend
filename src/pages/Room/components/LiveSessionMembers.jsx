import { VStack, Box, Avatar } from "@chakra-ui/react";
import { roomData } from "../data/roomData";
import { useSelector } from "react-redux";

const LiveSessionMembers = ({ primaryBlue }) => {
  const { peers } = useSelector((state) => state.socket);

  return (
    <>
      <VStack>
        {peers.map((peer) => (
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
              size={"md"}
              borderRadius={"md"}
            />
          </Box>
        ))}
      </VStack>
    </>
  );
};

export default LiveSessionMembers;

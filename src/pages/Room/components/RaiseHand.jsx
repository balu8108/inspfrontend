import React, { useEffect, useState } from "react";
import { Box, Text, useTheme } from "@chakra-ui/react";
import { roomData } from "../data/roomData";
const RaiseHand = ({ peer }) => {
  const { lightGrey } = useTheme().colors.pallete;
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      {isVisible && (
        <Box
          position={"absolute"}
          bg={lightGrey}
          borderRadius={"full"}
          left={"50%"}
          transform={"translateX(-50%)"}
          top={2}
          px={4}
          py={2}
        >
          <Text fontSize={"0.8rem"}>
            {"\u{1F44B}"} {peer.name} {roomData.raisedHand}
          </Text>
        </Box>
      )}
    </>
  );
};

export default RaiseHand;

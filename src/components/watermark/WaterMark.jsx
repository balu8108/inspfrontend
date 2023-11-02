import React from "react";
import { Flex, Text } from "@chakra-ui/react";
const WaterMark = ({ inspUserProfile }) => {
  return (
    <>
      <Flex
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        fontSize={"1rem"}
      >
        <Text id="watermark-user-name" color="rgba(128, 128, 128, 0.3)">
          {inspUserProfile?.name}
        </Text>
        <Text id="watermark-user-email" color="rgba(128, 128, 128, 0.3)">
          {inspUserProfile?.email}
        </Text>
      </Flex>
    </>
  );
};

export default WaterMark;

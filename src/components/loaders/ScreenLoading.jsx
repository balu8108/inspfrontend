import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";
const ScreenLoading = () => {
  return (
    <>
      <Flex
        position={"absolute"}
        width={"100%"}
        height={"100vh"}
        top={0}
        left={0}
        bg="rgba(0,0,0,0.5)"
        zIndex={20}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner size="xl" />
      </Flex>
    </>
  );
};

export default ScreenLoading;

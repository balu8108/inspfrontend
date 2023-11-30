import React from "react";
import { Flex, Spinner, Box, Text } from "@chakra-ui/react";
const ScreenLoading = ({ message }) => {
  return (
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
      direction={"column"}
    >
      <Spinner size="xl" />
      {message && (
        <Box mt={6}>
          <Text>{message}</Text>
        </Box>
      )}
    </Flex>
  );
};

export default ScreenLoading;

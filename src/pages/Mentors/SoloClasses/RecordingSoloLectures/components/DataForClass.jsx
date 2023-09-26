import React from "react";
import { Box, Text ,HStack} from "@chakra-ui/react";

const DataForClass = () => {
  return (
    <Box  w="25%" h={"full"} borderRadius={"12px"}>
       <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"27px"}
          ml={"27px"}
        ></Box>
        <Text
          fontSize={"20px"}
          lineHeight={"24px"}
          fontFamily={400}
          mt={"26px"}
        >
          Solo Recording
        </Text>
      </HStack>

    </Box>
  );
};

export default DataForClass;

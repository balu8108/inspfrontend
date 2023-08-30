import React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
const mathsDetails = () => {
  return (
    <Box width={"100%"} height={"999px"} bg={"#F1F5F8"} borderRadius={"26px"}>
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"33px"}
          ml={"27px"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"} mt={"26px"}>
          My Courses (Mathematics)
        </Text>
      </HStack>
      <Text fontSize={"32px"} fontWeight={"500"} lineHeight={"37px"} m={20}>
        Coming Soon
      </Text>
    </Box>
  );
};
export default mathsDetails;

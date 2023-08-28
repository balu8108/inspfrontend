import React from "react";
import {Box,HStack,Text } from "@chakra-ui/react";
const mathsScheduling=()=>{
return (
    <Box 
    width={"365px"}
    ml={"22px"}
    mt={"52px"}
    mr={"45px"}
    bg={"#F1F5F8"}
    borderRadius={"26px"}
    >
    <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"33px"}
          ml={"27px"}
        ></Box>
        <Text
          fontSize={"20px"}
          lineHeight={"26.6px"}
          fontFamily={"Segoe UI"}
          mt={"26px"}
        >
          My Courses
        </Text>
      </HStack>
    
    
    </Box>
)
}
export default mathsScheduling;
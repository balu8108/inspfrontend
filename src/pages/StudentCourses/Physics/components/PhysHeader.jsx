import React from "react";
import { Box, HStack, Text, Card, Flex, Button } from "@chakra-ui/react";
import physData from "../data/physicsHeader";
const physHeader = () => {
  return (
    <Box
      width={"100%"}
      bg={"#F1F5F8"}
      borderRadius={"2xl"}
    >
      
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"27px"}
          ml={"33px"}
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

    

      <Flex mt={"34px"} >
        {physData.map((physScreen) => (
          <Card
            borderRadius={"18px"}
            bg={"#F1F5F8"}
           
            ml={"26px"}
            mb={"20px"}
            mr={"20px"}
            blendMode={"multiply"}
            key={physScreen.id}
            
          >
            <Text 
            fontSize={"16px"}
             fontWeight={"400"}  
             color={"#2C3329"} 
             ml={"13px"} 
             mt={"13px"}>
              {physScreen.subject}
            </Text>

            <Text
              fontSize={"12px"}
              fontWeight={"400px"}
              color={"#2C3329"}
              mt={"14px"}
              ml={"14px"}
            >
              Description
            </Text>
            <Text
              fontSize={"11px"}
              lineHeight={"21px"}
              fontWeight={"400px"}
              ml={"13px"}
              mt={"6px"}
              color={"rgba(44, 51, 41, 0.47)"}
            >
              {physScreen.description}
            </Text>
            
            <Button
              variant={"ghost"}
              color={"#3C8DBC"}
              fontWeight={"600px"}
              size={"12px"}
              lineHeight={"16px"}
               p={6}
            >
              View Details
            </Button>
            
          </Card>
        ))}
      </Flex>
    </Box>
  );
};
export default physHeader;

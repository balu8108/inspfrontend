import React from "react";
import { Box, HStack, Text, Card, Flex, Button } from "@chakra-ui/react";
import myCourses from "../data/myCourses"
const studentMyCourse=()=>{
  return (
    <Box
      width={"880px"}
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
        {myCourses.map((homepageScreen) => (
          <Card
            borderRadius={"18px"}
            bg={"#F1F5F8"}
           
            ml={"26px"}
            mb={"20px"}
            mr={"20px"}
            blendMode={"multiply"}
            key={homepageScreen.id}
            
          >
            <Text 
            fontSize={"16px"}
             fontWeight={"400"}  
             color={"#2C3329"} 
             ml={"13px"} 
             mt={"13px"}>
              {homepageScreen.title}
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
              {homepageScreen.description}
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


}
export default studentMyCourse;
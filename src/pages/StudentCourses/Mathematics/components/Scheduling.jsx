import React from "react";
import { Box, HStack, Text, Button, Flex, VStack } from "@chakra-ui/react";
import scheduleMeetings from "../data/meetingData";
import scheduledMeetingsToday from "../data/scheduleToday";
import scheduledMeetingsWeek from "../data/scheduleWeek";
const mathsScheduling = () => {
  return (
    <Box width={"65%"} ml={"24px"} bg={"#F1F5F8"} borderRadius={"26px"}>
      <Box  mt={"37px"}  ml={"36px"}>
        <HStack spacing={"10px"}>
          <Box
            width={"11px"}
            height={"27px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
         
          ></Box>
          <Text fontSize={"20px"} lineHeight={"26.6px"} fontFamily={"Segoe UI"}>
            Ongoing
          </Text>

          <Button
            variant={"ghost"}
            fontSize={"13px"}
            lineHeight={"16px"}
            ml={"60px"}
          >
            See All
          </Button>
        </HStack>
      </Box>

      <Box
        width={"86%"}
        h={"200px"}
        bg={"#F1F5F8"}
        blendMode={"multiply"}
        borderRadius={"2xl"}
        m={"23px"}
      >
        <Flex gap={4}>
          <Box ml={"12px"} mt={"15px"}>
            <Text fontSize="15px" color={"rgba(44, 51, 41, 1)"}>
              {scheduleMeetings.chapter}
            </Text>
            <Text
              fontSize={"11px"}
              lineHeight={"13px"}
              color={"rgba(44, 51, 41, 0.47)"}
            >
              {scheduleMeetings.instructor}
            </Text>
          </Box>
          <Box
            fontSize={"10px"}
            lineHeight={"12px"}
            color={"rgba(44, 51, 41, 0.47)"}
            mt={"20px"}
            ml={5}
          >
            <Text>
              {scheduleMeetings.startTime} - {scheduleMeetings.endTime}
            </Text>
            <Text ml={14}> ({scheduleMeetings.totalTime})</Text>
          </Box>
        </Flex>

        <Text ml={"13px"} mt={"18px"} fontSize={"11px"} lineHeight={"13px"}>
          Description
        </Text>
        <Text
          p={1}
          ml={"10px"}
          fontSize={"11px"}
          lineHeight={"19px"}
          color={"rgba(44, 51, 41, 0.47)"}
        >
          {scheduleMeetings.description}
        </Text>

        <Button
          width={"89%"}
          ml={"12px"}
          mt={"12px"}
          bg={"rgba(60, 141, 188, 1)"}
          color={"white"}
        >
          Join Class
        </Button>
      </Box>

      {/* Schedule for the day these are latest */}

     
        
        <VStack spacing={10}>
        <Box p={"12px"}>
        <HStack>
        <Box
          width={"11px"}
          height={"27px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}

        ></Box>
        <Text fontSize={"20px"} lineHeight={"26.6px"}  >
          Schedule For Today
        </Text>
        </HStack>
        </Box>
        
       
        {scheduledMeetingsToday.map((meetingToday) => (
          <Box
            key={meetingToday.id}
            width={"85%"}
            height={"149px"}
            bg={"#F1F5F8"}
            borderRadius={"2xl"}
            blendMode={"multiply"}
            
          >
          
            <Flex gap={4}>
          <Box ml={"12px"} mt={"15px"}>
            <Text fontSize="15px" color={"rgba(44, 51, 41, 1)"}>
              {meetingToday.chapter}
            </Text>
            <Text
              fontSize={"11px"}
              lineHeight={"13px"}
              color={"rgba(44, 51, 41, 0.47)"}
            >
              {meetingToday.instructor}
            </Text>
          </Box>
          <Box
            fontSize={"10px"}
            lineHeight={"12px"}
            color={"rgba(44, 51, 41, 0.47)"}
            mt={"20px"}
            ml={5}
          >
            <Text>
              {meetingToday.startTime} - {meetingToday.endTime}
            </Text>
            <Text ml={14}> ({meetingToday.totalTime})</Text>
          </Box>
        </Flex>

        <Text ml={"13px"} mt={"18px"} fontSize={"11px"} lineHeight={"13px"}>
          Description
        </Text>
        <Text
          p={1}
          ml={"10px"}
          fontSize={"11px"}
          lineHeight={"19px"}
          color={"rgba(44, 51, 41, 0.47)"}
        >
          {meetingToday.description}
        </Text>

          </Box>
        ))}
      </VStack>


      {/* Schedule for the week */}


          
        <VStack spacing={10}>
        <Box mt={9}>
        <HStack>
        <Box
          width={"11px"}
          height={"27px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}

        ></Box>
        <Text fontSize={"20px"} lineHeight={"26.6px"}  >
          Schedule for the week
        </Text>
        </HStack>
        </Box>
        
       
        {scheduledMeetingsWeek.map((meetingWeek) => (
          <Box
            key={meetingWeek.id}
            width={"85%"}
            height={"149px"}
            bg={"#F1F5F8"}
            borderRadius={"2xl"}
            blendMode={"multiply"}
            mb={4}
          >
          
            <Flex gap={4}>
          <Box ml={"12px"} mt={"15px"} overflow={"hidden"}>
            <Text fontSize="15px" color={"rgba(44, 51, 41, 1)"}>
              {meetingWeek.chapter}
            </Text>
            <Text
              fontSize={"11px"}
              lineHeight={"13px"}
              color={"rgba(44, 51, 41, 0.47)"}
            >
              {meetingWeek.instructor}
            </Text>
          </Box>
          <Box
            fontSize={"10px"}
            lineHeight={"12px"}
            color={"rgba(44, 51, 41, 0.47)"}
            mt={"20px"}
            ml={5}
          >
            <Text>
              {meetingWeek.startTime} - {meetingWeek.endTime}
            </Text>
            <Text ml={14}> ({meetingWeek.totalTime})</Text>
          </Box>
        </Flex>

        <Text ml={"13px"} mt={"18px"} fontSize={"11px"} lineHeight={"13px"}>
          Description
        </Text>
        <Text
          p={1}
          ml={"10px"}
          fontSize={"11px"}
          lineHeight={"19px"}
          color={"rgba(44, 51, 41, 0.47)"}
        >
          {meetingWeek.description}
        </Text>

          </Box>
        ))}
      </VStack>



    </Box>
  );
};
export default mathsScheduling;

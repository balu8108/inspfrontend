import React from "react";
import { Box, HStack, Text, Button, Flex, VStack } from "@chakra-ui/react";
import scheduledOngoing from "../data/scheduledOngoing";
import scheduledToday from "../data/scheduledToday";
import scheduledWeek from "../data/scheduledWeek";
const ScheduledMeetings = () => {
  return (
   
    <Box
      width={"365px"}
      h={"100%"}
      ml={"24px"}
      borderRadius={"26px"}
      bg={"#F1F5F8"}
    >
      <Box mt={"37px"} ml={"36px"}>
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
            fontSize={"14px"}
            lineHeight={"16px"}
            ml={"60px"}
            fontWeight={400}
          >
            See All
          </Button>
        </HStack>
      </Box>

      <Box
        width={"86%"}
        bg={"#F1F5F8"}
        blendMode={"multiply"}
        borderRadius={"2xl"}
        m={"23px"}
      >
        <Flex gap={1}>
          <Box ml={"12px"} mt={"15px"}>
            <Text fontSize="15px" lineHeight={"19px"} color={"rgba(44, 51, 41, 1)"}>
              {scheduledOngoing.chapter}
            </Text>
            <Text
              fontSize={"11px"}
              lineHeight={"13px"}
              color={"rgba(44, 51, 41, 0.47)"}
            >
              {scheduledOngoing.instructor}
            </Text>
          </Box>
          <Box
            fontSize={"10.5px"}
            lineHeight={"12px"}
            color={"rgba(44, 51, 41, 0.47)"}
            mt={"20px"}
            ml={4}
          >
            <Text>
              {scheduledOngoing.startTime} - {scheduledOngoing.endTime}
            </Text>
            <Text ml={14}> ({scheduledOngoing.totalTime})</Text>
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
          {scheduledOngoing.description}
        </Text>

        <Button
          width={"89%"}
          fontWeight={400}
          ml={"12px"}
          mt={"12px"}
          mb={"15px"}
          bg={"rgba(60, 141, 188, 1)"}
          color={"white"}
        >
          Join Class
        </Button>
      </Box>

      {/* Schedule for the day  two latest  meeting will be displayed*/}

      <VStack spacing={"22px"}>
        <Box p={"12px"}>
          <HStack>
            <Box
              width={"11px"}
              height={"27px"}
              borderRadius={"20px"}
              bg={"#3C8DBC"}
            ></Box>
            <Text fontSize={"20px"} lineHeight={"26px"}>
              Schedule For Today
            </Text>
          </HStack>
        </Box>

        {scheduledToday.map((meetingForToday) => (
          <Box
            key={meetingForToday.id}
            width={"85%"}
            height={"149px"}
            bg={"#F1F5F8"}
            borderRadius={"2xl"}
            blendMode={"multiply"}
          >
            <Flex>
              <Box ml={"12px"} mt={"15px"}>
                <Text fontSize="15px" color={"rgba(44, 51, 41, 1)"}>
                  {meetingForToday.chapter}
                </Text>
                <Text
                  fontSize={"11px"}
                  lineHeight={"13px"}
                  color={"rgba(44, 51, 41, 0.47)"}
                >
                  {meetingForToday.instructor}
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
                  {meetingForToday.startTime} - {meetingForToday.endTime}
                </Text>
                <Text ml={14}> ({meetingForToday.totalTime})</Text>
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
              {meetingForToday.description}
            </Text>
          </Box>
        ))}
      </VStack>

      {/* Schedule for the week */}

      <VStack>
        <Box mt={"23px"} mb={"23px"}>
          <HStack>
            <Box
              width={"11px"}
              height={"27px"}
              borderRadius={"20px"}
              bg={"#3C8DBC"}
            ></Box>
            <Text fontSize={"20px"} lineHeight={"26px"}>
              Schedule for the week
            </Text>
          </HStack>
        </Box>

        {scheduledWeek.map((meetingForWeek) => (
          <Box
            key={meetingForWeek.id}
            width={"85%"}
            height={"149px"}
            bg={"#F1F5F8"}
            borderRadius={"2xl"}
            blendMode={"multiply"}
            mb={4}
          >
            <Flex>
              <Box ml={"12px"} mt={"15px"} overflow={"hidden"}>
                <Text fontSize="15px" color={"rgba(44, 51, 41, 1)"}>
                  {meetingForWeek.chapter}
                </Text>
                <Text
                  fontSize={"11px"}
                  lineHeight={"13px"}
                  color={"rgba(44, 51, 41, 0.47)"}
                >
                  {meetingForWeek.instructor}
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
                  {meetingForWeek.startTime} - {meetingForWeek.endTime}
                </Text>
                <Text ml={14}> ({meetingForWeek.totalTime})</Text>
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
              {meetingForWeek.description}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
export default ScheduledMeetings;

import { Box, Flex, Button, HStack, Text, VStack } from "@chakra-ui/react";
import {Link} from "react-router-dom"
import ongoingClasses from "../data/ongoing";
import weeklyClasses from "../data/week";
import schedulingForToday from "../data/today";
const MentorSchedulingClass = () => {
  return (
    <Box
      bg={"#F1F5F8"}
      ml={"24px"}
      borderRadius={"26px"}
      maxH={"950px"}
      w={"94%"}
      overflowY={"auto"}
      mt={"24px"}
    >
      <Button
        bg={"#3C8DBC"}
        color={"#FFFFFF"}
        fontWeight={400}
        fontSize={"14px"}
        m={"24px"}
        w={"85%"}
      >
        Schedule Class
      </Button>

      <Box
        width={"86%"}
        bg={"#F1F5F8"}
        blendMode={"multiply"}
        borderRadius={"2xl"}
        m={"23px"}
      >
        <Flex gap={1}>
          <Box ml={"12px"} mt={"15px"}>
            <Text
              fontSize="15px"
              lineHeight={"19px"}
              color={"rgba(44, 51, 41, 1)"}
            >
              {ongoingClasses.chapter}
            </Text>
            <Text
              fontSize={"11px"}
              lineHeight={"13px"}
              color={"rgba(44, 51, 41, 0.47)"}
            >
              {ongoingClasses.instructor}
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
              {ongoingClasses.startTime} - {ongoingClasses.endTime}
            </Text>
            <Text ml={14}> ({ongoingClasses.totalTime})</Text>
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
          {ongoingClasses.description}
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
          Start Class
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

        {schedulingForToday.map((meetingForToday) => (
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

        {weeklyClasses.map((meetingForWeek) => (
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
export default MentorSchedulingClass;

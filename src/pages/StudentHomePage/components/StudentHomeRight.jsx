import React from "react";
import {
  Box,
  Card,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Button,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import viewRecordedClass from "../data/homePageRight";
import { FaSearch } from "react-icons/fa";
import scheduledOngoing from "../../MeetingViewer/data/scheduledOngoing";
import scheduledToday from "../../MeetingViewer/data/scheduledToday";
import scheduledWeek from "../../MeetingViewer/data/scheduledWeek";
import "../Styling/scrollbar.css";
const FullRec = () => {
  return (
    <Box
      width={"290px"}
      h={"999px"}
      borderRadius={"26px"}
      bg={"#F1F5F8"}
      ml={"22px"}
      overflowX={"hidden"}
      overflowY={"auto"}
    >
      <InputGroup p={5}>
        <InputLeftElement pointerEvents="none">
          <FaSearch
            color="#000000"
            style={{ marginTop: "40px", marginLeft: "24px" }}
          />
        </InputLeftElement>
        <Input placeholder="Search" />
      </InputGroup>

      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          ml={"31px"}
        ></Box>
        <Text fontSize={"18px"} lineHeight={"26px"}>
          Completed
        </Text>
        <Button
          variant={"ghost"}
          fontSize={"14px"}
          lineHeight={"16px"}
          ml={4}
          fontWeight={400}
        >
          See All
        </Button>
      </HStack>

      <Box mt={4} mx={6}>
        {viewRecordedClass.map((item) => (
          <Box
            width={"250px"}
            key={item.id}
            bg={"#F1F5F8"}
            blendMode={"multiply"}
            borderRadius={"18px"}
            mb={4}
          >
            <Flex>
              <Box mt={"17px"} ml={3}>
                <Text fontSize={"14px"}>{item.title}</Text>
                <Text fontSize={"11px"} color={"#2C332978"}>
                  {item.instructorName}
                </Text>
              </Box>
              <Box p={1} ml={8} mt={"17px"}>
                <Text fontSize={"10px"} color={"#2C332978"}>
                  {item.startTime}-{item.endTime}
                </Text>
                <Text fontSize={"10.5px"} color={"#2C332978"}>
                  {item.duration}
                </Text>
              </Box>
            </Flex>

            <Text fontSize={12} ml={3} mt={3}>
              Description
            </Text>
            <Text fontSize={12} color={"#2C332978"} ml={3} mt={1}>
              {item.description}
            </Text>
            <Link to="/view-recording">
              <Button
                fontSize={14}
                fontWeight={400}
                variant={"ghost"}
                bg={"#3C8DBC"}
                color={"white"}
                h={37}
                w={"220px"}
                m={4}
              >
                View Recording
              </Button>
            </Link>
          </Box>
        ))}
      </Box>

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
          <Link to="/schedule-class">
            <Button
              variant={"ghost"}
              fontSize={"14px"}
              lineHeight={"16px"}
              ml={"60px"}
              fontWeight={400}
            >
              See All
            </Button>
          </Link>
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
            <Text fontSize="15px" color={"rgba(44, 51, 41, 1)"}>
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
            fontSize={"10px"}
            lineHeight={"12px"}
            color={"rgba(44, 51, 41, 0.47)"}
            mt={"20px"}
            ml={5}
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
        <Box p={"14px"}>
          <HStack>
            <Box
              w={"11px"}
              h={"27px"}
              borderRadius={"20px"}
              bg={"#3C8DBC"}
            ></Box>
            <Text fontSize={"20px"} lineHeight={"26px"}>
              Schedule For Today
            </Text>
          </HStack>
        </Box>

        {scheduledToday.map((meetingForToday) => (
          <Card
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
          </Card>
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

export default FullRec;

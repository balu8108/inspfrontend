import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Spacer,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { getAllSoloClassRoom } from "../../../../api/soloclassrooms";
import { useNavigate } from "react-router-dom";
const SoloClass = () => {
  const navigate = useNavigate();
  const [lectureNumber, setLectureNumber] = useState([]);
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;
  console.log("lectureNumber", lectureNumber);
  useEffect(() => {
    async function fetchLecturesForSoloClassRoom() {
      try {
        const response = await getAllSoloClassRoom();
        if (response.status) {
          console.log("response", response);
          setLectureNumber(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    }
    fetchLecturesForSoloClassRoom();
  }, []);

  const handleViewDetails = (soloClassRoomId, topic) => {
    navigate(`/my-courses/lecture-details/${topic}/${soloClassRoomId}`);
  };

  return (
    <Box
      width={"100%"}
      height={"full"}
      borderRadius={"26px"}
      bg={outerBackground}
    >
      <Flex mt={"19px"}>
        <HStack spacing={"10px"} alignItems="center" ml={"33px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"}>
            My Courses (Inpho / Olympiads)
          </Text>
        </HStack>
        <Spacer />
      </Flex>
      <Flex flexWrap={"wrap"} p={6} gap={"24px"}>
        {lectureNumber &&
          lectureNumber.map((lecture) => (
            <Card
              key={lecture.id}
              w={"31%"}
              h={"204px"}
              bg={innerBackground}
              boxShadow={innerBoxShadow}
              borderRadius={"18px"}
            >
              <Text
                fontSize={"16px"}
                fontWeight={400}
                ml={"13px"}
                mt={"16px"}
                lineHeight={"19px"}
                noOfLines={1}
              >
                Lecture {lecture.lectureNo}
              </Text>
              <Text
                fontSize={"12px"}
                fontWeight={400}
                ml={"13px"}
                color="#2C332978"
                lineHeight={"14px"}
                noOfLines={1}
              >
                {lecture.topic}
              </Text>

              <Text
                fontSize={"12px"}
                lineHeight={"13px"}
                ml={"13px"}
                fontWeight={400}
                color={"rgba(44, 51, 41, 1)"}
                mt={"18px"}
              >
                Description
              </Text>
              <Text
                fontSize={"12px"}
                lineHeight={"21px"}
                ml={"13px"}
                fontWeight={400}
                color="#2C332978"
                noOfLines={3}
              >
                {lecture.description}
              </Text>

              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontSize={"14px"}
                fontWeight={600}
                _hover={{ bg: "white" }}
                mt={"auto"}
                onClick={() => {
                  handleViewDetails(lecture.id, lecture.topic);
                }}
              >
                View Details
              </Button>
            </Card>
          ))}
      </Flex>
    </Box>
  );
};

export default SoloClass;

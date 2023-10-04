import React, {useState,useEffect} from "react"
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import soloclasses from "../data/soloclass";
import { Link } from "react-router-dom";
import axios from "axios";
const SoloClasses = () => {
  const apiUrl = "http://localhost:5000";
  const [latestSoloClassroom, setLatestSoloClassroom] = useState([]);
  useEffect(() => {
    axios.get(`${apiUrl}/solo-lecture/latest-room`).then((response) => {
      setLatestSoloClassroom(response.data.data);
    });
  }, []);
  return (
    <Box bg={"#F1F5F8"} mt={"23px"} borderRadius={"25px"} w={"95%"} >
      <Flex>
        <HStack spacing={"10px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
            mt={"16px"}
            ml={"27px"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"} mt={"16px"}>
            Solo Classes
          </Text>
        </HStack>
        <Spacer />
        <Link to={`/mentor/solo-recordings/topic`}>
          <Button
            variant={"ghost"}
            fontSize={"sm"}
            fontWeight={400}
            mt={"15px"}
            p={6}
          >
            See All
          </Button>
        </Link>
      </Flex>
      <Flex mt={"34px"} flexWrap="wrap">
        {latestSoloClassroom.map((soloclassInfo) => (
          <Box flexBasis="50%" key={soloclassInfo.id}>
            <Card
              h={"175px"}
              borderRadius={"18px"}
              bg={"#F1F5F8"}
              ml={"20px"}
              mb={"20px"}
              mr={"20px"}
              blendMode={"multiply"}
            >
              <Text
                fontSize={"16px"}
                fontWeight={"400"}
                lineHeight={"18px"}
                color={"#2C3329"}
                ml={"13px"}
                mt={"13px"}
              >
                {soloclassInfo.topic}
              </Text>
              <Text
                fontSize={"11px"}
                lineHeight={"18px"}
                color={"#2C332978"}
                ml={"13px"}
              >
                {soloclassInfo.mentorName}
              </Text>

              <Text
                fontSize={"12px"}
                lineHeight={"14px"}
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
                noOfLines={2}
              >
                {soloclassInfo.description}
              </Text>

              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600"}
                fontSize={"14px"}
                lineHeight={"16px"}
                mt={"20px"}
              >
                View Details
              </Button>
            </Card>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
export default SoloClasses;

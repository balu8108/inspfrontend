import React from "react";
import {
  Box,
  Text,
  HStack,
  Card,
  Flex,
  Button,
  Stack,
  Input,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import physVideosData from "../data/PhysVideosData";
import { FaSearch } from "react-icons/fa";
const physLibrary = () => {
  return (
    <Box width={"100%"} h={"100%"} bg={"#F1F5F8"} borderRadius={"26px"}>
      <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"}>
          Library (Physics)
        </Text>

        <InputGroup m={4} w={"220px"} ml={"310px"} borderRadius={"18px"}>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray" />
          </InputLeftElement>
          <Input placeholder="Search..." />
        </InputGroup>
      </HStack>

      <Stack>
        <Flex flexWrap="wrap" mt={"37px"} ml={"27px"} mr={"20px"} gap={"23px"}>
          {physVideosData.map((physScreen) => (
            <Card
              key={physScreen.id}
              w="30%"
              blendMode={"multiply"}
              bg={"#F1F5F8"}
              borderRadius={"18px"}
            >
              <Text fontSize={"px"} fontWeight={400} ml={"13px"} mt={"16px"}>
                {physScreen.chapterName}
              </Text>
              <Text
                fontWeight={400}
                fontSize={"12px"}
                ml={"13px"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                {physScreen.instructorName}
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
                fontWeight={400}
                ml={13}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                {physScreen.description}
              </Text>
              <Link to={`/student/physics-library/${physScreen.chapterName}`}>
                <Button
                  variant={"ghost"}
                  color={"#3C8DBC"}
                  fontWeight={"600px"}
                  size={"14px"}
                  lineHeight={"16px"}
                  p={6}
                  ml={8}
                >
                  View Details
                </Button>
              </Link>
            </Card>
          ))}
        </Flex>
      </Stack>
    </Box>
  );
};

export default physLibrary;

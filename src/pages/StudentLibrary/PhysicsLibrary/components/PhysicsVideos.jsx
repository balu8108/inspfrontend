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
const PhysLibrary = () => {
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

        <InputGroup m={4} w={"220px"} ml={370}>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="#000000" />
          </InputLeftElement>
          <Input placeholder="Search" w={"220px"} borderRadius={"14px"} />
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
              <Text ml={"13px"} mt={"16px"} lineHeight={"18px"}>
                {physScreen.chapterName}
              </Text>
              <Text
                fontSize={"12px"}
                lineHeight={"15px"}
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
                fontSize={"11px"}
                lineHeight={"21px"}
                ml={13}
                mt={"6px"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                {physScreen.description}
              </Text>
              <Link to={`/student/physics-library/${physScreen.chapterName}`}>
                <Button
                  variant={"ghost"}
                  color={"#3C8DBC"}
                  fontWeight={"600"}
                  fontSize={"14px"}
                  lineHeight={"16px"}
                  p={7}
                  ml={"40px"}
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

export default PhysLibrary;

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
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import assignmentData from "../data/assignmentDetails";

const physDetails = () => {
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
          Assignments (Physics)
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
          {assignmentData.map((assignmentScreen) => (
            <Card
              key={assignmentScreen.id}
              w="30%"
              blendMode={"multiply"}
              bg={"#F1F5F8"}
              borderRadius={"18px"}
            >
              <Text fontSize={"px"} fontWeight={400} ml={"13px"} mt={"16px"}>
                {assignmentScreen.chapterName}
              </Text>
              <Text
                fontWeight={400}
                fontSize={"12px"}
                ml={"13px"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                {assignmentScreen.instructorName}
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
                {assignmentScreen.description}
              </Text>
              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600px"}
                size={"14px"}
                lineHeight={"16px"}
                p={6}
              >
                View Details
              </Button>
            </Card>
          ))}
        </Flex>
      </Stack>
    </Box>
  );
};

export default physDetails;

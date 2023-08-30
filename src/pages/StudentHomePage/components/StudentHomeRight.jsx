import React from "react";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Button,
  Card,
  Flex,
} from "@chakra-ui/react";
import viewRecordedClass from "../data/homePageRight";
import { FaSearch } from "react-icons/fa";

const FullRec = () => {
  return (
    <Box width={"290px"} borderRadius={"26px"} bg={"#F1F5F8"} ml={"24px"}>
      <InputGroup m={4} width={"90%"}>
        <InputLeftElement pointerEvents="none">
          <FaSearch color="gray" />
        </InputLeftElement>
        <Input placeholder="Search..." />
      </InputGroup>

      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          ml={"31px"}
        ></Box>
        <Text fontSize={"20px"} lineHeight={"26px"}>
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
            width={"210px"}
            key={item.id}
            bg={"#F1F5F8"}
            blendMode={"multiply"}
            borderRadius={"18px"}
            mb={4}
          >
            <Flex>
              <Box>
                <Text fontSize={"14px"}>{item.title}</Text>
                <Text fontSize={"11px"}>{item.instructorName}</Text>
              </Box>
              <Box p={1} ml={4}>
                <Text fontSize={"9px"}>
                  {item.startTime}-{item.endTime}
                </Text>
                <Text fontSize={"11px"}>{item.duration}</Text>
              </Box>
            </Flex>

            <Text>Description</Text>
            <Text>{item.description}</Text>
            <Button>View Recording</Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FullRec;

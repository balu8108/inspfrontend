import React from "react";
import { Box, Button, Text, Flex, Center } from "@chakra-ui/react";
const Assignment = () => {
  return (
    <>
      <Box
        width={340}
        height={250}
        backgroundColor={"#F1F5F8"}
        borderRadius={10}
        ml={600}
        mt={-250}
        overflow={"hidden"}
      >
        <Flex width={700}>
          <Text p={3} ml={4} fontWeight={19}>
            Assignments
          </Text>
          <Button ml={28} variant={"ghost"} fontSize={15} fontWeight={10}>
            See All
          </Button>
        </Flex>
        <Box
          width={280}
          height={170}
          backgroundColor={"gray.200"}
          borderRadius={10}
          p={4}
          ml={5}
          mt={2}
        >
          <Text fontSize={14}>ABCD</Text>
          <Text color={"gray"} fontSize={10}>
            John Doe
          </Text>
          <Text mt={3} fontSize={15}>
            {" "}
            Description
          </Text>
          <Text fontWeight={10} color={"gray"} fontSize={11}>
            Here will be description displayed.Here will be description
            displayedHere will be description displayed
          </Text>
          <Button
            mt={0}
            ml={16}
            variant={"ghost"}
            color={"blue.400"}
            fontSize={13}
          >
            {" "}
            View Details
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default Assignment;

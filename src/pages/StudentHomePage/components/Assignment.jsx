import React from "react";
import {
  Box,
  Button,
  Text,
  HStack,
  useTheme,
  Flex,
  Card,
} from "@chakra-ui/react";
import newAddedAssignment from "../data/newAddedAssignment";

const Assignment = () => {
  const theme = useTheme();

  return (
    <Box
      w="300px"
      h="313px"
      mt="24px"
      backgroundColor="#F1F5F8"
      borderRadius="26px"
    >
      <HStack spacing="10px">
        <Box
          width="12px"
          height="25px"
          borderRadius="20px"
          bg="#3C8DBC"
          mt="27px"
          ml="33px"
        ></Box>
        <Text fontSize="20px" lineHeight="26.6px" mt="26px">
          Assignment
        </Text>
        <Button
          variant={"ghost"}
          fontSize={"13px"}
          mt={5}
          ml={12}
          fontWeight={400}
        >
          See All
        </Button>
      </HStack>

      <Flex mt={5}>
        {newAddedAssignment.map((homepageAssignment) => (
          <Card
            borderRadius="18px"
            bg="#F1F5F8"
            ml="26px"
            mr="20px"
            key={homepageAssignment.id}
          >
            <Text
              fontSize="16px"
              fontWeight="400"
              color="#2C3329"
              ml="13px"
              mt="13px"
            >
              {homepageAssignment.title}
            </Text>
            <Text fontSize="12px" fontWeight="400" color="gray" ml="13px">
              {homepageAssignment.instructorName}
            </Text>

            <Text
              fontSize="12px"
              fontWeight="400"
              color="#2C3329"
              mt="14px"
              ml="14px"
            >
              Description
            </Text>
            <Text
              fontSize="11px"
              lineHeight="21px"
              fontWeight="400"
              ml="13px"
              mt="6px"
              color="rgba(44, 51, 41, 0.47)"
            >
              {homepageAssignment.description}
            </Text>

            <Button
              variant="ghost"
              color="#3C8DBC"
              fontWeight="600"
              size="sm"
              lineHeight="1.5"
              p={6}
            >
              View Details
            </Button>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default Assignment;

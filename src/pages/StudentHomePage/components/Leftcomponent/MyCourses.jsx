import React from "react";
import {
  Box,
  Button,
  Card,
  HStack,
  Flex,
  useTheme,
  Text,
  Stack,
} from "@chakra-ui/react";
import myCourses from "../../data/myCourses"; // Import the mock course data

const MyCourses = () => {
  const theme = useTheme();
  const { primaryBlue, mainTextColor, secondaryTextColor } =
    theme.colors.pallete;
  return (
    <Box
      width={946.7009}
      borderRadius={26}
      bg={"#F1F5F8"}
      height={313}
      ml="52px"
      mt="52px"
    >
      <Flex
        width={926.69}
        height={51}
        borderRadius={27}
        justify={"space-between"}
        p={"13,32,13,13"}
        gap={"24px"}
      >
        <HStack gap={"10px"}>
          <Box
            bg={primaryBlue}
            width="12px"
            height="25px"
            borderRadius={"20px"}
            ml={"33px"}
            mt={"1px"}
          ></Box>
          <Text fontWeight={400} fontSize={"20px"} lineHeight={"24.2px"}>
            My Courses
          </Text>
        </HStack>
      </Flex>

      <Flex mt={3} gap="24px" textAlign={"left"} ml={26}>
        {myCourses.map((course) => (
          <Card
            key={course.id}
            width={317}
            height={204}
            borderRadius={18}
            blendMode={"multiply"}
            bg={"#F1F5F8"}
          >
            <Text fontSize={16} fontWeight={400} ml={13} mt={16.1}>
              {course.title}
            </Text>
            <Text
              fontWeight={400}
              fontSize={12}
              ml={13}
              color={"rgba(44, 51, 41, 0.47)"}
            >
              {course.instructorName}
            </Text>
            <Text
              fontSize={12}
              ml={13}
              fontWeight={400}
              color={mainTextColor}
              mt={18}
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
              {course.description}
            </Text>
            <Button
              variant={"ghost"}
              color={"#3C8DBC"}
              fontWeight={"600px"}
              size={"14px"}
              lineHeight={"16.94px"}
              mt={18}
            >
              View Details
            </Button>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default MyCourses;

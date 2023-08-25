import React from "react";
import {
  Box,
  Button,
  Text,
  HStack,
  useTheme,
} from "@chakra-ui/react";

const Assignment = () => {
  const theme = useTheme();
  const { primaryBlue, mainTextColor } =
    theme.colors.pallete;
  return (
    <>
      <Box
        width={"361.27px"}
        height={"313px"}
        backgroundColor={"#F1F5F8"}
        borderRadius={"26px"}
        mt={"24px"}
        ml={"24px"}
      >
        <HStack ml={"20px"} mt={"14px"}>
          <Box
            bg={primaryBlue}
            width="12px"
            height="25px"
            borderRadius={"20px"}
            ml={"13px"}
          ></Box>
          <Text color={mainTextColor}>Assignments</Text>
          <Button
            ml={28}
            variant={"ghost"}
            fontSize={"14px"}
            fontWeight={"400px"}
          >
            See All
          </Button>
        </HStack>

        <Box
          width={"313px"}
          height={"204px"}
          backgroundColor={"#F1F5F8"}
          borderRadius={"18px"}
          blendMode={"multiply"}
          mt={"37px"}
          ml={"20px"}
        >
          <Text
            fontSize={"16px"}
            lineHeight={"19.36px"}
            color={mainTextColor}
            ml={"13px"}
          >
            ABCD
          </Text>
          <Text
            fontWeight={"400px"}
            fontSize={"12px"}
            color={"#2C332978"}
            lineHeight={"14.52px"}
            ml={"13px"}
            mt={"3px"}
          >
            John Doe
          </Text>
          <Text
            mt={"18px"}
            ml={"13px"}
            fontSize={"12px"}
            lineHeight={"14.52px"}
            fontWeight={"400px"}
          >
            {" "}
            Description
          </Text>
          <Text
            ml={"13px"}
            fontWeight={"400px"}
            color={"#2C332978"}
            fontSize={"12px"}
            mt={"6px"}
          >
            Here will be description displayed.Here will be description
            displayedHere will be description displayed
          </Text>
          <Button
            mt={"28px"}
            ml={"116px"}
            marginBottom={"16px"}
            variant={"ghost"}
            color={"#3C8DBC"}
            fontSize={"14px"}
            lineHeight={"16.94px"}
            fontWeight={"600px"}
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

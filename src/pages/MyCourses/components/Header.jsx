import React from "react";
import { Box, HStack, Text, Card, Flex, Button } from "@chakra-ui/react";
import headerData from "../data/headerData";
const Header = () => {
  return (
    <Box w={"full"} bg={"#F1F5F8"} borderRadius={"2xl"}>
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"27px"}
          ml={"27px"}
        ></Box>
        <Text
          fontSize={"20px"}
          lineHeight={"24px"}
          fontFamily={400}
          mt={"26px"}
        >
          My Courses
        </Text>
      </HStack>

      <Flex mt={"34px"}>
        {headerData.map((headerDetails) => (
          <Card
            borderRadius={"18px"}
            bg={"#F1F5F8"}
            ml={"20px"}
            mb={"20px"}
            mr={"20px"}
            blendMode={"multiply"}
            key={headerDetails.id}
          >
            <Text
              fontSize={"16px"}
              fontWeight={"400"}
              lineHeight={"18px"}
              color={"#2C3329"}
              ml={"13px"}
              mt={"13px"}
            >
              {headerDetails.subject}
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
            >
              {headerDetails.description}
            </Text>

            <Button
              variant={"ghost"}
              color={"#3C8DBC"}
              fontWeight={"600"}
              size={"12px"}
              fontSize={"14px"}
              lineHeight={"16px"}
              p={5}
            >
              View Details
            </Button>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};
export default Header;

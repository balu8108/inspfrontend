import React from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Spacer,
  Text,
  useTheme,
} from "@chakra-ui/react";
import soloClassData from "../data/solo.class.data";
const SoloClass = () => {
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  return (
    <Box
      width={"100%"}
      height={"full"}
      borderRadius={"26px"}
      bg={outerBackground}
    >
      <Flex mt={"19px"}>
        <HStack spacing={"10px"} alignItems="center" ml={"33px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"}>
            My Courses (Inpho / Olympiads)
          </Text>
        </HStack>
        <Spacer />
      </Flex>
      <Flex flexWrap={"wrap"} p={6} gap={"24px"}>
        {soloClassData.map((item) => (
          <Card
            key={item.id}
            w={"31%"}
            h={"204px"}
            bg={innerBackground}
            boxShadow={innerBoxShadow}
            borderRadius={"18px"}
          >
            <Text
              fontSize={"16px"}
              fontWeight={400}
              ml={"13px"}
              mt={"16px"}
              lineHeight={"19px"}
              noOfLines={1}
            >
              {item.lectureNo}
            </Text>
            <Text
              fontSize={"12px"}
              fontWeight={400}
              ml={"13px"}
              color="#2C332978"
              lineHeight={"14px"}
              noOfLines={1}
            >
              {item.topicName}
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
              ml={"13px"}
              fontWeight={400}
              color="#2C332978"
              noOfLines={3}
            >
              {item.description}
            </Text>

            <Button
              variant={"ghost"}
              color={"#3C8DBC"}
              fontSize={"14px"}
              fontWeight={600}
              _hover={{ bg: "white" }}
              mt={"auto"}
            >
              View Details
            </Button>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default SoloClass;

import React from "react";
import { Link } from "react-router-dom";
import { Box, Text, HStack, Card, Flex, Button, Stack } from "@chakra-ui/react";
import physDetailsData from "../data/physicsDetails";

const PhysDetails = () => {
  return (
    <Box width={"100%"}  bg={"#F1F5F8"} borderRadius={"26px"}>
      <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"} fontWeight={400}>
          My Courses (Physics)
        </Text>
      </HStack>

      <Stack>
        <Flex flexWrap="wrap" mt={"37px"} ml={"29px"} mr={"20px"} gap={"23px"}>
          {physDetailsData.map((physScreen) => (
            <Card
              key={physScreen.id}
              w="30%"
              blendMode={"multiply"}
              bg={"#F1F5F8"}
              borderRadius={"18px"}
            >
              <Text
                fontSize={"16px"}
                fontWeight={400}
                ml={"13px"}
                mt={"16px"}
                lineHeight={"19px"}
              >
                {physScreen.chapterName}
              </Text>
              <Text
                fontWeight={400}
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
                fontSize={"12px"}
                lineHeight={"21px"}
                fontWeight={400}
                ml={13}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                {physScreen.description}
              </Text>
              <Link to={`/student/chapter`} style={{display:"flex", justifyContent:"center"}} >
              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600"}
                size={"14px"}
                lineHeight={"16px"}
                p={6}
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

export default PhysDetails;

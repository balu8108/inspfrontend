//This is the component latest two solo -lecture will come.
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Text,
  useTheme,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import { capitalize } from "../../../../utils";
import { getLatestSoloClassApi } from "../../../../api/soloclassrooms";
const SoloClasses = () => {
  const [latestSoloClassroom, setLatestSoloClassroom] = useState([]);
  const navigate = useNavigate();
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  const handleSeeAllClick = () => {
    navigate("/mentor/solo-recordings/topic/36/ALTERNATING%20CURRENT");
  };

  const getSoloLatestClassroom = async () => {
    try {
      const response = await getLatestSoloClassApi();

      if (response.status === 200) {
        setLatestSoloClassroom(response.data.data);
      }
    } catch (err) {
      console.log("Error in solo latest classroom", err);
    }
  };
  useEffect(() => {
    getSoloLatestClassroom();
  }, []);
  return (
    <Box
      bg={outerBackground}
      mt={"23px"}
      borderRadius={"25px"}
      w={"95%"}
      h={"full"}
    >
      <Flex justifyContent={"space-between"}>
        <HStack spacing={"10px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
            mt={"16px"}
            ml={"27px"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"} mt={"16px"}>
            Solo Classes
          </Text>
        </HStack>
        <Button
          variant={"ghost"}
          fontSize={"sm"}
          fontWeight={400}
          mt={"15px"}
          p={6}
          _hover={{ bg: "none" }}
          onClick={handleSeeAllClick}
        >
          See All
        </Button>
      </Flex>
      <Flex mt={"34px"} flexWrap="wrap">
        {latestSoloClassroom.map((soloclassInfo) => (
          <Box flexBasis="50%" key={soloclassInfo.id}>
            <Card
              h={"175px"}
              w={"50"}
              borderRadius={"18px"}
              bg={innerBackground}
              boxShadow={innerBoxShadow}
              ml={"20px"}
              mb={"20px"}
              mr={"20px"}
            >
              <Text
                fontSize={"16px"}
                fontWeight={"400"}
                lineHeight={"18px"}
                color={"#2C3329"}
                ml={"13px"}
                mt={"13px"}
                noOfLines={1}
              >
                {capitalize(soloclassInfo.topic)}
              </Text>
              <Text
                fontSize={"11px"}
                lineHeight={"18px"}
                color={"#2C332978"}
                ml={"13px"}
              >
                {soloclassInfo.mentorName}
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
                noOfLines={2}
              >
                {soloclassInfo.description}
              </Text>
              <Link
                to={`/mentor/solo-recordings/topic/${soloclassInfo.topicId}/${soloclassInfo.topic}`}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Button
                  variant={"ghost"}
                  color={"#3C8DBC"}
                  fontWeight={"600"}
                  fontSize={"14px"}
                  lineHeight={"16px"}
                  _hover={{ bg: "white" }}
                >
                  View Details
                </Button>
              </Link>
            </Card>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
export default SoloClasses;

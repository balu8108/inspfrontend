import React from "react";
import { Text, Card, Button, useTheme } from "@chakra-ui/react";

const SoloCard = ({ lecture, handleViewDetails }) => {
  const { innerBackground, innerBoxShadow } = useTheme().colors.pallete;
  return (
    <Card
      minW={"30%"}
      key={lecture.id}
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
        Lecture {lecture.lectureNo}
      </Text>
      <Text
        fontSize={"12px"}
        fontWeight={400}
        ml={"13px"}
        color="#2C332978"
        lineHeight={"14px"}
        noOfLines={1}
      >
        {lecture.topic}
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
        {lecture.description}
      </Text>

      <Button
        variant={"ghost"}
        color={"#3C8DBC"}
        fontSize={"14px"}
        fontWeight={600}
        _hover={{ bg: "white" }}
        mt={"auto"}
        onClick={() => {
          handleViewDetails(lecture.id, lecture.topic);
        }}
      >
        View Details
      </Button>
    </Card>
  );
};

export default SoloCard;

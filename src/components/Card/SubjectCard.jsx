//This component will show all the chapters related to subjects.
import React from "react";
import { useNavigate } from "react-router-dom";
import { Text, Card, Button, useTheme } from "@chakra-ui/react";
import { capitalize } from "../../utils";

const dummyDescriptions = [
  "This chapter covers the basics of electromagnetism, including its principles and applications. Gain insights into the behavior of electric and magnetic fields.",
  "Learn about geometrical and wave optics in this chapter. Explore the fascinating world of light propagation and wave phenomena.",
  "Explore the fundamental principles of heat transfer and thermodynamics. Dive into the study of energy transfer and the laws governing thermal processes.",
  "Get a deep understanding of mechanics in this chapter. Study the motion, forces, and interactions of objects in the physical world.",
  "Discover modern physics in this comprehensive chapter. Uncover the latest advancements and theories shaping our understanding of the physical universe.",
];

const SubjectCard = ({ width, chapter, index, handleViewDetails }) => {
  const { innerBackground, innerBoxShadow } = useTheme().colors.pallete;

  return (
    <Card
      bg={innerBackground}
      boxShadow={innerBoxShadow}
      key={chapter?.id}
      w={width}
      h={"204px"}
      borderRadius={"18px"}
      flexDirection={"column"}
      flexShrink={"0"}
      display="flex"
    >
      <Text
        fontSize={"16px"}
        fontWeight={400}
        ml={"13px"}
        mt={"16px"}
        lineHeight={"19px"}
        noOfLines={1}
      >
        {capitalize(chapter?.name)}
      </Text>
      <Text
        fontWeight={400}
        fontSize={"12px"}
        lineHeight={"15px"}
        ml={"13px"}
        color={"rgba(44, 51, 41, 0.47)"}
      >
        Nitin Sachan
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
        noOfLines={3}
        mt={"6px"}
      >
        {dummyDescriptions[index]}
      </Text>

      <Button
        fontWeight={600}
        variant={"ghost"}
        color={"#3C8DBC"}
        fontSize={"14px"}
        lineHeight={"16px"}
        mt={"auto"}
        _hover={{ bg: "white" }}
        onClick={() => handleViewDetails(chapter)}
      >
        View Details
      </Button>
    </Card>
  );
};

export default SubjectCard;

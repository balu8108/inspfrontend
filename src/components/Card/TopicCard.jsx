import React from "react";
import { Text, Card, Button, useTheme } from "@chakra-ui/react";
import { capitalize } from "../../utils";
import topicDescriptionConstants from "../../constants/topicDescriptionConstants";

const TopicCard = ({ topic, handleView, width }) => {
  const { innerBackground, innerBoxShadow } = useTheme().colors.pallete;
  return (
    <Card
      key={topic?.id}
      w={width}
      bg={innerBackground}
      boxShadow={innerBoxShadow}
      borderRadius={"18px"}
      flexShrink={"0"}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Text
        fontSize={"15px"}
        ml={"13px"}
        mt={"16px"}
        lineHeight={"19px"}
        noOfLines={1}
      >
        {capitalize(topic?.name)}
      </Text>
      <Text
        fontWeight={400}
        fontSize={"11px"}
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
        fontSize={"11px"}
        lineHeight={"21px"}
        fontWeight={400}
        ml={13}
        noOfLines={"3"}
        color={"rgba(44, 51, 41, 0.47)"}
      >
        {topicDescriptionConstants[topic?.id]}
      </Text>

      <Button
        variant={"ghost"}
        color={"#3C8DBC"}
        fontWeight={"600"}
        size={"14px"}
        lineHeight={"16px"}
        m={"20px"}
        _hover={{ bg: "white" }}
        onClick={() => handleView(topic)}
      >
        View Details
      </Button>
    </Card>
  );
};

export default TopicCard;

import React from "react";
import {
  Box,
  Text,
  Card,
  Flex,
  Button,
  Spacer,
  useTheme,
} from "@chakra-ui/react";
import { className } from "../../constants/className";
import moment from "moment";

const LectureCard = ({id, classRoomDetail, scheduledDate, classLevel, route }) => {
    const { innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;
  return (
    <Card
        bg={innerBackground}
        boxShadow={innerBoxShadow}
        key={id}
        w="30%"
        h={"204px"}
        borderRadius={"18px"}
    >
        <Flex>
        <Text
            fontSize={"16px"}
            fontWeight={400}
            ml={"13px"}
            mt={"16px"}
            lineHeight={"19px"}
            noOfLines={1}
        >
            Lecture {classRoomDetail?.lectureNo}
        </Text>
        <Spacer />
        <Text
            fontSize={"12px"}
            fontWeight={400}
            mr={"13px"}
            mt={"16px"}
            lineHeight={"19px"}
            noOfLines={1}
            color={"rgba(44, 51, 41, 0.47)"}
        >
            {moment(scheduledDate).format("L")}
        </Text>
        </Flex>
        <Text
        fontWeight={400}
        fontSize={"12px"}
        lineHeight={"15px"}
        ml={"13px"}
        mt={"3px"}
        color={"rgba(44, 51, 41, 0.47)"}
        noOfLines={1}
        >
        {classRoomDetail?.topicName}
        </Text>

        <Text
        fontWeight={400}
        fontSize={"12px"}
        lineHeight={"15px"}
        ml={"13px"}
        mt={"3px"}
        color={"rgba(44, 51, 41, 0.47)"}
        noOfLines={1}
        >
        {className[classLevel]}
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
        noOfLines={2}
        >
        {classRoomDetail?.description}
        </Text>
        <Button
            variant={"ghost"}
            color={"#3C8DBC"}
            fontWeight={"600"}
            size={"14px"}
            lineHeight={"16px"}
            m={"auto"}
            _hover={{ bg: "white" }}
            onClick={() => route(id)}
        >
        View Details
        </Button>
    </Card>           
  );
};

export default LectureCard;

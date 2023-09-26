import React, { useState } from "react";
import {
  Box,
  Card,
  Text,
  HStack,
  Spacer,
  Button,
  Flex,
} from "@chakra-ui/react";
import topicData from "../data/topicData";
import SoloRecordModal from "../../SoloRecordModal/components/SoloRecordModal";
const TopicsBased = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Box bg={"#F1F5F8"} borderRadius={"26px"} w={"100%"} h={"300px"}>
      <Flex p={5}>
        <HStack spacing={"10px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"}>
            Solo Recordings
          </Text>
        </HStack>
        <Spacer />
        <Box>
          <Button
            fontWeight={400}
            bg={"#3C8DBC"}
            color={"#FFFFFF"}
            fontSize={"14px"}
            variant={"ghost"}
            onClick={openModal}
          >
            Solo record
          </Button>
        </Box>
      </Flex>
      <Flex overflowX={"auto"}>
        {topicData.map((topic) => (
          <Card
            key={topic.id}
            h={"204px"}
            minW={"25%"}
            bg={"#F1F5F8"}
            blendMode={"multiply"}
            mx={4}
            borderRadius={"26px"}
          >
            <Text fontSize={"15px"} ml={"13px"} mt={"16px"} lineHeight={"19px"}>
              {topic.topicName}
            </Text>
            <Text
              fontWeight={400}
              fontSize={"11px"}
              lineHeight={"15px"}
              ml={"13px"}
              color={"rgba(44, 51, 41, 0.47)"}
            >
              {topic.instructorName}
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
              noOfLines={"2"}
              color={"rgba(44, 51, 41, 0.47)"}
            >
              {topic.description}
            </Text>

            <Button
              variant={"ghost"}
              color={"#3C8DBC"}
              fontWeight={"600"}
              size={"14px"}
              lineHeight={"16px"}
              mt={"40px"}
            >
              View Details
            </Button>
          </Card>
        ))}
      </Flex>
      {isModalOpen && <SoloRecordModal isOpen={isModalOpen} onClose={closeModal} />}
    </Box>
  );
};
export default TopicsBased;

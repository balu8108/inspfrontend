import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Text,
  HStack,
  Spacer,
  Button,
  Flex,
  Spinner, // Import Spinner component
} from "@chakra-ui/react";
import SoloRecordModal from "../../SoloRecordModal/components/SoloRecordModal";
import { fetchAllTopicsWithoutChapterIdApi } from "../../../../../api/inspexternalapis";

const TopicsBased = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingTopics, setIsLoadingTopics] = useState(true);
  const [topics, setTopics] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const dummyDescription = "This topic doesn't have a description yet.";
  useEffect(() => {
    async function fetchAllTopicsWithoutChapterId() {
      try {
        const response = await fetchAllTopicsWithoutChapterIdApi();
        console.log("Topics Api Without the Chapter Id", response);
        if (response.status) {
          setTopics(response.result);
        }
      } catch (error) {
        console.error("Error fetching topics data:", error);
      } finally {
        setIsLoadingTopics(false);
      }
    }

    fetchAllTopicsWithoutChapterId();
  }, []);

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

      {/* Conditionally render a spinner while loading */}
      {isLoadingTopics ? (
        <Flex justifyContent="center" alignItems="center" height="200px">
          <Spinner size="lg" color="blue.500" />
        </Flex>
      ) : (
        // Render topics when loading is complete
        <Flex overflowX={"auto"}>
          {topics.map((topic) => (
            <Card
              key={topic.id}
              h={"204px"}
              minW={"28%"}
              bg={"#F1F5F8"}
              blendMode={"multiply"}
              mx={6}
              borderRadius={"26px"}
            >
              <Text fontSize={"15px"} ml={"13px"} mt={"16px"} lineHeight={"19px"} noOfLines={1}>
                {topic.name}
              </Text>
              <Text
                fontWeight={400}
                fontSize={"11px"}
                lineHeight={"15px"}
                ml={"13px"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                {topic.instructorName} No Data 
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
                {topic.description  ||  dummyDescription}
              </Text>

              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600"}
                size={"14px"}
                lineHeight={"16px"}
                mt={"60px"}
              >
                View Details
              </Button>
            </Card>
          ))}
        </Flex>
      )}
      {isModalOpen && (
        <SoloRecordModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </Box>
  );
};

export default TopicsBased;

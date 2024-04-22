//In this componnet all the topics will come with solo record button.
import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Button,
  Flex,
  Spinner,
  useTheme,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SoloRecordModal from "../../SoloRecordModal/components/SoloRecordModal";
import { fetchAllTopicsWithoutChapterIdApi } from "../../../../../api/inspexternalapis";
import "../../../../../constants/scrollbar/style.css";
import TopicCard from "../../../../../components/Card/TopicCard";

const TopicsBased = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingTopics, setIsLoadingTopics] = useState(true);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const { primaryBlueLight, outerBackground } = useTheme().colors.pallete;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchAllTopicsWithoutChapterId() {
      try {
        const response = await fetchAllTopicsWithoutChapterIdApi();

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

  const handleTopicNavigation = (topic) => {
    navigate(`/mentor/solo-recordings/topic/${topic.id}/${topic.name}`);
  };

  return (
    <Box borderRadius={"26px"} p={"30px"} bg={outerBackground}>
      <Flex mb={"20px"} justifyContent={"space-between"}>
        <HStack spacing={"10px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"}>
            Solo Recording
          </Text>
        </HStack>
        <Box>
          <Button
            fontWeight={400}
            bg={"#3C8DBC"}
            color={"#FFFFFF"}
            fontSize={"14px"}
            variant={"ghost"}
            onClick={openModal}
            _hover={{ bg: primaryBlueLight }}
          >
            Solo record
          </Button>
        </Box>
      </Flex>
      {isLoadingTopics ? (
        <Flex justifyContent="center" alignItems="center" height="200px">
          <Spinner size="lg" color="blue.500" />
        </Flex>
      ) : (
        <Flex overflowX={"auto"} className="example" gap={"24px"}>
          {topics.map((topic) => (
            <TopicCard
              width={"30%"}
              topic={topic}
              handleView={handleTopicNavigation}
            />
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

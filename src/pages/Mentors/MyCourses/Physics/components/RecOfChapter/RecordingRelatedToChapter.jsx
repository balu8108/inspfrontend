// here in this screen we will have all the topics  related to that particular chapter
import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Text,
  Card,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import viewChapterRecordings from "../../data/recording";
import { fetchAllTopicsApi } from "../../../../../../api/inspexternalapis/index";
import { useParams } from "react-router-dom";

const ViewAllRecordingsRelatedToOneChapter = () => {
  const { chapter_id, chapter_name } = useParams(); // Retrieve chapter_id from the URL
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetchAllTopicsApi(chapter_id); // Fetch topics for the specified chapter_id
        console.log("Topics Api", response);
        if (response.status) {
          setTopics(response.result);
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    }

    fetchTopics();
  }, [chapter_id]);

  return (
    <Box
      w={"100%"}
      // maxW={"870px"}
      bg={"#F1F5F8"}
      borderRadius={"2xl"}
      mt={6}
      overflowX="auto"
    >
      <HStack spacing={"10px"} ml="27px">
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"27px"}
        ></Box>
        <Text
          fontSize={"20px"}
          lineHeight={"24px"}
          fontFamily={400}
          mt={"26px"}
        >
          {/* Newton's First Law Of Recordings */}
          {chapter_name}
        </Text>
      </HStack>
      <Flex m="27px">
        {topics.map((topic) => (
          <Card
            key={topic.id}
            h={"204px"}
            minW={"35%"}
            p={3}
            bg={"#F1F5F8"}
            blendMode={"multiply"}
           
            mx={4}
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
              noOfLines={"2"}
              color={"rgba(44, 51, 41, 0.47)"}
            >
            No Data
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
        <Spacer />
      </Flex>

      {viewChapterRecordings.length === 0 && (
        <Text textAlign="center" mt={4}>
          No recordings available for this chapter.
        </Text>
      )}
    </Box>
  );
};

export default ViewAllRecordingsRelatedToOneChapter;
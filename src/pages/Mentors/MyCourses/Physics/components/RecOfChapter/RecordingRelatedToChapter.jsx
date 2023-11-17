// // here in this screen we will have all the topics  related to that particular chapter
import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Text,
  Card,
  Center,
  Button,
  Flex,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { fetchAllTopicsApi } from "../../../../../../api/inspexternalapis/index";
import { useParams } from "react-router-dom";
import "../../../../../../constants/scrollbar/style.css";
import topicDescriptionConstants from "../../../../../../constants/topicDescriptionConstants";
import { boxShadowStyles, capitalize } from "../../../../../../utils";
const ViewAllRecordingsRelatedToOneChapter = ({
  setViewTopic,
  setTopicName,
}) => {
  const { chapter_id, chapter_name } = useParams();
  const [topics, setTopics] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetchAllTopicsApi(chapter_id);

        if (response.status) {
          setTopics(response.result);
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, [chapter_id]);

  return (
    <Box
      w={"100%"}
      h={"100%"}
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      borderRadius={"2xl"}
      mt={6}
      bg="white"
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
          {capitalize(chapter_name)}
        </Text>
      </HStack>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : topics.length === 0 ? (
        <Text textAlign="center" mt={4}>
          No topics for this chapter.
        </Text>
      ) : (
        <Flex  ml={"20px"} my={"20px"} gap={"24px"} p={1}  overflowX="auto" className="example">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              h={"204px"}
              minW={"30%"}
              bg={"#F1F5F8"}
              blendMode={"multiply"}
              borderRadius={"26px"}
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
                {topicDescriptionConstants[topic.id]}
              </Text>

              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600"}
                size={"14px"}
                lineHeight={"16px"}
                m={"20px"}
                onClick={() => {
                  setViewTopic(topic.id);
                  setTopicName(topic.name);
                }}
              >
                View Details
              </Button>
            </Card>
          ))}
          <Spacer />
        </Flex>
      )}
    </Box>
  );
};

export default ViewAllRecordingsRelatedToOneChapter;

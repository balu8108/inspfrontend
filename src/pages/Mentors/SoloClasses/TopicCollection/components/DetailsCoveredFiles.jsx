//In this component where all the description , agenda,files,recordings will come for that topic.
import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Text,
  Flex,
  Image,
  useTheme,
  UnorderedList,
  ListItem,
  IconButton,
} from "@chakra-ui/react";
import defaultImageUrl from "../../../../../assets/images/image1.png";
import { BsPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { capitalize } from "../../../../../utils";
import detailsCoveredData from "../data/detailsCoveredData";
import topicDescriptionConstants from "../../../../../constants/topicDescriptionConstants";
import { getTopicDetailsForSoloClassApi } from "../../../../../api/soloclassrooms";
import SingleFileComponent from "../../../../../components/filebox/SingleFileComponent";
const DetailsCoveredFiles = () => {
  const [topicDetails, setTopicDetails] = useState(null);
  const { topicId, topic_name } = useParams();
  const topicDescription = topicDescriptionConstants[topicId];
  const { outerBackground } = useTheme().colors.pallete;
  const navigate = useNavigate();

  useEffect(() => {
    setTopicDetails(null);
    const fetchTopicDetails = async (topicId) => {
      setTopicDetails(null);
      try {
        const response = await getTopicDetailsForSoloClassApi(topicId);
        if (response.status === 200) {
          const topicDetailsData = response.data;
          setTopicDetails(topicDetailsData);
        }
      } catch (error) {
        console.error("Error fetching topic details:", error);
      }
    };

    fetchTopicDetails(topicId);
  }, [topicId]);

  const handleViewRecording = (recording, topicInfo) => {
    navigate(`/view-recording?type=solo&id=${recording.id}`);
  };

  return (
    <Box p={8} borderRadius={"26px"} w={"100%"} bg={outerBackground}>
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        />
        <Text fontSize={"19px"} lineHeight={"24px"}>
          {capitalize(topic_name)}
        </Text>
      </HStack>

      <Flex gap={4} mt={10}>
        <Box flex={1} w={"50%"}>
          <Text>Description</Text>
          <Text mt={4} fontSize="12px" lineHeight={"21px"} color={"#2C332978"}>
            {topicDescription || "No description available for this topic."}
          </Text>
        </Box>
        <Box flex={1}>
          <Text fontSize="md">Agenda</Text>
          <UnorderedList fontSize={"12px"} color={"#2C332978"} pt={2}>
            {detailsCoveredData[0].agenda.map((topic, index) => (
              <ListItem key={index} my={2}>
                {topic}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Flex>

      <Box mt={8}>
        <Text>Recording</Text>
        <Flex gap={"24px"} overflowX="auto">
          {topicDetails && topicDetails.length > 0 ? (
            <Flex gap={4} mt={4}>
              {topicDetails.map((topic) =>
                topic?.SoloClassRoomRecordings.map((recording, index) => (
                  <Flex
                    alignItems="center"
                    w={"160px"}
                    key={recording?.id}
                    onClick={() => handleViewRecording(recording, topic)}
                    position={"relative"}
                    cursor={"pointer"}
                  >
                    <Image
                      src={defaultImageUrl}
                      alt="Video Thumbnail"
                      width={"100%"}
                      height={"100%"}
                    />
                    <IconButton
                      icon={<BsPlayFill />}
                      fontSize="24px"
                      position="absolute"
                      top="50%"
                      left="50%"
                      borderRadius={"100%"}
                      transform="translate(-50%, -50%)"
                    />
                  </Flex>
                ))
              )}
              {topicDetails?.every(
                (data) => data.SoloClassRoomRecordings.length === 0
              ) && (
                <Text fontSize="12px">
                  No recordings available for the topic.
                </Text>
              )}
            </Flex>
          ) : (
            <Text fontSize={"12px"} mt={4}>
              No recording are available for this topic.
            </Text>
          )}
        </Flex>
      </Box>

      <Box mt={8}>
        <Text>Files/Notes</Text>
        {topicDetails?.length > 0 ? (
          <Flex mt={4} flexWrap="wrap" gap={2}>
            {topicDetails?.map((ld) =>
              ld?.SoloClassRoomFiles?.map((file) => (
                <SingleFileComponent key={file?.id} file={file} type={"solo"} />
              ))
            )}

            {topicDetails?.every((ld) => !ld?.SoloClassRoomFiles?.length) && (
              <Text fontSize="12px">No Files for this topic</Text>
            )}
          </Flex>
        ) : (
          <Text fontSize="12px" mt={4}>
            No Data for this topic
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default DetailsCoveredFiles;

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

  const handleViewRecording = (recording) => {
    navigate(`/view-recording?type=solo&id=${recording.soloClassRoomId}&recordingId=${recording?.id}`);
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
          {topicDetails ? (
            <Flex gap={4} mt={4}>
              {topicDetails?.transformedData?.SoloClassRoomRecordings.map(
                (recording, index) => (
                  <Flex
                    alignItems="center"
                    w={"160px"}
                    key={recording?.id}
                    onClick={() => handleViewRecording(recording, topicId)}
                    position={"relative"}
                    cursor={"pointer"}
                  >
                    <Image
                      src={defaultImageUrl}
                      alt="Video Thumbnail"
                      width={"100%"}
                      height={"100%"}
                    />

                    <Text
                      fontWeight={"500"}
                      fontSize={"12px"}
                      color={"white"}
                      position="absolute"
                      bottom="8px"
                      left="8px"
                      padding="4px 8px"
                      zIndex={3}
                    >
                      Solo Recording-{index + 1}
                    </Text>
                    <Image
                      src={defaultImageUrl}
                      alt="Video Thumbnail"
                      width={"100%"}
                      height={"100%"}
                      style={{
                        position: "relative",
                        zIndex: 1,
                        overflow: "hidden",
                        borderRadius: "8px",
                      }}
                    />
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      width="100%"
                      height="100%"
                      background="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 110%)"
                      zIndex={2}
                      pointerEvents="none"
                      borderRadius="8px"
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
                )
              )}

              {topicDetails?.transformedData?.SoloClassRoomRecordings.length ===
                0 && (
                <Text fontSize="12px">
                  No recordings are available for this topic.
                </Text>
              )}
            </Flex>
          ) : (
            <Text fontSize={"12px"} mt={4}>
              No data available for this topic.
            </Text>
          )}
        </Flex>
      </Box>

      <Box mt={8}>
        <Text>Files/Notes</Text>
        {topicDetails ? (
          <Flex mt={4} flexWrap="wrap" gap={2}>
            {topicDetails?.transformedData?.SoloClassRoomFiles.map((file) => (
              <SingleFileComponent key={file?.id} file={file} type={"solo"} />
            ))}

            {topicDetails?.transformedData?.SoloClassRoomFiles.length === 0 && (
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

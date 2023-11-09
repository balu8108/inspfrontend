import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Text,
  Stack,
  Flex,
  Button,
  Spacer,
  Image,
  Icon,
  Card,
} from "@chakra-ui/react";
import defaultImageUrl from "../../../../../assets/images/image1.png";
import { BsDownload } from "react-icons/bs";
import axios from "axios";
import { BsPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import { FaCircle } from "react-icons/fa";
import { getPresignedUrlApi } from "../../../../../api/genericapis";
import { BASE_URL } from "../../../../../constants/staticurls";
import { SimpleGrid } from "@chakra-ui/layout";
const DetailsCoveredFiles = ({ viewTopic, viewtopicName }) => {
  const [topicDetails, setTopicDetails] = useState(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const navigate = useNavigate();
  // Function to fetch topic details
  const fetchTopicDetails = async (topicId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/solo-lecture/get-topic-details/${topicId}`
      );

      const topicDetailsData = response.data;

      // Update the state with the received topic details
      setTopicDetails(topicDetailsData);
    } catch (error) {
      console.error("Error fetching topic details:", error);
    }
  };

  useEffect(() => {
    if (viewTopic !== null) {
      fetchTopicDetails(viewTopic);
    }
  }, [viewTopic]);

  const handleCardClick = async (videoUrl) => {
    try {
      const response = await getPresignedUrlApi({ s3_key: videoUrl });

      const presignedUrl = response.data.data.getUrl;

      // Open the video in a new tab or window using the generated URL

      navigate(`/view-recording?videoUrl=${presignedUrl}`);
    } catch (error) {
      console.error("Error generating pre-signed URL:", error);
      // Handle errors as needed
    }
  };

  return (
    <Box bg={"#F1F5F8"} borderRadius={"26px"} w={"100%"}>
      <HStack spacing={"10px"} p={6}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        />
        <Text fontSize={"19px"} lineHeight={"24px"}>
          Details( {viewtopicName} )
        </Text>
      </HStack>

      {topicDetails && topicDetails.length > 0 ? (
        topicDetails.map((topicInfo, index) => (
          <Box ml={"20px"} key={topicInfo.id}>
            <HStack>
              <Box flex={1}>
                {index === 0 && <Text p={"13px"}>Description</Text>}
                {topicInfo.description.split("\n").map((item, i) => (
                  <HStack key={i} spacing={"5px"}>
                    <Icon
                      as={FaCircle}
                      boxSize={2}
                      color="#C3C3C3"
                      blendMode={"multiply"}
                    />
                    <Text fontSize={"12px"} color={"#2C332978"}>
                      {item}
                    </Text>
                  </HStack>
                ))}
              </Box>
              <Spacer />
              <Box flex={1} ml={"24px"}>
                {index === 0 && <Text p={"13px"}>Agenda</Text>}
                {topicInfo.agenda.split("\n").map((item, i) => (
                  <HStack key={i} spacing={"5px"}>
                    <Icon
                      as={FaCircle}
                      boxSize={2}
                      color="#C3C3C3"
                      blendMode={"multiply"}
                    />
                    <Text
                      fontSize={"12px"}
                      color={"#2C332978"}
                      lineHeight={"21px"}
                    >
                      {item}
                    </Text>
                  </HStack>
                ))}
              </Box>
            </HStack>
          </Box>
        ))
      ) : (
        <Box p={4} mx={5}>
          <Text>No details available for this topic.</Text>
        </Box>
      )}

      <Box ml={"20px"} mt="20px">
        <Text p={"13px"}>Recordings</Text>
        <Flex gap={"24px"} overflowX={"auto"}>
          {topicDetails && topicDetails.length > 0 ? (
            topicDetails.map((topicInfo, index) => (
              <HStack key={index}>
                {topicInfo.SoloClassRoomRecordings.map(
                  (recording, recordingIndex) => (
                    <Card
                      key={recordingIndex}
                      borderRadius={6}
                      bg={"#F1F5F8"}
                      blendMode={"multiply"}
                      w={"150px"}
                      boxShadow="md"
                      position="relative"
                      m={"20px"}
                      onMouseEnter={() => setHoveredCardIndex(index)}
                      onMouseLeave={() => setHoveredCardIndex(null)}
                      onClick={() => handleCardClick(recording.key)}
                    >
                      <Flex alignItems="center">
                        <Image src={defaultImageUrl} alt="Video Thumbnail" />
                        <Icon
                          as={BsPlayFill}
                          color="#2C332978"
                          fontSize="24px"
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                          opacity={hoveredCardIndex === index ? 1 : 0}
                        />
                      </Flex>
                    </Card>
                  )
                )}
              </HStack>
            ))
          ) : (
            <Box p={4}>
              <Text>No video recordings are available for this topic.</Text>
            </Box>
          )}
        </Flex>
      </Box>

      <Box mt={"31px"} overflowX="auto">
        <Text ml={"20px"} p={"13px"}>
          Files/Notes
        </Text>
        <HStack ml={"20px"}>
          {topicDetails && topicDetails.length > 0 ? (
            topicDetails.map((topicInfo, index) => (
              <Box key={topicInfo.id}>
                {topicInfo.SoloClassRoomFiles.map((file, fileIndex) => (
                  <Box
                    key={fileIndex}
                    mr="10px"
                    borderRadius={6}
                    bg={"#F1F5F8"}
                    blendMode={"multiply"}
                    p={1}
                    border={1}
                    boxShadow={"md"}
                    mb={"25px"}
                  >
                    <Flex>
                      <Text fontSize={"12px"} mt={3} color={"#2C332978"}>
                        {file.key}
                      </Text>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          rightIcon={<BsDownload />}
                          variant={"ghost"}
                          color={"black"}
                          ml={2}
                        />
                      </a>
                    </Flex>
                  </Box>
                ))}
              </Box>
            ))
          ) : (
            <Box p={4}>
              <Text>No files/notes are available for this topic.</Text>
            </Box>
          )}
        </HStack>
      </Box>
    </Box>
  );
};

export default DetailsCoveredFiles;

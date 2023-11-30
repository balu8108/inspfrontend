import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Text,
  Flex,
  Button,
  Spacer,
  Image,
  Icon,
  Card,
  useTheme,
} from "@chakra-ui/react";
import defaultImageUrl from "../../../../../assets/images/image1.png";
import { BsDownload, BsPlayFill } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaCircle } from "react-icons/fa";
import { BASE_URL } from "../../../../../constants/staticurls";
import { useParams } from "react-router-dom";
import {
  boxShadowStyles,
  capitalize,
  extractFileNameFromS3URL,
} from "../../../../../utils";

import "../../../../../constants/scrollbar/style.css";
const DetailsCoveredFiles = () => {
  const [topicDetails, setTopicDetails] = useState(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const { topicId, topic_name } = useParams();
  const { outerBackground } = useTheme().colors.pallete;
  const navigate = useNavigate();
  // Function to fetch topic details

  useEffect(() => {
    const fetchTopicDetails = async () => {
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

    fetchTopicDetails();
  }, [topicId]);

  const handleViewRecording = (recording) => {
    navigate(`/view-recording?type=solo_specific&id=${recording.id}`);
  };

  return (
    <Box
      // boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      borderRadius={"26px"}
      w={"100%"}
      bg={outerBackground}
    >
      <HStack spacing={"10px"} p={6}>
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

      {topicDetails && topicDetails.length > 0 ? (
        topicDetails.map((topicInfo, index) => (
          <Box ml={"20px"} key={topicInfo.id}>
            <HStack>
              <Box flex={1}>
                {index === 0 && <Text p={"13px"}>Description</Text>}
                {topicInfo.description &&
                  topicInfo.description.split("\n").map((item, i) => (
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
                {topicInfo?.agenda?.split("\n").map((item, i) => (
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
        <Box p={4} mx={8} fontSize={"14px"}>
          <Text>No details available for this topic.</Text>
        </Box>
      )}

      <Box ml={"20px"} mt="20px" mr={"21px"}>
        <Text p={"13px"}>Recordings</Text>
        <Box ml={"13px"}>
          {topicDetails && topicDetails.length > 0 ? (
            topicDetails.map((topicInfo, index) => (
              <Flex gap={"24px"} key={index} overflowX={"auto"}>
                {topicInfo.SoloClassRoomRecordings &&
                topicInfo.SoloClassRoomRecordings.length > 0 ? (
                  topicInfo.SoloClassRoomRecordings.map(
                    (recording, recordingIndex) => (
                      <Card
                        key={recording.id}
                        borderRadius={6}
                        w={"150px"}
                        boxShadow="md"
                        position="relative"
                        onMouseEnter={() => setHoveredCardIndex(index)}
                        onMouseLeave={() => setHoveredCardIndex(null)}
                        onClick={() => handleViewRecording(recording)}
                        flexShrink={0}
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
                  )
                ) : (
                  <Box p={4} fontSize={"14px"}>
                    <Text>
                      No video recordings are available for this topic.
                    </Text>
                  </Box>
                )}
              </Flex>
            ))
          ) : (
            <Box p={4} fontSize={"14px"}>
              <Text>No details available for this topic.</Text>
            </Box>
          )}
        </Box>
      </Box>

      <Box mt={"31px"} display="flex" flexWrap="wrap">
        <Text ml={"20px"} p={"13px"}>
          Files/Notes
        </Text>

        <Box w={"100%"} ml={"13px"} display="flex" flexWrap="wrap">
          {topicDetails && topicDetails.length > 0 ? (
            topicDetails.map((topicInfo, index) => (
              <Box key={topicInfo.id} display="flex" flexWrap="wrap">
                {topicInfo.SoloClassRoomFiles.map((file, fileIndex) => (
                  <Box
                    key={fileIndex}
                    w={"170px"}
                    h={"49px"}
                    ml={"20px"}
                    borderRadius={6}
                    border={" 1px solid #9597927D "}
                    boxShadow={" 0px 1px 6px 0px #00000029 "}
                    mb={"25px"}
                  >
                    <Flex align="center" m={"5px"}>
                      <Text fontSize={"11px"} color={"#2C332978"}>
                        {extractFileNameFromS3URL(file.key)}
                      </Text>
                      <Spacer />
                      <Button
                        rightIcon={<BsDownload />}
                        variant={"ghost"}
                        color={"black"}
                        ml={2}
                      />
                    </Flex>
                  </Box>
                ))}
              </Box>
            ))
          ) : (
            <Box p={4} fontSize={"14px"} ml={5}>
              <Text>No files/notes are available for this topic.</Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsCoveredFiles;

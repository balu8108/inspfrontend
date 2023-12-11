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
  UnorderedList,
  ListItem,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import defaultImageUrl from "../../../../../assets/images/image1.png";
import { BsDownload, BsPlayFill } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../../../../constants/staticurls";
import { useParams } from "react-router-dom";
import { capitalize, extractFileNameFromS3URL } from "../../../../../utils";
import "../../../../../constants/scrollbar/style.css";
import detailsCoveredData from "../data/detailsCoveredData";
import topicDescriptionConstants from "../../../../../constants/topicDescriptionConstants";
import { getTopicDetailsForSoloClassApi } from "../../../../../api/soloclassrooms";
import "../../../../../constants/scrollbar/style.css"
const DetailsCoveredFiles = () => {
  const [topicDetails, setTopicDetails] = useState(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const { topicId, topic_name } = useParams();
  const topicDescription = topicDescriptionConstants[topicId];
  const { outerBackground } = useTheme().colors.pallete;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopicDetails = async (topicId) => {
      try {
        const response = await getTopicDetailsForSoloClassApi(topicId);
        // const response = await axios.get(
        //   `${BASE_URL}/solo-lecture/get-topic-details/${topicId}`
        // );
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
    navigate(`/view-recording?type=solo_specific&id=${recording.id}`);
  };

  return (
    <Box borderRadius={"26px"} w={"100%"} bg={outerBackground}>
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

      <Flex mt={"37px"}>
        <Box w={"50%"} ml={"20px"}>
          <Text>Description</Text>
          <Text
            fontSize="12px"
            lineHeight={"21px"}
            color={"#2C332978"}
            mt={"15px"}
          >
            {topicDescription || "No description available for this topic."}
          </Text>
        </Box>
        <Box flex={1} ml={"24px"}>
          <Text fontSize="md">Agenda</Text>
          <UnorderedList
            fontSize={"12px"}
            color={"#2C332978"}
            spacing={"10px"}
            mt={"16px"}
          >
            {detailsCoveredData[0].agenda.map((topic, index) => (
              <ListItem key={index}>{topic}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Flex>

      <Stack mt={"31px"}>
        <Text ml={"20px"} p={"13px"}>
          Recording
        </Text>
        <Box ml={"13px"} overflowX={"auto"} className="example">
          {topicDetails && topicDetails.length > 0 ? (
            <Flex>
              {topicDetails.map((topicInfo, index) => (
                <Flex key={index}>
                  {topicInfo.SoloClassRoomRecordings.map(
                    (recording, recordingIndex) => (
                      <Card
                        key={recording.id}
                        w={"160px"}
                        ml={"20px"}
                        onClick={() => handleViewRecording(recording)}
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
                </Flex>
              ))}
            </Flex>
          ) : (
            <Box p={4} fontSize={"14px"} ml={5}>
              <Text>No recording are available for this topic.</Text>
            </Box>
          )}
        </Box>
      </Stack>

      <Box mt={"31px"}>
        <Text ml={"20px"} p={"13px"}>
          Files/Notes
        </Text>
        

        <Flex ml={"13px"} className="example" overflowX={"auto"}>
          {topicDetails && topicDetails.length > 0 ? (
            topicDetails.map((topicInfo, index) => (
              <Flex key={topicInfo.id}   >
                {topicInfo.SoloClassRoomFiles.map((file, fileIndex) => (
                  <Box
                    key={fileIndex}
                    w={"160px"}
                    h={"49px"}
                    ml={"20px"}
                    borderRadius={6}
                    border={" 1px solid #9597927D "}
                    boxShadow={" 0px 1px 6px 0px #00000029 "}
                    mb={"25px"}
                  >
                    <Flex align="center" m={"5px"}>
                      <Tooltip
                        label={extractFileNameFromS3URL(file.key)}
                        placement="bottom"
                        hasArrow
                        arrowSize={8}
                        fontSize={"11px"}
                      >
                        <Text
                          fontSize={"12px"}
                          color={"#2C332978"}
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {extractFileNameFromS3URL(file.key)}
                        </Text>
                      </Tooltip>
                      <Spacer />
                      <Button
                        rightIcon={<BsDownload />}
                        variant={"ghost"}
                        color={"black"}
                        ml={2}
                        _hover={{ bg: "none" }}
                      />
                    </Flex>
                  </Box>
                ))}
              </Flex>
            ))
          ) : (
            <Box p={4} fontSize={"14px"} ml={5}>
              <Text>No files/notes are available for this topic.</Text>
            </Box>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default DetailsCoveredFiles;

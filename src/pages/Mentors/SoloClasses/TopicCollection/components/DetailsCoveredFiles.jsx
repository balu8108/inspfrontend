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
} from "@chakra-ui/react";
import defaultImageUrl from "../../../../../assets/images/image1.png";
import { BsDownload } from "react-icons/bs";
import axios from "axios";

const DetailsCoveredFiles = ({ viewTopic }) => {
  const [topicDetails, setTopicDetails] = useState(null);

  const apiUrl = "http://localhost:5000";

  // Function to fetch topic details
  const fetchTopicDetails = async (topicId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/solo-lecture/get-topic-details/${topicId}`
      );
      const topicDetailsData = response.data;

      // Update the state with the received topic details
      setTopicDetails(topicDetailsData);
    } catch (error) {
      console.error("Error fetching topic details:", error);
      // Handle errors as needed
    }
  };

  // Use the useEffect hook to fetch topic details when the viewTopic prop changes
  useEffect(() => {
    if (viewTopic !== null) {
      // Call the fetchTopicDetails function when viewTopic changes
      fetchTopicDetails(viewTopic);
    }
  }, [viewTopic]);

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
          Details
        </Text>
      </HStack>

      {topicDetails && topicDetails.length > 0 ? (
        // Render the sections if topicDetails is not undefined and contains data
        topicDetails.map((topicInfo, index) => (
          <Box ml={"20px"} key={topicInfo.id}>
            <HStack>
              <Box flex={1}>
                {index === 0 && <Text p={"13px"}>Description</Text>}
                {topicInfo.description.split("\n").map((item, i) => (
                  <HStack key={i} spacing={"5px"}>
                    <Box
                      width={"5px"}
                      height={"5px"}
                      borderRadius={"50%"}
                      bg={"#2C332978"}
                      ml={"10px"}
                    ></Box>
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
                    <Box
                      width={"5px"}
                      height={"5px"}
                      borderRadius={"50%"}
                      bg={"#2C332978"}
                      ml={"10px"}
                    ></Box>
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
        // Render a message or placeholder content when topicDetails is undefined or empty
        <Box p={4}>
          <Text>No details available for this topic.</Text>
        </Box>
      )}
      <Box mt={"31px"}>
        <Text ml={"20px"} p={"13px"}>
          Files/Notes
        </Text>
        <HStack ml={"20px"} overflowX={"auto"}>
          {topicDetails && topicDetails.length > 0 ? (
            topicDetails.map((topicInfo, index) => (
              <Box key={topicInfo.id} p={"10px"}>
                {topicInfo.soloClassRoomFiles.map((file, fileIndex) => (
                  <Box
                    key={fileIndex}
                    mr="10px"
                    borderRadius={6}
                    bg={"#F1F5F8"}
                    blendMode={"multiply"}
                    p={3}
                  >
                    <Flex>
                      <Text fontSize={"12px"}>{file.key}</Text>
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
                        >
                          Download
                        </Button>
                      </a>
                    </Flex>
                  </Box>
                ))}
              </Box>
            ))
          ) : (
            // Render a message or placeholder content when topicDetails is undefined or empty
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

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
import detailsCoveredData from "../data/detailsCoveredData";
import defaultImageUrl from "../../../../../assets/images/image1.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BsDownload } from "react-icons/bs";
const DetailsCoveredFiles = () => {
  const apiUrl = "http://localhost:5000";
  const [topicDetails, setTopicDetails] = useState([]);
  const location = useLocation(); // Get the current location

  // Extract the topicId from the URL query parameter



  useEffect(() => {
    // Extract the topicId from the current location
    const topicIdFromURL = new URLSearchParams(location.search).get("topicId");
  
    // Make a GET request to your /get-topic-details API with the extracted topicId
    axios
      .get(`${apiUrl}/get-topic-details?topicId=${topicIdFromURL}`)
      .then((response) => {
        setTopicDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching topic details: ", error);
      });
  }, [location]);
  

  return (
    <Box bg={"#F1F5F8"} borderRadius={"26px"} w={"100%"}>
      <HStack spacing={"10px"} p={6}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"}>
          Details
        </Text>
      </HStack>
      <Stack ml={"20px"}>
        {detailsCoveredData.map((topicInfo) => (
          <Flex key={topicInfo.id} p={4}>
            <Box flex={1}>
              <Text>Description</Text>

              <Text fontSize={"12px"} color={"#2C332978"} mt={"15px"}>
                {topicInfo.description}
              </Text>
            </Box>

            <Box flex={1} ml={"24px"}>
              <Text fontSize="md">Agenda</Text>
              <ul
                style={{
                  listStyle: "circle",
                  fontSize: "12px",
                  lineHeight: "20px",
                  color: "#2C332978",
                  marginTop: "15px",
                }}
              >
                {topicInfo.covered.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </Box>
          </Flex>
        ))}

        <Box p={"13px"}>
          <Text>Recordings</Text>
          {detailsCoveredData.map((topicInfo) => (
            <Flex
              key={topicInfo.id}
              mt={"15px"}
              color={"#2C332978"}
              fontSize={"13px"}
              gap={"24px"}
            >
              {topicInfo.recordings.map((id) => (
                <Flex key={id} w={"15%"} h={"15%"}>
                  {/* <Link to="/view-recording">
                    <Image src={defaultImageUrl} alt="Default Image" />
                  </Link> */}

                  <Link to={`/view-recording?topicId=${topicInfo.id}`}>
                    <Image src={defaultImageUrl} alt="Default Image" />
                  </Link>
                </Flex>
              ))}
            </Flex>
          ))}
        </Box>

        <Box p={"13px"}>
          <Text>Files/Notes</Text>
          {detailsCoveredData.map((topicInfo) => (
            <Flex
              key={topicInfo.id}
              mt={"15px"}
              color={"#2C332978"}
              fontSize={"13px"}
            >
              {topicInfo.filesOrNotes.map((fileOrNote, index) => (
                <Flex
                  key={index}
                  mr={"10px"}
                  p={"9px"}
                  borderRadius={"6px"}
                  border={"1px"}
                  borderColor={"#9597927D"}
                  boxShadow={"md"}
                  h={"49px"}
                  alignItems={"center"}
                >
                  {fileOrNote}
                  <Spacer />
                  <Button
                    rightIcon={<BsDownload />}
                    variant={"ghost"}
                    color={"black"}
                    ml={2}
                  ></Button>
                </Flex>
              ))}
            </Flex>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};
export default DetailsCoveredFiles;

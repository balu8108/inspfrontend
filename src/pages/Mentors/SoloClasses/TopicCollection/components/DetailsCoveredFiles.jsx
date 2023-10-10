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
import { BsDownload } from "react-icons/bs";
const DetailsCoveredFiles = ( {viewTopic}) => {
  const apiUrl = "http://localhost:5000";
console.log("topic details", viewTopic)
  
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







// // TopicDetails.js

// import React from "react";
// import { Box, Text, Button, Link } from "@chakra-ui/react";

// const TopicDetails = ({ topic }) => {
//   return (
//     <Box
//       key={topic.id}
//       h={"204px"}
//       minW={"28%"}
//       bg={"#F1F5F8"}
//       blendMode={"multiply"}
//       mx={6}
//       borderRadius={"26px"}
//     >
//       <Text fontSize={"15px"} ml={"13px"} mt={"16px"} lineHeight={"19px"} noOfLines={1}>
//         {topic.description}
//       </Text>
//       <Text fontWeight={400} fontSize={"11px"} lineHeight={"15px"} ml={"13px"} color={"rgba(44, 51, 41, 0.47)"}>
//         {topic.agenda}
//       </Text>
//       <Text fontSize={"12px"} lineHeight={"13px"} ml={"13px"} fontWeight={400} color={"rgba(44, 51, 41, 1)"} mt={"18px"}>
//         Description
//       </Text>
//       <Text fontSize={"11px"} lineHeight={"21px"} fontWeight={400} ml={13} noOfLines={"2"} color={"rgba(44, 51, 41, 0.47)"}>
//         {topic.description}
//       </Text>

//       <Link href={topic.soloClassRoomFiles[0]?.url} target="_blank" rel="noopener noreferrer">
//         <Button variant={"ghost"} color={"#3C8DBC"} fontWeight={"600"} size={"14px"} lineHeight={"16px"} mt={"60px"}>
//           View Details
//         </Button>
//       </Link>
//     </Box>
//   );
// };

// export default TopicDetails;

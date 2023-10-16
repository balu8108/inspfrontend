import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Card,
  Flex,
  Button,
  Stack,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { GrUpload } from "react-icons/gr";
import { BsDownload } from "react-icons/bs";
import uploadedChapterDetails from "../data/uploadingDetails";
import {BASE_URL}  from "../../../../constants/staticurls"
import { extractFileNameFromS3URL } from "../../../../utils";
import axios from "axios";
const AllUploadedLecture = () => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const apiUrl = "http://localhost:5000";
  const handleViewDetails = (assignmentId) => {
    setSelectedAssignment(assignmentId);
  };

  const clearSelection = () => {
    setSelectedAssignment(null);
  };

  useEffect(() => {
    // Make an API request to fetch assignments with files
    axios
      .get(`${BASE_URL}/topic/all-assignment-with-files`)
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      });
  }, []);

  return (
    <Box width={"100%"} h={"100%"} bg={"#F1F5F8"} borderRadius={"26px"}>
      <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"}>
          My Uploads
        </Text>
        <InputGroup m={4} w={"220px"} ml={"320px"}>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="#000000" />
          </InputLeftElement>
          <Input placeholder="Search" w={"240px"} />
        </InputGroup>
      </HStack>
      <SimpleGrid
        columns={{ base: 1, md: 1, lg: 1 }}
        spacing={"6"}
        p={4}
        mr={"20px"}
      >
        {assignments.map((assignmentScreen) => (
          <Card
            w="100%"
            blendMode={"multiply"}
            bg={"#F1F5F8"}
            borderRadius={"18px"}
            key={assignmentScreen.id}
          >
            <Text fontSize={"15px"} lineHeight={"18px"} ml={"13px"} mt={"16px"}>
              {assignmentScreen.topicName}
            </Text>
            <Text
              fontWeight={400}
              fontSize={"12px"}
              lineHeight={"14px"}
              ml={"13px"}
              mt={"3px"}
              color={"#2C332978"}
            >
              {assignmentScreen.instructorName}
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
              fontSize={"12px"}
              lineHeight={"21px"}
              fontWeight={400}
              ml={13}
              mt={"5px"}
              color={"#2C332978"}
              noOfLines={2}
            >
              {assignmentScreen.description}
            </Text>
            <Box
              flex={1}
              display="flex"
              justifyContent="flex-end"
              gap={4}
              my={"13px"}
              mx={"25px"}
            >
              {assignmentScreen.AssignmentFiles.map((file, index) => (
                <Flex
                  key={index}
                  flex={1}
                  bg={"blackAlpha.100"}
                  mt={"12px"}
                  color={"#2C332978"}
                  p={"9px"}
                  borderRadius={"6px"}
                  border={"1px"}
                  borderColor={"#9597927D"}
                  boxShadow={"md"}
                  h={"49px"}
                  fontSize={"11px"}
                >
                  {/* Display file information here */}
                  <Text>{extractFileNameFromS3URL(file.key)}</Text>
                  <Button
                    rightIcon={<BsDownload />}
                    variant={"ghost"}
                    size="sm"
                    color={"black"}
                    ml={2}
                  ></Button>
                </Flex>
              ))}
            </Box>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AllUploadedLecture;

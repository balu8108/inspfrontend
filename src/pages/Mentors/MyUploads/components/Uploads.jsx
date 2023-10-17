// this is the screen where all the assignmemts will apppear for the topics..
import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Card,
  Flex,
  Button,
  SimpleGrid,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import uploadedChapterDetails from "../data/uploadingDetails";
import DocumentViewer from "../../../../components/popups/DocumentViewer";
import { BASE_URL } from "../../../../constants/staticurls";
import { extractFileNameFromS3URL } from "../../../../utils";
import { getPresignedUrlDocApi } from "../../../../api/genericapis";
import axios from "axios";
const AllUploadedLecture = () => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const handleViewDetails = (assignmentId) => {
    setSelectedAssignment(assignmentId);
  };

  const clearSelection = () => {
    setSelectedAssignment(null);
  };

  const handleOpenDocumentViewer = (docId) => {
    getPresignedUrlDocApi(docId)
      .then((response) => {
        const preSignedUrl = response.data?.getUrl;

        setSelectedFileUrl(preSignedUrl);
        setModalIsOpen(true);

        return preSignedUrl;
      })
      .catch((error) => {
        console.error("Error getting pre-signed URL:", error);
      });
  };

  const handleCloseDocumentViewer = () => {
    setModalIsOpen(false);
    setSelectedFileUrl("");
  };

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.topicName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        <Spacer />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          w="30%"
          border="1px solid #ccc"
          borderRadius="md"
          px="3"
          py="2"
          mx={12}
          my={"17"}
        />
      </HStack>
      <SimpleGrid
        columns={{ base: 1, md: 1, lg: 1 }}
        spacing={"6"}
        p={4}
        mr={"20px"}
      >
        {filteredAssignments.map((assignmentScreen) => (
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
                  <Text mt={2}>{extractFileNameFromS3URL(file.key)}</Text>
                  <Spacer/>
                  <Button
                    rightIcon={<BsDownload />}
                    variant={"ghost"}
                    size="sm"
                    color={"black"}
                    ml={2}
                    onClick={() =>
                      handleOpenDocumentViewer(assignmentScreen.id)
                    }
                  ></Button>
                </Flex>
              ))}
            </Box>
          </Card>
        ))}
      </SimpleGrid>
      {modalIsOpen && (
        <DocumentViewer
          isOpen={modalIsOpen}
          onClose={handleCloseDocumentViewer}
          docUrl={selectedFileUrl}
        />
      )}
    </Box>
  );
};

export default AllUploadedLecture;

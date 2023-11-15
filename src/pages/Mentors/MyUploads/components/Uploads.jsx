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
  InputGroup,
  InputLeftElement,
  Spacer,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { BsDownload } from "react-icons/bs";
import uploadedChapterDetails from "../data/uploadingDetails";
import DocumentViewer from "../../../../components/popups/DocumentViewer";
import { BASE_URL } from "../../../../constants/staticurls";
import { extractFileNameFromS3URL } from "../../../../utils";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsDocModalOpen } from "../../../../store/actions/genericActions";
const AllUploadedLecture = () => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleViewDetails = (assignmentId) => {
    setSelectedAssignment(assignmentId);
  };

  const clearSelection = () => {
    setSelectedAssignment(null);
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
    <Box
      width={"100%"}
      h={"100%"}
      boxShadow={"2px 2px 13px 0px #5C5C5C1F    "}
      borderRadius={"26px"}
    >
      <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"20px"} lineHeight={"24px"}>
          My Uploads
        </Text>

        <Spacer />
        <InputGroup w="30%" mx={12} my={17}>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            borderRadius="14PX"
            bg={"#F1F5F8"}
          />
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
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
              flexWrap={"wrap"}
              gap={4}
              my={"13px"}
              mx={"13px"}
            >
              {assignmentScreen.AssignmentFiles.map((file, index) => (
                <Flex
                  key={index}
                  w={"165px"}
                  h={"49px"}
                  color={"#2C332978"}
                  borderColor={"#9597927D"}
                  boxShadow={" 0px 1px 6px 0px #00000029 "}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  bg="white"
                  mb={2}
                  borderRadius={"md"}
                  px={2}
                  py={3}
                >
                  <Text mt={2} fontSize={"11px"}>
                    {extractFileNameFromS3URL(file.key)}
                  </Text>
                  <Spacer />
                  <Button
                    rightIcon={<BsDownload />}
                    variant={"ghost"}
                    size="sm"
                    color={"black"}
                    ml={2}
                    onClick={() =>
                      dispatch(
                        setIsDocModalOpen(
                          file?.id,
                          file?.key,
                          "assignment",
                          true
                        )
                      )
                    }
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

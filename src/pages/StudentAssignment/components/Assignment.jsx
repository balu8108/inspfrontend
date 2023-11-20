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
import { FaSearch } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import axios from "axios";
import { BASE_URL } from "../../../constants/staticurls";
import {
  boxShadowStyles,
  capitalize,
  extractFileNameFromS3URL,
} from "../../../utils";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { setIsDocModalOpen } from "../../../store/actions/genericActions";

const AssignmentDetails = () => {
  const [assignmentData, setAssignmentData] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { subjectName } = useParams();
  const dispatch = useDispatch();

  const filteredData = Array.isArray(assignmentData)
    ? assignmentData.filter((assignment) => {
        const topicName = assignment.topicName.toLowerCase();
        const search = searchQuery.toLowerCase();
        return topicName.includes(search);
      })
    : [];

  useEffect(() => {
    axios
      .get(BASE_URL + `/topic/get-assignment-by-subject-name/${subjectName}`)
      .then((response) => {
        setAssignmentData(response.data);
        console.log("data for assignment", response);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      });
  }, [subjectName]);

  return (
    <Box
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      width={"full"}
      h={"full"}
      bg={"white"}
      borderRadius={"26px"}
    >
      <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"}>
          Assignments ({capitalize(subjectName)})
        </Text>
        <Spacer />
        <InputGroup m={4} w={"220px"}>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="#000000" />
          </InputLeftElement>
          <Input
            placeholder="Search"
            w={"240px"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </HStack>
      {filteredData.length > 0 ? (
        <SimpleGrid
          columns={{ base: 1, md: 1, lg: 1 }}
          spacing={"6"}
          p={4}
          mr={"20px"}
        >
          {filteredData.map((assignment) => (
            <Card
              w="100%"
              blendMode={"multiply"}
              bg={"#F1F5F8"}
              borderRadius={"18px"}
              key={assignment.id}
            >
              <Text
                fontSize={"15px"}
                lineHeight={"18px"}
                ml={"13px"}
                mt={"16px"}
              >
                {assignment.topicName}
              </Text>
              <Text
                fontWeight={400}
                fontSize={"12px"}
                lineHeight={"14px"}
                ml={"13px"}
                mt={"3px"}
                color={"#2C332978"}
              >
                {assignment.instructorName}
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
                {assignment.description}
              </Text>
              <Box
                flex={1}
                display="flex"
                justifyContent="flex-end"
                gap={4}
                my={"13px"}
                mx={"25px"}
              >
                {assignment.AssignmentFiles.map((files, index) => (
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
                    <Text mt={2}>{extractFileNameFromS3URL(files.key)}</Text>
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
                            files?.id,
                            files?.key,
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
      ) : (
        <Box textAlign="center" mt={4}>
          <Text>No assignments for {capitalize(subjectName)}.</Text>
        </Box>
      )}
    </Box>
  );
};

export default AssignmentDetails;

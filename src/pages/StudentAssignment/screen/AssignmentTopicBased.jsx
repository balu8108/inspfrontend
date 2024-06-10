//This component is for showing assignment  for the subjects.
import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Card,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  useTheme,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { capitalize } from "../../../utils";
import { useParams } from "react-router";
import { getAssignmentByTopicIdApi } from "../../../api/assignments";
import SingleFileComponent from "../../../components/filebox/SingleFileComponent";

const AssignmentTopicBased = () => {
  const [assignmentData, setAssignmentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { topicId, topicName } = useParams();
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  const filteredData = Array.isArray(assignmentData)
    ? assignmentData.filter((assignment) => {
        const topicName = assignment.description.toLowerCase();
        const search = searchQuery.toLowerCase();
        return topicName.includes(search);
      })
    : [];

  useEffect(() => {
    const fetchAssignmentByTopicId = async (topicId) => {
      try {
        const response = await getAssignmentByTopicIdApi(topicId);
        if (response?.status === 200) {
          setAssignmentData(response?.data);
        }
      } catch (err) {}
    };

    fetchAssignmentByTopicId(topicId);
  }, [topicId]);

  return (
    <Box width={"full"} bg={outerBackground} borderRadius={"26px"} p={6}>
      <Flex justifyContent={"space-between"}>
        <HStack spacing={"10px"} alignItems="center">
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"20px"} lineHeight={"24px"}>
            Assignments ({capitalize(topicName)})
          </Text>
        </HStack>
        <InputGroup w="30%">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            borderRadius="14PX"
            bg={innerBackground}
          />
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch />
          </InputLeftElement>
        </InputGroup>
      </Flex>
      <Box pt={10}>
        <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={4}>
          {filteredData.map((assignment) => (
            <Card
              w="100%"
              bg={innerBackground}
              boxShadow={innerBoxShadow}
              borderRadius={"18px"}
              p={6}
              key={assignment.id}
            >
              <Text fontSize={"15px"} lineHeight={"18px"}>
                {capitalize(assignment?.topicName)}
              </Text>
              <Text
                fontWeight={400}
                fontSize={"12px"}
                lineHeight={"14px"}
                color={"#2C332978"}
              >
                {assignment.instructorName}
              </Text>
              <Text
                fontSize={"12px"}
                lineHeight={"13px"}
                fontWeight={400}
                color={"rgba(44, 51, 41, 1)"}
                mt={4}
              >
                Description
              </Text>
              <Text
                fontSize={"12px"}
                lineHeight={"21px"}
                fontWeight={400}
                color={"#2C332978"}
                noOfLines={2}
              >
                {assignment.description}
              </Text>
              <Box flex={1} display="flex" flexWrap={"wrap"} gap={4} mt={4}>
                {assignment?.AssignmentFiles.map((file) => (
                  <SingleFileComponent
                    key={file?.id}
                    file={file}
                    type="assignment"
                  />
                ))}
              </Box>
            </Card>
          ))}
        </SimpleGrid>
        {filteredData.length === 0 && (
          <Box
            h={"204px"}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
          >
            No Assignment for this topic
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AssignmentTopicBased;

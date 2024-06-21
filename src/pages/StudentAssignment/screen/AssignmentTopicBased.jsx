//This component is for showing assignment  for the subjects.
import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  useTheme,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { useParams } from "react-router";
import { capitalize } from "../../../utils";
import { getAssignmentByTopicIdApi } from "../../../api/assignments";
import AssignmentTopicBasedCard from "../../../components/Card/AssignmentTopicBasedCard";

const AssignmentTopicBased = () => {
  const [assignmentData, setAssignmentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAssignmentDeleted, setIsAssignmentDeleted] = useState(false);
  const { topicId, topicName } = useParams();
  const { outerBackground, innerBackground } = useTheme().colors.pallete;

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
  }, [topicId, isAssignmentDeleted]);

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
            <AssignmentTopicBasedCard
              assignment={assignment}
              setIsAssignmentDeleted={setIsAssignmentDeleted}
            />
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

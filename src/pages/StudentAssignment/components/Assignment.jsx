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
  Center,
  Image,
  VStack,
  useTheme,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { capitalize } from "../../../utils";
import ChemistryImage from "../../../assets/images/undraw_science_re_mnnr 1.svg";
import MathematicsImage from "../../../assets/images/undraw_mathematics_-4-otb 1.svg";
import { fetchAllTopicsForSubjectApi } from "../../../api/inspexternalapis";
import TopicCard from "../../../components/Card/TopicCard";

const AssignmentDetails = () => {
  const [allTopicList, setAllTopicList] = useState([]);
  const [filteredTopicList, setFilteredTopicList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { subjectName } = useParams();
  const { outerBackground, innerBackground } = useTheme().colors.pallete;

  const navigate = useNavigate();

  const handleViewRecording = (data) => {
    navigate(`/assignment/topic/${data?.id}/${data?.name}`);
  };

  useEffect(() => {
    async function fetchAllTopicsForSubject() {
      try {
        const response = await fetchAllTopicsForSubjectApi("1");
        console.log(response);
        if (response.status) {
          setAllTopicList(response.result);
          setFilteredTopicList(response.result);
        } else {
          setAllTopicList([]);
          setFilteredTopicList([]);
        }
      } catch (error) {
        console.error("Error fetching topics data:", error);
      }
    }

    fetchAllTopicsForSubject();
  }, []);

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredLibrary = allTopicList.filter((libraryData) => {
      const topicName = libraryData.name.toLowerCase();
      return topicName.includes(query);
    });

    setFilteredTopicList(filteredLibrary);
  };

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
            Assignments ({capitalize(subjectName)})
          </Text>
        </HStack>
        <InputGroup w="30%">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search..."
            borderRadius="14PX"
            bg={innerBackground}
          />
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch />
          </InputLeftElement>
        </InputGroup>
      </Flex>
      {subjectName === "PHYSICS" ? (
        <Box pt={10}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={"6"}>
            {filteredTopicList?.length === 0
              ? null
              : filteredTopicList?.map((topic) => (
                  <TopicCard
                    width={"100%"}
                    topic={topic}
                    handleView={handleViewRecording}
                  />
                ))}
          </SimpleGrid>
        </Box>
      ) : (
        <Box>
          <Center>
            <VStack my={6}>
              <Image
                boxSize="200px"
                objectFit="cover"
                src={
                  subjectName === "CHEMISTRY"
                    ? ChemistryImage
                    : MathematicsImage
                }
                alt="subject-image"
              />
              <Text
                fontSize={"25px"}
                fontWeight={"500"}
                lineHeight={"37px"}
                color={"#2C3329"}
              >
                Coming Soon
              </Text>
            </VStack>
          </Center>
        </Box>
      )}
    </Box>
  );
};

export default AssignmentDetails;

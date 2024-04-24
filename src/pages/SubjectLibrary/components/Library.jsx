import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Flex,
  VStack,
  Input,
  InputLeftElement,
  InputGroup,
  Image,
  Center,
  useTheme,
  SimpleGrid,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { fetchAllTopicsForSubjectApi } from "../../../api/inspexternalapis";
import { capitalize } from "../../../utils";
import MathematicsImage from "../../../assets/images/undraw_mathematics_-4-otb 1.svg";
import ChemistryImage from "../../../assets/images/undraw_science_re_mnnr 1.svg";
import TopicCard from "../../../components/Card/TopicCard";

const SubjectLibrary = () => {
  const { subject_id, subjectName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [allTopicList, setAllTopicList] = useState([]);
  const [filteredTopicList, setFilteredTopicList] = useState([]);
  const { outerBackground, innerBackground } = useTheme().colors.pallete;

  const navigate = useNavigate();

  const handleViewRecording = (data) => {
    navigate(`/library/topic/${data?.id}/${data?.name}`);
  };

  useEffect(() => {
    const handleFetchTopics = async () => {
      const subjectId = subject_id === "4" || subject_id === "1" ? "1" : "2";
      try {
        const response = await fetchAllTopicsForSubjectApi(subjectId);
        if (response) {
          if (response.result) {
            setAllTopicList(response.result);
            setFilteredTopicList(response.result);
          } else {
            setAllTopicList([]);
            setFilteredTopicList([]);
          }
        }
      } catch (err) {
        console.log("Error fetching topics data:", err);
      }
    };

    handleFetchTopics();
  }, [subject_id]);

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
    <Box
      width={"100%"}
      bg={outerBackground}
      borderRadius={"26px"}
      px={"30px"}
      py={"15px"}
    >
      <Flex justifyContent={"space-between"}>
        <HStack spacing={"10px"} alignItems="center">
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"}>
            Library ({capitalize(subjectName)})
          </Text>
        </HStack>
        <InputGroup w="30%" my={17}>
          <Input
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search..."
            border="1px solid #ccc"
            borderRadius="14px"
            bg={innerBackground}
          />
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch />
          </InputLeftElement>
        </InputGroup>
      </Flex>
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

      {filteredTopicList?.length === 0 && (
        <Box mt={4}>
          {subjectName === "CHEMISTRY" && (
            <Center>
              <VStack spacing={4}>
                <Image
                  boxSize="200px"
                  objectFit="cover"
                  src={ChemistryImage}
                  alt="Chemistry"
                />
                <Text
                  fontSize={"25px"}
                  fontWeight={"500"}
                  lineHeight={"37px"}
                  color={"#2C3329"}
                  p={"40px"}
                >
                  Coming Soon
                </Text>
              </VStack>
            </Center>
          )}

          {subjectName === "MATHEMATICS" && (
            <Center>
              <VStack spacing={4}>
                <Image
                  boxSize="200px"
                  objectFit="cover"
                  src={MathematicsImage}
                  alt="Mathematics"
                />
                <Text
                  fontSize={"25px"}
                  fontWeight={"500"}
                  lineHeight={"37px"}
                  color={"#2C3329"}
                  p={"40px"}
                >
                  Coming Soon
                </Text>
              </VStack>
            </Center>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SubjectLibrary;

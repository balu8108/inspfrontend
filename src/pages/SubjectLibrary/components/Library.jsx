import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Card,
  Flex,
  Button,
  Stack,
  VStack,
  Input,
  InputLeftElement,
  InputGroup,
  Spacer,
  Image,
  Center,
  filter,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { fetchAllTopicsForSubjectApi } from "../../../api/inspexternalapis";
import topicDescriptionConstants from "../../../constants/topicDescriptionConstants";
import { boxShadowStyles, capitalize } from "../../../utils";
import MathematicsImage from "../../../assets/images/undraw_mathematics_-4-otb 1.svg";
import ChemistryImage from "../../../assets/images/undraw_science_re_mnnr 1.svg";
import TopicBasedRecordings from "./TopicBasedRecordings";

const SubjectLibrary = () => {
  const { subject_id, subjectName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [allTopicList, setAllTopicList] = useState([]);
  const [filteredTopicList, setFilteredTopicList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const handleFetchTopics = async () => {
  //     try {
  //       const response = await fetchAllTopicsForSubjectApi(subject_id);
  //       if (response) {
  //         if (response.result) setAllTopicList(response.result);
  //         else setAllTopicList([]);
  //       }
  //     } catch (err) {
  //       console.log("Error fetching topics data:", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   handleFetchTopics();
  // }, [subject_id]);

  useEffect(() => {
    const handleFetchTopics = async () => {
      try {
        const response = await fetchAllTopicsForSubjectApi(subject_id);
        if (response) {
          if (response.result) {
            setAllTopicList(response.result);
            setFilteredTopicList(response.result); // Initialize filtered list with all topics
          } else {
            setAllTopicList([]);
            setFilteredTopicList([]); // Initialize filtered list with an empty array
          }
        }
      } catch (err) {
        console.log("Error fetching topics data:", err);
      } finally {
        setIsLoading(false);
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

  if (subject_id === "4") {
    return <TopicBasedRecordings />;
  }

  if (subject_id === "4") {
    return <TopicBasedRecordings />;
  }

  return (
    <Box
      width={"100%"}
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
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
          Library ({capitalize(subjectName)})
        </Text>
        <Spacer />
        <InputGroup w="30%" mx={12} my={17}>
          <Input
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search..."
            border="1px solid #ccc"
            borderRadius="md"
          />
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
      </HStack>

      <Stack>
        <Flex flexWrap="wrap" p={5} gap={"24px"} ml={5}>
          {filteredTopicList?.length === 0
            ? null
            : filteredTopicList?.map((libraryData) => (
                <Card
                  key={libraryData.id}
                  w="30%"
                  h={"204px"}
                  blendMode={"multiply"}
                  bg={"#F1F5F8"}
                  borderRadius={"18px"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Text
                    fontSize={"15px"}
                    fontWeight={"400px"}
                    lineHeight={"19.36px"}
                    color={"#2C3329"}
                    mt={"13px"}
                    ml={"13px"}
                    noOfLines={1}
                  >
                    {capitalize(libraryData.name)}
                  </Text>

                  <Text
                    fontWeight={400}
                    fontSize={"11px"}
                    lineHeight={"15px"}
                    ml={"13px"}
                    color={"rgba(44, 51, 41, 0.47)"}
                  >
                    Nitin Sachan
                  </Text>

                  <Text
                    mt={"16px"}
                    ml={"13px"}
                    fontSize={"12px"}
                    lineHeight={"14.52px"}
                  >
                    Description
                  </Text>
                  <Text
                    fontSize={"11px"}
                    lineHeight={"21px"}
                    fontWeight={400}
                    ml={13}
                    noOfLines={"3"}
                    color={"rgba(44, 51, 41, 0.47)"}
                  >
                    {topicDescriptionConstants[libraryData.id]}
                  </Text>

                  <Button
                    color={"#3C8DBC"}
                    variant={"ghost"}
                    mt={"10px"}
                    fontSize={"14px"}
                    lineHeight={"16px"}
                    fontWeight={"600"}
                  >
                    View Details
                  </Button>
                </Card>
              ))}
        </Flex>
      </Stack>

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

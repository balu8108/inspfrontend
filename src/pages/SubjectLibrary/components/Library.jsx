//This is the page where all the live class recording will come.
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
  useTheme,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { fetchAllTopicsForSubjectApi } from "../../../api/inspexternalapis";
import topicDescriptionConstants from "../../../constants/topicDescriptionConstants";
import { capitalize } from "../../../utils";
import MathematicsImage from "../../../assets/images/undraw_mathematics_-4-otb 1.svg";
import ChemistryImage from "../../../assets/images/undraw_science_re_mnnr 1.svg";
import TopicBasedRecordings from "./TopicBasedRecordings";

const SubjectLibrary = () => {
  const { subject_id, subjectName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [allTopicList, setAllTopicList] = useState([]);
  const [filteredTopicList, setFilteredTopicList] = useState([]);
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  const navigate = useNavigate();

  const handleViewRecording = (data) => {
    navigate(`/view-recording?type=live_topic&id=${data?.id}`);
  };

  useEffect(() => {
    const handleFetchTopics = async () => {
      try {
        const response = await fetchAllTopicsForSubjectApi(subject_id);
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

  if (subject_id === "4") {
    return <TopicBasedRecordings />;
  }

  if (subject_id === "4") {
    return <TopicBasedRecordings />;
  }

  return (
    <Box width={"100%"} bg={outerBackground} borderRadius={"26px"}>
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
            borderRadius="14px"
            bg={innerBackground}
          />
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch />
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
                  bg={innerBackground}
                  boxShadow={innerBoxShadow}
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
                    _hover={{ bg: "white" }}
                    onClick={() => handleViewRecording(libraryData)}
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

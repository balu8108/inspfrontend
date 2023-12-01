//This is the library for topic based recording - Solo Recordings
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  HStack,
  Text,
  InputGroup,
  Input,
  InputLeftElement,
  Spacer,
  Stack,
  Flex,
  Button,
  Spinner,
  Center,
  useTheme,
} from "@chakra-ui/react";
import { fetchAllTopicsWithoutChapterIdApi } from "../../../api/inspexternalapis";
import { SearchIcon } from "@chakra-ui/icons";
import topicDescriptionConstants from "../../../constants/topicDescriptionConstants";
import { boxShadowStyles, capitalize } from "../../../utils";
import { useParams, useNavigate } from "react-router-dom";
const TopicBasedRecordings = () => {
  const [topic, setTopic] = useState(null);
  const [filteredTopic, setFilteredTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { subjectName } = useParams();
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  const navigate = useNavigate();

  const handleViewRecording = (data) => {
    navigate(`/view-recording?type=solo_topic&id=${data?.id}`);
  };
  useEffect(() => {
    const fetchtopic = async () => {
      try {
        const response = await fetchAllTopicsWithoutChapterIdApi();
        if (response?.result) {
          setTopic(response.result);
          setFilteredTopic(response.result);
        } else {
          setTopic([]);
          setFilteredTopic([]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchtopic();
  }, []);

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredLibrary = topic.filter((libraryData) => {
      const topicName = libraryData.name.toLowerCase();
      return topicName.includes(query);
    });

    setFilteredTopic(filteredLibrary);
  };

  if (isLoading) {
    return (
      <Box>
        <Center>
          <Spinner size={"xl"} mt={"50%"} color="#F1F5F8" />
        </Center>
      </Box>
    );
  }

  return (
    <Box
      width={"100%"}
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      bg={outerBackground}
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
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search..."
            border="1px solid #ccc"
            borderRadius="md"
            bg={innerBackground}
          />
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
      </HStack>
      <Stack>
        <Flex flexWrap="wrap" p={5} gap={"24px"} ml={5}>
          {filteredTopic?.length === 0
            ? null
            : filteredTopic?.map((libraryData) => (
                <Card
                  key={libraryData.id}
                  w="30%"
                  h={"204px"}
                  boxShadow={innerBoxShadow}
                  bg={innerBackground}
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
                    onClick={()=>handleViewRecording(libraryData)}
                  >
                    View Details
                  </Button>
                </Card>
              ))}
        </Flex>
      </Stack>
    </Box>
  );
};

export default TopicBasedRecordings;

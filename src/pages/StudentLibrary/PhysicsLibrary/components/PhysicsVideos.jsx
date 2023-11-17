import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Card,
  Flex,
  Button,
  Stack,
  Input,
  InputLeftElement,
  InputGroup,
  Spacer,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { fetchAllTopicsForSubjectApi } from "../../../../api/inspexternalapis";
import topicDescriptionConstants from "../../../../constants/topicDescriptionConstants";
import { capitalize } from "../../../../utils";

const Library = () => {
  const { subject_id, subjectName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [allTopicList, setAllTopicList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFetchTopics = async () => {
    try {
      const response = await fetchAllTopicsForSubjectApi(subject_id);
      if (response && response.status) {
        setAllTopicList(response.result);
        console.log("API Result:", response.result); // Log the result here
      }
    } catch (err) {
      console.log("Error fetching topics data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchTopics();
  }, [subject_id]);

  const filteredLibrary = allTopicList.filter((libraryData) => {
    const topicName = libraryData.name.toLowerCase();
    return topicName.includes(searchQuery.toLowerCase());
  });

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box width={"100%"} bg={"#F1F5F8"} borderRadius={"26px"}>
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
          />
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
      </HStack>

      <Stack>
        <Flex flexWrap="wrap" p={5} gap={"24px"} ml={5}>
          {filteredLibrary.length === 0 ? (
            <Text>No topics found for {capitalize(subjectName)}</Text>
          ) : (
            filteredLibrary.map((libraryData) => (
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

                {/* <Link
                  style={{ display: "flex", justifyContent: "center" }}
                  to={`/student/library/${libraryData.name}`}
                > */}
                <Button
                  color={"#3C8DBC"}
                  mt={"10px"}
                  fontSize={"14px"}
                  lineHeight={"16px"}
                  fontWeight={"600"}
                >
                  View Details
                </Button>
                {/* </Link> */}
              </Card>
            ))
          )}
        </Flex>
      </Stack>
    </Box>
  );
};

export default Library;

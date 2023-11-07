// I have given name as phy but it is component which take params as subject name and displays all the  topics for the subject 
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
import { Link } from "react-router-dom";
import physVideosData from "../data/PhysVideosData";
import { SearchIcon } from "@chakra-ui/icons";
import { fetchAllTopicsWithoutChapterIdApi } from "../../../../api/inspexternalapis";
import { useParams } from "react-router-dom";
import topicDescriptionConstants from "../../../../constants/topicDescriptionConstants";
const PhysLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allTopicList, setAllTopicList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { subjectName } = useParams();

  const filteredLibrary = allTopicList.filter((libraryData) => {
    const topicName = libraryData.name.toLowerCase();
    return topicName.includes(searchQuery.toLowerCase());
  });

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    async function fetchAllTopicsWithoutChapterId() {
      try {
        const response = await fetchAllTopicsWithoutChapterIdApi();

        if (response.status) {
          setAllTopicList(response.result);
        }
      } catch (error) {
        console.error("Error fetching topics data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllTopicsWithoutChapterId();
  }, []);

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
          Library ({subjectName})
        </Text>
        <Spacer />
        <InputGroup w="30%" mx={12} my={17}>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          {filteredLibrary.map((libraryData) => (
            <Card
              key={libraryData.id}
              w="30%"
              h={"204px"}
              blendMode={"multiply"}
              bg={"#F1F5F8"}
              borderRadius={"18px"}
            >
              <Text ml={"13px"} mt={"16px"} lineHeight={"18px"} noOfLines={1}>
                {libraryData.name}
              </Text>
              <Text
                fontSize={"12px"}
                lineHeight={"15px"}
                ml={"13px"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                {/* {libraryData.instructorName} */}
                Nitin Sachan
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
                fontSize={"11px"}
                lineHeight={"21px"}
                ml={13}
                mt={"6px"}
                color={"rgba(44, 51, 41, 0.47)"}
                noOfLines={3}
              >
                {topicDescriptionConstants[libraryData.id]}
              </Text>

              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600"}
                fontSize={"14px"}
                lineHeight={"16px"}
                p={7}
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

export default PhysLibrary;

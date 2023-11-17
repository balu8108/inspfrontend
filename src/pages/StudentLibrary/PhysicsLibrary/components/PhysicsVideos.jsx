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
import { fetchAllTopicsWithoutChapterIdApi } from "../../../../api/inspexternalapis";
import topicDescriptionConstants from "../../../../constants/topicDescriptionConstants";
import { capitalize } from "../../../../utils";

const Library = () => {
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
    async function fetchTopicsForSubject() {
      try {
        const response = await fetchAllTopicsWithoutChapterIdApi(subjectName);

        if (response.status) {
          console.log("Fetched topics data:", response.result);
          setAllTopicList(response.result);
        }
      } catch (error) {
        console.error("Error fetching topics data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTopicsForSubject();
  }, [subjectName]);

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
          {filteredLibrary.map((libraryData) => {
            if (libraryData.subject === subjectName) {
              return (
                <Card
                  key={libraryData.id}
                  w="30%"
                  h={"204px"}
                  blendMode={"multiply"}
                  bg={"#F1F5F8"}
                  borderRadius={"18px"}
                >
                  <Text ml={"13px"} mt={"16px"} lineHeight={"18px"} noOfLines={1}>
                    {capitalize(libraryData?.name)}
                  </Text>
                  <Text
                    fontSize={"12px"}
                    lineHeight={"15px"}
                    ml={"13px"}
                    color={"rgba(44, 51, 41, 0.47)"}
                  >
                    Nitin Sachan {/* Hardcoded, replace with libraryData.instructorName */}
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

                  <Link
                    to={`/mentor/view/rating&feedback/${libraryData.id}/${libraryData.name}`}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
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
                  </Link>
                </Card>
              );
            }
            return null; // Skip rendering if subjects don't match
          })}
        </Flex>
      </Stack>
    </Box>
  );
};

export default Library;

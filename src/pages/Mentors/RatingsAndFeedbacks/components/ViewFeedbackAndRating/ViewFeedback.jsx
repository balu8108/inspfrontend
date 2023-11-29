import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Input,
  InputLeftElement,
  InputGroup,
  Spacer,
  SimpleGrid,
  Button,
  Card,
  Spinner,
  Center,
  useTheme,
} from "@chakra-ui/react";

import { fetchAllTopicsWithoutChapterIdApi } from "../../../../../api/inspexternalapis/index";
import { Link } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import topicDescriptionConstants from "../../../../../constants/topicDescriptionConstants";
import { boxShadowStyles, capitalize } from "../../../../../utils";
const ViewMentorsRatingAndFeedback = () => {
  const [allTopicList, setAllTopicList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayedChapters, setDisplayedChapters] = useState([]);
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  useEffect(() => {
    async function fetchAllTopicsWithoutChapterId() {
      try {
        const response = await fetchAllTopicsWithoutChapterIdApi();

        if (response.status) {
          setAllTopicList(response.result);
          // Initially, display the first three topics
          setDisplayedChapters(response.result.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching topics data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllTopicsWithoutChapterId();
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Filter topics based on the search query
    const filteredChapters = allTopicList.filter((chapter) =>
      chapter.name.toLowerCase().includes(query.toLowerCase())
    );
    // Update the displayed chapters with the filtered results
    setDisplayedChapters(filteredChapters.slice(0, 3));
  };

  return (
    <Box
      // boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      mt={"24px"}
      borderRadius={"26px"}
      bg={outerBackground}
    >
      <Flex>
        <HStack spacing={"10px"} ml="27px">
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Link to={`/mentor/rating&feedback`}>
            <Text fontSize={"20px"} lineHeight={"24px"}>
              Rating & feedback
            </Text>
          </Link>
        </HStack>

        <Spacer />
        <InputGroup w="30%" mx={12} my={"17"}>
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            bg={innerBackground}
          />
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
      </Flex>

      {isLoading ? (
        <Center>
          <Spinner size="lg" color="#3C8DBC" m={8} />
        </Center>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={"6"}
          p={4}
          mr={"20px"}
        >
          {displayedChapters.map((chapter) => (
            <Card
              w={"100%"}
              h={"204px"}
              key={chapter.id}
              bg={innerBackground}
              boxShadow={innerBoxShadow}
              borderRadius={"26px"}
              p={4}
              ml={"2"}
            >
              <Text fontSize="16px" noOfLines={1}>
                {capitalize(chapter?.name)}
              </Text>
              <Text fontSize="12px" color={"#2C332978"}>
                Nitin Sachan
              </Text>
              <Text fontSize={"12px"} mt={"18px"}>
                Description
              </Text>
              <Text
                fontSize="11px"
                color="#2C332978"
                noOfLines={3}
                lineHeight={"21px"}
              >
                {topicDescriptionConstants[chapter.id]}
              </Text>
              <Link
                to={`/mentor/view/rating&feedback/${chapter.id}/${chapter.name}`}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button variant={"ghost"} color={"#3C8DBC"}>
                  View Details
                </Button>
              </Link>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ViewMentorsRatingAndFeedback;

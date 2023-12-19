//In this component where 3 cards will come from topic and from search we can search all topic.
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
import { capitalize } from "../../../../../utils";
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

    const filteredChapters = allTopicList.filter((chapter) =>
      chapter.name.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedChapters(filteredChapters.slice(0, 3));
  };

  return (
    <Box mt={"24px"} borderRadius={"26px"} bg={outerBackground}>
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
            borderRadius={"14px"}
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
                style={{
                  position: "absolute",
                  bottom: "1px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Button
                  variant={"ghost"}
                  color={"#3C8DBC"}
                  _hover={{ bg: "white" }}
                >
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

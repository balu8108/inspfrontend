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
  SimpleGrid,
  Spinner,
  Center,
  useTheme,
} from "@chakra-ui/react";
import { fetchAllTopicsWithoutChapterIdApi } from "../../../../../api/inspexternalapis/index";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import TopicCard from "../../../../../components/Card/TopicCard";
const ViewMentorsRatingAndFeedback = () => {
  const [allTopicList, setAllTopicList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayedChapters, setDisplayedChapters] = useState([]);
  const navigate = useNavigate();
  const { outerBackground, innerBackground } = useTheme().colors.pallete;

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

  const handleView = (chapter) => {
    navigate(`/mentor/view/rating&feedback/${chapter.id}/${chapter.name}`);
  };

  return (
    <Box borderRadius={"26px"} p={"30px"} bg={outerBackground}>
      <Flex justifyContent={"space-between"} mb={"20px"}>
        <HStack spacing={"10px"}>
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
        <InputGroup w="30%">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            bg={innerBackground}
            borderRadius={"14px"}
          />
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch />
          </InputLeftElement>
        </InputGroup>
      </Flex>

      {isLoading ? (
        <Center>
          <Spinner size="lg" color="#3C8DBC" m={8} />
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={"6"}>
          {displayedChapters.map((topic) => (
            <TopicCard topic={topic} handleView={handleView} width={"100%"} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ViewMentorsRatingAndFeedback;

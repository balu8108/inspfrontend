//This is component where all the topics will be in the forms of cards.
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Input,
  SimpleGrid,
  Spinner,
  useTheme,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { fetchAllTopicsWithoutChapterIdApi } from "../../../../api/inspexternalapis/index";
import VectorImage from "../../../../assets/images/Line/Vector.svg";
import TopicCard from "../../../../components/Card/TopicCard";

const AllUploadedLecture = () => {
  const navigate = useNavigate();
  const [allTopicList, setAllTopicList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { outerBackground, innerBackground } = useTheme().colors.pallete;

  const handleViewDetails = (chapterId, chapterName) => {
    navigate(`/mentor/view/rating&feedback/${chapterId}/${chapterName}`);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = allTopicList.filter((topic) =>
      topic.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredTopics(filtered);
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
    <Box borderRadius={"26px"} bg={outerBackground} p={"30px"}>
      <Flex justifyContent={"space-between"} mb={"20px"}>
        <HStack spacing={"10px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"20px"} lineHeight={"24px"}>
            Rating & feedback
          </Text>
        </HStack>
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          w="30%"
          border="1px solid #ccc"
          borderRadius="14px"
          px="3"
          bg={innerBackground}
          py="2"
          style={{
            backgroundImage: `url(${VectorImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "10px center",
            paddingLeft: "40px",
          }}
        />
      </Flex>

      {isLoading ? (
        <Flex justify="center" align="center" h="200px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={"6"}>
          {(searchQuery ? filteredTopics : allTopicList).map((topic) => (
            <TopicCard
              width={"100%"}
              topic={topic}
              handleView={handleViewDetails}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default AllUploadedLecture;

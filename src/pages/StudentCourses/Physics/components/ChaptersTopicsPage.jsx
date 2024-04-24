//This component will show all the chapters related to subjects.
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Text,
  HStack,
  Flex,
  useTheme,
  Stack,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  fetchAllChaptersApi,
  fetchAllTopicsApi,
} from "../../../../api/inspexternalapis";
import VectorImage from "../../../../assets/images/Line/Vector.svg";
import SubjectCard from "../../../../components/Card/SubjectCard";
import TopicCard from "../../../../components/Card/TopicCard";

const ChaptersTopicPage = () => {
  const { chapterName } = useParams();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const { outerBackground, innerBackground } = useTheme().colors.pallete;

  useEffect(() => {
    async function fetchChapters() {
      try {
        const response = await fetchAllChaptersApi();
        if (response.status) {
          setChapters(response.result);
          setSelectedChapterId(
            response?.result.find((item) => item.name === chapterName)?.id
          );
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    }

    fetchChapters();
  }, []);

  const handleChapterClick = (chapter) => {
    setSelectedChapterId(chapter?.id);
  };

  useEffect(() => {
    if (selectedChapterId !== null) {
      async function fetchTopics() {
        try {
          const response = await fetchAllTopicsApi(selectedChapterId);

          if (response.status) {
            const allTopics = response.result;
            filterTopics(allTopics);
          }
        } catch (error) {
          console.error("Error fetching topics:", error);
        }
      }

      fetchTopics();
    }
  }, [selectedChapterId, searchTerm]);

  const filterTopics = (allTopics) => {
    const filtered = allTopics.filter((topic) =>
      topic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTopics(filtered);
  };

  const handleView = (topic) => {
    navigate(`/topic/lecture/${topic?.id}/${topic?.name}/details`, {
      state: {
        topics: filteredTopics,
        selectedChapterName: selectedChapterId
          ? chapters.find((chapter) => chapter.id === selectedChapterId)?.name
          : "Select a Chapter",
      },
    });
  };

  return (
    <Box w={"100%"}>
      <Box bg={outerBackground} borderRadius={"26px"}>
        <Box pt={5} marginLeft={"33px"}>
          <HStack spacing={"10px"} alignItems="center">
            <Box
              width={"12px"}
              height={"25px"}
              borderRadius={"20px"}
              bg={"#3C8DBC"}
            ></Box>
            <Text fontSize={"19px"} lineHeight={"24px"}>
              Physics
            </Text>
          </HStack>
        </Box>

        <Flex m={"24px"} gap={10} overflowX="auto" className="example">
          {chapters.map((chapter, index) => (
            <SubjectCard
              width={"30%"}
              chapter={chapter}
              index={index}
              handleViewDetails={handleChapterClick}
            />
          ))}
        </Flex>
      </Box>

      {selectedChapterId ? (
        <Stack bg={outerBackground} borderRadius={"26px"} p={"30px"}>
          <Flex mb={"20px"} justifyContent={"space-between"}>
            <HStack spacing={"10px"} alignItems="center">
              <Box
                width={"12px"}
                height={"25px"}
                borderRadius={"20px"}
                bg={"#3C8DBC"}
              ></Box>
              <Text fontSize={"19px"} lineHeight={"24px"}>
                {selectedChapterId
                  ? chapters.find((chapter) => chapter.id === selectedChapterId)
                      ?.name
                  : "Select a Chapter"}
              </Text>
            </HStack>
            <Input
              type="text"
              value={searchTerm}
              bg={innerBackground}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              w="30%"
              border="1px solid #ccc"
              borderRadius="14px"
              px="3"
              fontWeight={400}
              py="2"
              style={{
                backgroundImage: `url(${VectorImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "10px center",
                paddingLeft: "40px",
              }}
            />
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={"6"}>
            {filteredTopics.map((topic) => (
              <TopicCard width={"100%"} topic={topic} handleView={handleView} />
            ))}
          </SimpleGrid>
        </Stack>
      ) : (
        <Box width={"100%"} bg={outerBackground} borderRadius={"26px"}>
          <Flex
            align="center"
            justify="center"
            direction="column"
            height="300px"
            color="gray.500"
          >
            <Text fontSize="18px">Please select a chapter !!</Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default ChaptersTopicPage;

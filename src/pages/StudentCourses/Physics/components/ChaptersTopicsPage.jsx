//This component will show all the chapters related to subjects.
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  HStack,
  Card,
  Flex,
  Button,
  Spacer,
  useTheme,
  Stack,
  Input,
} from "@chakra-ui/react";
import {
  fetchAllChaptersApi,
  fetchAllTopicsApi,
} from "../../../../api/inspexternalapis";
import { capitalize } from "../../../../utils";
import VectorImage from "../../../../assets/images/Line/Vector.svg";
import topicDescriptionConstants from "../../../../constants/topicDescriptionConstants";

const ChaptersTopicPage = () => {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [loadingChapters, setLoadingChapters] = useState(true);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  const dummyDescriptions = [
    "This chapter covers the basics of electromagnetism, including its principles and applications. Gain insights into the behavior of electric and magnetic fields.",
    "Learn about geometrical and wave optics in this chapter. Explore the fascinating world of light propagation and wave phenomena.",
    "Explore the fundamental principles of heat transfer and thermodynamics. Dive into the study of energy transfer and the laws governing thermal processes.",
    "Get a deep understanding of mechanics in this chapter. Study the motion, forces, and interactions of objects in the physical world.",
    "Discover modern physics in this comprehensive chapter. Uncover the latest advancements and theories shaping our understanding of the physical universe.",
  ];

  useEffect(() => {
    async function fetchChapters() {
      try {
        const response = await fetchAllChaptersApi();

        if (response.status) {
          setChapters(response.result);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chapters:", error);
        setLoading(false);
      }
    }

    fetchChapters();
  }, []);

  const handleChapterClick = (chapterId) => {
    const selectedChapter = chapters.find(
      (chapter) => chapter.id === chapterId
    );
    setSelectedChapterId(chapterId);
    setLoadingTopics(true);
    console.log(
      `Chapter clicked with ID: ${chapterId}, Name: ${selectedChapter?.name}`
    );
  };

  useEffect(() => {
    if (selectedChapterId !== null) {
      async function fetchTopics() {
        try {
          const response = await fetchAllTopicsApi(selectedChapterId);

          if (response.status) {
            const allTopics = response.result;
            setTopics(allTopics);
            filterTopics(allTopics);
            console.log("Topics fetched successfully:", allTopics);
          }
        } catch (error) {
          console.error("Error fetching topics:", error);
        } finally {
          setLoadingTopics(false);
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
  const handleView = () => {
    navigate("/topic/lecture/details", {
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
            <Card
              key={chapter.id}
              w={"31%"}
              h={"204px"}
              bg={innerBackground}
              boxShadow={innerBoxShadow}
              borderRadius={"18px"}
              flexShrink={"0"}
              mb={"20px"}
              display="flex"
              flexDirection="column"
            >
              <Text
                fontSize={"16px"}
                fontWeight={400}
                ml={"13px"}
                mt={"16px"}
                lineHeight={"19px"}
                noOfLines={1}
              >
                {capitalize(chapter?.name)}
              </Text>
              <Text
                fontWeight={400}
                fontSize={"12px"}
                lineHeight={"15px"}
                ml={"13px"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
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
                fontSize={"12px"}
                lineHeight={"21px"}
                fontWeight={400}
                ml={13}
                color={"rgba(44, 51, 41, 0.47)"}
                noOfLines={3}
              >
                {dummyDescriptions[index]}
              </Text>
              <Spacer />

              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontSize={"14px"}
                lineHeight={"16px"}
                fontWeight={600}
                _hover={{ bg: "white" }}
                onClick={() => handleChapterClick(chapter.id)}
                mt={"auto"}
              >
                View Details
              </Button>
            </Card>
          ))}
        </Flex>
      </Box>

      {selectedChapterId ? (
        <Stack bg={outerBackground} borderRadius={"26px"} mt={"24px"}>
          <Flex mt={"17px"}>
            <HStack spacing={"10px"} alignItems="center" ml={"33px"}>
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
            <Spacer />
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
              mx={"10"}
              style={{
                backgroundImage: `url(${VectorImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "10px center",
                paddingLeft: "40px",
              }}
            />
          </Flex>
          <Flex m={"24px"} gap={"24px"} flexWrap={"wrap"}>
            {filteredTopics.map((topic) => (
              <Card
                key={topic.id}
                w={"30%"}
                bg={innerBackground}
                boxShadow={innerBoxShadow}
                borderRadius={"18px"}
                flexShrink={"0"}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Text
                  fontSize={"15px"}
                  ml={"13px"}
                  mt={"16px"}
                  lineHeight={"19px"}
                  noOfLines={1}
                >
                  {capitalize(topic?.name)}
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
                  fontWeight={400}
                  ml={13}
                  noOfLines={"3"}
                  color={"rgba(44, 51, 41, 0.47)"}
                >
                  {topicDescriptionConstants[topic.id]}
                </Text>

                <Button
                  variant={"ghost"}
                  color={"#3C8DBC"}
                  fontWeight={"600"}
                  size={"14px"}
                  lineHeight={"16px"}
                  m={"20px"}
                  _hover={{ bg: "white" }}
                  onClick={handleView}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </Flex>
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

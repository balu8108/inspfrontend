import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Input,
  Spacer,
  SimpleGrid,
  Button,
  Card,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { fetchAllTopicsWithoutChapterIdApi } from "../../../../api/inspexternalapis/index";
import topicDescriptionConstants from "../../../../constants/topicDescriptionConstants";
import VectorImage from "../../../../assets/images/Line/Vector.svg";
import { boxShadowStyles, capitalize } from "../../../../utils";
const AllUploadedLecture = () => {
  const [allTopicList, setAllTopicList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTopics, setFilteredTopics] = useState([]); // Add filteredTopics state
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter topics based on the search query
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
    <Box
      w={"full"}
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      h={"full"}
      mt={"24px"}
      borderRadius={"26px"}
      bg="white"
    >
      <Flex>
        <HStack spacing={"10px"} ml="27px">
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

        <Spacer />

        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          w="30%"
          border="1px solid #ccc"
          borderRadius="md"
          px="3"
          py="2"
          mx={12}
          my={"17"}
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
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={"6"}
          p={4}
          mr={"20px"}
        >
          {(searchQuery ? filteredTopics : allTopicList).map((chapter) => (
            <Card
              w={"100%"}
              h={"204px"}
              key={chapter.id}
              bg={"#F1F5F8"}
              blendMode={"multiply"}
              borderRadius={"26px"}
              p={4}
              ml={"2"}
            >
              <Text fontSize="16px" noOfLines={1}>
                {capitalize(chapter?.name)}
              </Text>
              <Text fontSize="12px" color={"#2C332978"}>
                {chapter.instructorName} No Data
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
              <Box mb={"-15px"}>
                <Link
                  to={`/mentor/view/rating&feedback/${chapter.id}/${chapter.name}`}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button variant={"ghost"} color={"#3C8DBC"}>
                    View Details
                  </Button>
                </Link>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default AllUploadedLecture;

//This component will show all the chapters related to subjects.
import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Flex,
  Stack,
  Spinner,
  Center,
  Input,
  useTheme,
  SimpleGrid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { fetchAllChaptersApi } from "../../../../api/inspexternalapis";
import VectorImage from "../../../../assets/images/Line/Vector.svg";
import SubjectCard from "../../../../components/Card/SubjectCard";

const SubjectChapterSelector = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { outerBackground, innerBackground } = useTheme().colors.pallete;
  const navigate = useNavigate();

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

  const filteredTopics = chapters.filter((physScreen) =>
    physScreen.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (chapter) => {
    navigate(`/chapter-details/${chapter?.name}`);
  };

  return (
    <Box
      width={"full"}
      h={"100%"}
      bg={outerBackground}
      borderRadius={"26px"}
      p={"30px"}
    >
      <Flex mb={"20px"} justifyContent={"space-between"}>
        <HStack spacing={"10px"} alignItems="center">
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"}>
            My Courses (Physics)
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
      {loading ? (
        <Center>
          <Spinner size={"md"} />
        </Center>
      ) : (
        <Stack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={"6"}>
            {filteredTopics.map((chapter, index) => (
              <SubjectCard
                width={"100%"}
                chapter={chapter}
                index={index}
                handleViewDetails={handleViewDetails}
              />
            ))}
          </SimpleGrid>
        </Stack>
      )}
    </Box>
  );
};

export default SubjectChapterSelector;

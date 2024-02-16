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
  Stack,
  Spinner,
  Center,
  Spacer,
  Input,
  useTheme,
} from "@chakra-ui/react";
import { fetchAllChaptersApi } from "../../../../api/inspexternalapis";
import { capitalize } from "../../../../utils";
import VectorImage from "../../../../assets/images/Line/Vector.svg";

const PhysDetails = () => {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredTopics = chapters.filter((physScreen) =>
    physScreen.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = () => {
    navigate("/chapter-details");
  };
  return (
    <Box width={"full"} h={"100%"} bg={outerBackground} borderRadius={"26px"}>
      <Flex mt={"17px"}>
        <HStack spacing={"10px"} alignItems="center" ml={"33px"}>
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

      {loading ? (
        <Center>
          <Spinner size={"md"} />
        </Center>
      ) : (
        <Stack>
          <Flex flexWrap="wrap" p={6} gap={"24px"}>
            {filteredTopics.map((chapter, index) => (
              <Card
                bg={innerBackground}
                boxShadow={innerBoxShadow}
                key={chapter.id}
                w="30%"
                h={"204px"}
                borderRadius={"18px"}
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
                  noOfLines={2}
                >
                  {dummyDescriptions[index]}
                </Text>

                <Button
                  variant={"ghost"}
                  color={"#3C8DBC"}
                  size={"14px"}
                  lineHeight={"16px"}
                  p={6}
                  mt={"5"}
                  _hover={{ bg: "white" }}
                  onClick={handleViewDetails}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </Flex>
        </Stack>
      )}
    </Box>
  );
};

export default PhysDetails;

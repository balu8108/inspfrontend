import React, { useEffect, useState } from "react";
import { Box, Button, Card, Text, HStack, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { fetchAllChaptersApi } from "../../../../../api/inspexternalapis/index";
const PhysicsCourse = () => {
  const [chapters, setChapters] = useState([]);

  const dummyDescriptions = [
    "This chapter covers the basics of electromagnetism, including its principles and applications.",
    "Learn about geometrical and wave optics in this chapter.",
    "Explore the fundamental principles of heat transfer and thermodynamics.",
    "Get a deep understanding of mechanics in this chapter.",
    "Discover modern physics in this comprehensive chapter.",
  ];
  useEffect(() => {
    async function fetchChapters() {
      try {
        const response = await fetchAllChaptersApi();

        if (response.status) {
          setChapters(response.result);
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    }

    fetchChapters();
  }, []);

  return (
    <Box bg={"#F1F5F8"} w={"full"} h={"full"} borderRadius={"26px"}>
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"27px"}
          ml={"27px"}
        ></Box>
        <Text fontSize={"20px"} lineHeight={"24px"} mt={"26px"}>
          My Courses (Physics)
        </Text>
      </HStack>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={"24px"}
        m={"20px"}
      >
        {chapters.map((chapter, index) => (
          <Card
            key={chapter.id}
            w={"100%"}
            h={"204px"}
            blendMode={"multiply"}
            bg={"#F1F5F8"}
            borderRadius={"18px"}
            mb={"18px"}
          >
            <Text fontSize={"15px"} ml={"13px"} mt={"16px"} lineHeight={"19px"}>
              {chapter.name}
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
              noOfLines={"2"}
              color={"rgba(44, 51, 41, 0.47)"}
            >
              {dummyDescriptions[index]}
            </Text>
            <Link
              to={`/mentor/${chapter.id}/topics/${encodeURIComponent(
                chapter.name
              )}`}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600"}
                size={"14px"}
                lineHeight={"16px"}
                mt={"40px"}
              >
                View Details
              </Button>
            </Link>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
export default PhysicsCourse;

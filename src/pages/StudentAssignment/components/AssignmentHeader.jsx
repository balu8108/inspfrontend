// this is the assignment header .It is created separately ..
import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Card,
  Flex,
  HStack,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { fetchAllSubjectsApi } from "../../../api/inspexternalapis";
import { Link } from "react-router-dom";

const AssignmentHeader = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch subjects when the component mounts
    async function fetchSubjects() {
      try {
        const response = await fetchAllSubjectsApi(); // Call your API function

        if (response.status) {
          // Add missing subjects (Chemistry and Mathematics) if not present in the API response
          const subjectsFromAPI = response.result;
          const missingSubjects = [
            {
              id: 4,
              name: "CHEMISTRY",
              status: "Upcoming",
              description:
                "Explore the world of chemical reactions, elements, and compounds in this foundational science subject. Learn about the periodic table, bonding, and the fascinating properties of matter.",
            },
            {
              id: 5,
              name: "MATHEMATICS",
              status: "Upcoming",
              description:
                " Delve into the world of numbers, equations, and mathematical concepts. From algebra to calculus, discover the fundamental principles that underlie a wide range of scientific and practical applications.",
            },
          ];

          // Merge the missing subjects with the subjects from the API
          const mergedSubjects = [...subjectsFromAPI, ...missingSubjects];

          setSubjects(mergedSubjects); // Update the state with fetched and missing data
        }
      } catch (error) {
        console.error("Error fetching subjectss:", error);
      } finally {
        // Set loading to false after fetching, whether it was successful or not
        setLoading(false);
      }
    }

    fetchSubjects();
  }, []);

  return (
    <Box bg={"#F1F5F8"} borderRadius={"25px"} w={"100%"}>
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
          My Courses
        </Text>
      </HStack>

      {loading ? ( // Display spinner while loading
        <Center>
          <Spinner mt={"5%"} />
        </Center>
      ) : (
        <Flex mt={"24px"}>
          {subjects.map((subject) => (
            <Card
              w={"30%"}
              h={"200px"}
              borderRadius={"18px"}
              bg={"#F1F5F8"}
              ml={"20px"}
              mb={"20px"}
              mr={"20px"}
              blendMode={"multiply"}
              key={subject.id}
            >
              <Text
                fontSize={"16px"}
                fontWeight={"400"}
                lineHeight={"18px"}
                color={"#2C3329"}
                ml={"13px"}
                mt={"13px"}
              >
                {subject.name}
              </Text>
              <Text
                fontSize={"12px"}
                color={subject.status == "Completed" ? "#3DE302" : "#2C332978"}
                lineHeight={"18px"}
                ml={"13px"}
              >
                {subject.status || "In Progress"}
              </Text>
              <Text
                fontSize={"12px"}
                lineHeight={"14px"}
                fontWeight={"400px"}
                color={"#2C3329"}
                mt={"14px"}
                ml={"14px"}
              >
                Description
              </Text>
              <Text
                fontSize={"11px"}
                lineHeight={"21px"}
                fontWeight={"400px"}
                ml={"13px"}
                mt={"6px"}
                color={"rgba(44, 51, 41, 0.47)"}
                noOfLines={3}
              >
                {subject.description ||
                  "Physics is the study of the fundamental principles that govern the behavior of the physical universe. It encompasses a wide range of topics, including classical mechanics, electromagnetism, thermodynamics, and quantum mechanics."}
              </Text>
              <Link
                style={{ display: "flex", justifyContent: "center" }}
                to={`/student/assignments/${subject.name}`}
              >
                <Button
                  variant={"ghost"}
                  color={"#3C8DBC"}
                  fontWeight={"600"}
                  size={"12px"}
                  fontSize={"14px"}
                  lineHeight={"16px"}
                  p={["10px", "21px"]}
                >
                  View Details
                </Button>
              </Link>
            </Card>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default AssignmentHeader;

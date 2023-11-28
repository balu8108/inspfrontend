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
import { boxShadowStyles, capitalize } from "../../../utils";

const AssignmentHeader = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyDescriptions = [
    " Explore the world of chemical reactions, elements, and compounds in this foundational science subject. Learn about the periodic table, bonding, and the fascinating properties of matter.",
    "  Delve into the world of numbers, equations, and mathematical concepts. From algebra to calculus, discover the fundamental principles that underlie a wide range of scientific and practical applications.",
    " Physics is the study of the fundamental principles that govern the behavior of the physical universe. It encompasses a wide range of topics, including classical mechanics, electromagnetism, thermodynamics, and quantum mechanics.",
  ];
  const subjectStatus = ["Upcoming", "Upcoming", "In Progress"];

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await fetchAllSubjectsApi();

        if (response.status) {
          const subjectsFromAPI = response.result;
          const sortedSubjects = subjectsFromAPI.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          const reversedSubjects = sortedSubjects.reverse();

          setSubjects(reversedSubjects);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSubjects();
  }, []);

  return (
    <Box
      bg={"white"}
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      borderRadius={"25px"}
      w={"100%"}
    >
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
                {capitalize(subject?.name)}
              </Text>
              <Text
                mt={"3px"}
                fontSize={"14px"}
                color={
                  subjectStatus[3 - subject.id] === "In Progress"
                    ? "#3DE302"
                    : "#2C332978"
                }
                lineHeight={"18px"}
                ml={"13px"}
              >
                {subjectStatus[3 - subject.id] || "Status not found"}
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
                {dummyDescriptions[3 - subject.id] || "Description not found"}
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

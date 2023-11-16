import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  HStack,
  Text,
  Card,
  Flex,
  Button,
  Spinner,
  Center,
} from "@chakra-ui/react";
import headerData from "../data/headerData";
import { fetchAllSubjectsApi } from "../../../api/inspexternalapis";
import { boxShadowStyles, capitalize } from "../../../utils";
const Header = () => {
  const [subjects, setSubjects] = useState([]);
  // const dummydescription=[
  //   "  Physics is the study of the fundamental principles that govern the behavior of the physical universe. It encompasses a wide range of topics, including classical mechanics, electromagnetism, thermodynamics, and quantum mechanics.",
  //   "Explore the world of chemical reactions, elements, and compounds in this foundational science subject. Learn about the periodic table, bonding, and the fascinating properties of matter.",
  //   " Delve into the world of numbers, equations, and mathematical concepts. From algebra to calculus, discover the fundamental principles that underlie a wide range of scientific and practical applications.",
  // ]

  // useEffect(() => {
  //   // Fetch subjects when the component mounts
  //   async function fetchSubjects() {
  //     try {
  //       const response = await fetchAllSubjectsApi(); // Call your API function

  //       if (response.status) {
  //         const filteredSubjects = response.result.filter(
  //           (subject) =>
  //             subject.name !== "Chemistry" && subject.name !== "Mathematics"
  //         );
  //         setSubjects(filteredSubjects);
  //         // setSubjects(response.result); // Update the state with fetched data
  //       }
  //     } catch (error) {
  //       console.error("Error fetching subjects:", error);
  //     }
  //   }

  //   fetchSubjects();
  // }, []); // Empty dependency array ensures this effect runs once when the component mounts

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
        console.error("Error fetching subjects:", error);
      } finally {
        // Set loading to false after fetching, whether it was successful or not
        setLoading(false);
      }
    }

    fetchSubjects();
  }, []);

  return (
    <Box
      w={"100%"}
      bg={"white"}
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      borderRadius={"2xl"}
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
        <Text
          fontSize={"20px"}
          lineHeight={"24px"}
          fontFamily={400}
          mt={"26px"}
        >
          My Courses
        </Text>
      </HStack>
      {loading ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : (
        <Flex p={5} gap={"24px"} mt={"10px"}>
          {subjects.map((headerDetails) => (
            <Card
              key={headerDetails.id}
              w={"30%"}
              borderRadius={"18px"}
              bg={"#F1F5F8"}
              ml={"10px"}
              blendMode={"multiply"}
            >
              <Text
                fontSize={"16px"}
                fontWeight={"400"}
                lineHeight={"18px"}
                color={"#2C3329"}
                ml={"13px"}
                mt={"13px"}
              >
                {headerDetails.name}
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
                noOfLines={3}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                {headerDetails.description ||
                  "Physics is the study of the fundamental principles that govern the behavior of the physical universe. It encompasses a wide range of topics, including classical mechanics, electromagnetism, thermodynamics, and quantum mechanics."}
              </Text>
              <Link to={`/myCourses/${headerDetails.name}`}>
                <Button
                  variant={"ghost"}
                  color={"#3C8DBC"}
                  fontWeight={"600"}
                  size={"12px"}
                  fontSize={"14px"}
                  lineHeight={"16px"}
                  p={5}
                  ml={"50px"}
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
export default Header;

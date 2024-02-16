//This is the header used in most of screen it will display subjects-PHYSICS,CHEMISTRY,MATHEMATICS.
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
  useTheme,
} from "@chakra-ui/react";
import { fetchAllSubjectsApi } from "../../../../api/inspexternalapis/index";
import { Link } from "react-router-dom";
import { capitalize } from "../../../../utils";

const Header = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  const dummyDescriptions = [
    "Lorem ipsum dolor sit amet consectetur. Id egestas egestas ut amet arcu. Ultrices sit odio at sapien mauris amet pretium arcu. Lorem ipsum dolor sit amet consectetur. Id egestas egestas ut amet arcu. Ultrices sit odio at sapien mauris amet pretium arcu. ",
    " Explore the world of chemical reactions, elements, and compounds in this foundational science subject. Learn about the periodic table, bonding, and the fascinating properties of matter.",
    "  Delve into the world of numbers, equations, and mathematical concepts. From algebra to calculus, discover the fundamental principles that underlie a wide range of scientific and practical applications.",
    " Physics is the study of the fundamental principles that govern the behavior of the physical universe. It encompasses a wide range of topics, including classical mechanics, electromagnetism, thermodynamics, and quantum mechanics.",
  ];

  const subjectStatus = ["In Progress", "Upcoming", "Upcoming", "In Progress"];

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

          const updatedSubjects = reversedSubjects.map((item) => {
            return {
              id: item.id,
              name: item.name,
              value: item.name,
            };
          });

          // adding a crash course in array of data

          setSubjects([
            {
              id: "4",
              name: "INSP Champ Crash Course",
              value: "crash-course",
            },
            ...updatedSubjects,
          ]);
          console.log({ reversedSubjects });
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
    <Box borderRadius={"25px"} w={"100%"} bg={outerBackground}>
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

      {loading ? (
        <Center>
          <Spinner mt={"5%"} />
        </Center>
      ) : (
        <Flex mt={"24px"} overflowY={"auto"}>
          {subjects.map((subject) => (
            <Card
              minW={"265px"}
              h={"200px"}
              borderRadius={"16px"}
              bg={innerBackground}
              ml={"20px"}
              mb={"20px"}
              mr={"20px"}
              key={subject.id}
              boxShadow={innerBoxShadow}
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
                fontSize={"12px"}
                color={
                  subjectStatus[4 - subject.id] === "In Progress"
                    ? "#3DE302"
                    : "#2C332978"
                }
                lineHeight={"18px"}
                ml={"13px"}
              >
                {subjectStatus[4 - subject.id] || "Status not found"}
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
                {dummyDescriptions[4 - subject.id] || "Description not found"}
              </Text>
              <Link
                to={`/myCourses/${subject.value}`}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant={"ghost"}
                  color={"#3C8DBC"}
                  fontWeight={"600"}
                  size={"12px"}
                  fontSize={"14px"}
                  lineHeight={"16px"}
                  mt={"20px"}
                  _hover={{ bg: "white" }}
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

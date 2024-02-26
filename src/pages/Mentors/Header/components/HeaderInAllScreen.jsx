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
import "../../../../constants/scrollbar/style.css";
import Scrollbars from "rc-scrollbars";
import SimpleBar from "simplebar-react";
const Header = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  const dummyDescriptions = [
    "Embark on a transformative learning journey with our Insp_Champ_Crash Course. Designed for those seeking an accelerated and focused learning experience, this crash course is your gateway to mastering key concepts in a short span of time.",
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
        <Scrollbars
          style={{ height: "45vh" }}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          universal={true}
        >
          <Flex mx={"5"} gap={"24px"}>
            {subjects.map((subject) => (
              <Card
                minW={"31%"}
                h={"204px"}
                borderRadius={"16px"}
                bg={innerBackground}
                key={subject.id}
                boxShadow={innerBoxShadow}
                my={5}
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

                <Box mt="auto">
                  <Link to={`/myCourses/${subject.value}`}>
                    <Button
                      variant={"ghost"}
                      color={"#3C8DBC"}
                      fontWeight={"600"}
                      fontSize={"14px"}
                      lineHeight={"16px"}
                      _hover={{ bg: "white" }}
                      width="100%"
                    >
                      View Details
                    </Button>
                  </Link>
                </Box>
              </Card>
            ))}
          </Flex>
        </Scrollbars>
      )}
    </Box>
  );
};

export default Header;

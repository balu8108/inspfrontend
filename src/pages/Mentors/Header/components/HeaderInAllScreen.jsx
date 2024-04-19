//This is the header used in most of screen it will display subjects-PHYSICS,CHEMISTRY,MATHEMATICS.
import React from "react";
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
import { Link } from "react-router-dom";
import { capitalize } from "../../../../utils";
import "../../../../constants/scrollbar/style.css";
import { useSelector } from "react-redux";
const Header = () => {
  const { subjects } = useSelector((state) => state.generic);
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;
  const dummyDescriptions = [
    "Unlock your Olympiad potential with our curated solo video series, tailored for INPHO and other prestigious competitions. Dive deep into physics concepts, problem-solving, and exam strategies to propel your journey towards excellence. Embark on a path of mastery and prepare to shine on the international stage.",
    "Prepare for the Olympiad journey with our Foundation Course, meticulously designed to ignite curiosity and foster problem-solving skills. Dive into advanced topics and lay a strong foundation for competitive examinations.",
    "Explore the advanced topics of Class 12th curriculum, delving deeper into the realms of physics, chemistry, and mathematics. Engage with complex concepts, tackle challenging problems, and prepare yourself for academic excellence.",
    "Dive into the core concepts of Class 11th curriculum, designed to provide a solid foundation in physics, chemistry, and mathematics. Explore fundamental principles, solve intriguing problems, and embark on a journey of discovery.",

    "Embark on a transformative learning journey with our Insp_Champ_Crash Course. Designed for those seeking an accelerated and focused learning experience, this crash course is your gateway to mastering key concepts in a short span of time.",
    " Explore the world of chemical reactions, elements, and compounds in this foundational science subject. Learn about the periodic table, bonding, and the fascinating properties of matter.",
    "  Delve into the world of numbers, equations, and mathematical concepts. From algebra to calculus, discover the fundamental principles that underlie a wide range of scientific and practical applications.",
    " Physics is the study of the fundamental principles that govern the behavior of the physical universe. It encompasses a wide range of topics, including classical mechanics, electromagnetism, thermodynamics, and quantum mechanics.",
  ];

  const subjectStatus = [
    "In Progress",
    "In Progress",
    "In Progress",
    "In Progress",
    "In Progress",
    "Upcoming",
    "Upcoming",
    "In Progress",
  ];

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

      {subjects.length === 0 ? (
        <Center>
          <Spinner mt={"5%"} />
        </Center>
      ) : (
        <Flex mx={"5"} gap={"24px"} overflowX={"auto"} className="example">
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
                  subjectStatus[8 - subject.id] === "In Progress"
                    ? "#3DE302"
                    : "#2C332978"
                }
                lineHeight={"18px"}
                ml={"13px"}
              >
                {subjectStatus[8 - subject.id] || "Status not found"}
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
                {dummyDescriptions[8 - subject.id] || "Description not found"}
              </Text>

              <Link
                to={`/my-courses/${subject.value}`}
                style={{ margin: "auto" }}
              >
                <Button
                  variant={"ghost"}
                  color={"#3C8DBC"}
                  fontWeight={"600"}
                  fontSize={"14px"}
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

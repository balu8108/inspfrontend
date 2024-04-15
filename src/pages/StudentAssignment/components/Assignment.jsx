//This component is for showing assignment  for the subjects.
import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Card,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Center,
  Image,
  VStack,
  useTheme,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { capitalize } from "../../../utils";
import { useParams } from "react-router";
import ChemistryImage from "../../../assets/images/undraw_science_re_mnnr 1.svg";
import MathematicsImage from "../../../assets/images/undraw_mathematics_-4-otb 1.svg";
import { getAssignmentBySubjectNameApi } from "../../../api/assignments";
import SingleFileComponent from "../../../components/filebox/SingleFileComponent";

const AssignmentDetails = () => {
  const [assignmentData, setAssignmentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { subjectName } = useParams();
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  const filteredData = Array.isArray(assignmentData)
    ? assignmentData.filter((assignment) => {
        const topicName = assignment.topicName.toLowerCase();
        const search = searchQuery.toLowerCase();
        return topicName.includes(search);
      })
    : [];

  useEffect(() => {
    const fetchAssignmentBySubject = async (subjectName) => {
      try {
        const response = await getAssignmentBySubjectNameApi(subjectName);
        if (response?.status === 200) {
          setAssignmentData(response?.data);
        }
      } catch (err) {}
    };

    fetchAssignmentBySubject(subjectName);
  }, [subjectName]);

  return (
    <Box width={"full"} bg={outerBackground} borderRadius={"26px"} p={6}>
      <HStack spacing={"10px"} alignItems="center">
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"20px"} lineHeight={"24px"}>
          Assignments ({capitalize(subjectName)})
        </Text>

        <Spacer />
        <InputGroup w="30%" mx={12} my={17}>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            borderRadius="14PX"
            bg={innerBackground}
          />
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch />
          </InputLeftElement>
        </InputGroup>
      </HStack>
      {filteredData.length > 0 ? (
        <Box pt={10}>
          <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={4}>
            {filteredData.map((assignment) => (
              <Card
                w="100%"
                bg={innerBackground}
                boxShadow={innerBoxShadow}
                borderRadius={"18px"}
                p={6}
                key={assignment.id}
              >
                <Text fontSize={"15px"} lineHeight={"18px"}>
                  {capitalize(assignment?.topicName)}
                </Text>
                <Text
                  fontWeight={400}
                  fontSize={"12px"}
                  lineHeight={"14px"}
                  color={"#2C332978"}
                >
                  {assignment.instructorName}
                </Text>
                <Text
                  fontSize={"12px"}
                  lineHeight={"13px"}
                  fontWeight={400}
                  color={"rgba(44, 51, 41, 1)"}
                  mt={4}
                >
                  Description
                </Text>
                <Text
                  fontSize={"12px"}
                  lineHeight={"21px"}
                  fontWeight={400}
                  color={"#2C332978"}
                  noOfLines={2}
                >
                  {assignment.description}
                </Text>
                <Box flex={1} display="flex" flexWrap={"wrap"} gap={4} mt={4}>
                  {assignment?.AssignmentFiles.map((file, index) => (
                    <SingleFileComponent
                      key={file?.id}
                      file={file}
                      type="assignment"
                    />
                  ))}
                </Box>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      ) : (
        <Box>
          {subjectName === "CHEMISTRY" && (
            <Center>
              <VStack my={6}>
                <Image
                  boxSize="200px"
                  objectFit="cover"
                  src={ChemistryImage}
                  alt="Chemistry"
                />
                <Text
                  fontSize={"25px"}
                  fontWeight={"500"}
                  lineHeight={"37px"}
                  color={"#2C3329"}
                >
                  Coming Soon
                </Text>
              </VStack>
            </Center>
          )}

          {subjectName === "MATHEMATICS" && (
            <Center>
              <VStack my={6}>
                <Image
                  boxSize="200px"
                  objectFit="cover"
                  src={MathematicsImage}
                  alt="MATHEMATICS"
                />
                <Text
                  fontSize={"25px"}
                  fontWeight={"500"}
                  lineHeight={"37px"}
                  color={"#2C3329"}
                >
                  Coming Soon
                </Text>
              </VStack>
            </Center>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AssignmentDetails;

// this is the screen where all the assignmemts will apppear for the topics..
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
  useTheme,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { capitalize } from "../../../../utils";
import { getAssignmentWithFilesApi } from "../../../../api/assignments";
import SingleFileComponent from "../../../../components/filebox/SingleFileComponent";
const AllUploadedLecture = () => {
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.topicName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchAssignmentWithFiles = async () => {
      try {
        const response = await getAssignmentWithFilesApi();
        if (response?.status === 200) {
          setAssignments(response?.data);
        }
      } catch (err) {}
    };

    fetchAssignmentWithFiles();
  }, []);

  return (
    <Box
      width={"100%"}
      h={"100%"}
      borderRadius={"26px"}
      p={6}
      bg={outerBackground}
    >
      <HStack spacing={"10px"} alignItems="center">
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"20px"} lineHeight={"24px"}>
          My Uploads
        </Text>

        <Spacer />
        <InputGroup w="30%">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            borderRadius="14PX"
            bg={innerBackground}
          />
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
      </HStack>
      <Box pt={10}>
        <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={4}>
          {filteredAssignments.map((assignmentScreen) => (
            <Card
              w="100%"
              bg={innerBackground}
              p={6}
              boxShadow={innerBoxShadow}
              borderRadius={"18px"}
              key={assignmentScreen.id}
            >
              <Text fontSize={"15px"} lineHeight={"18px"}>
                {capitalize(assignmentScreen?.topicName)}
              </Text>
              <Text
                fontWeight={400}
                fontSize={"12px"}
                lineHeight={"14px"}
                color={"#2C332978"}
              >
                {assignmentScreen.instructorName}
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
                {assignmentScreen.description}
              </Text>
              <Box flex={1} display="flex" flexWrap={"wrap"} gap={4} mt={4}>
                {assignmentScreen?.AssignmentFiles?.map((file, index) => (
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
    </Box>
  );
};

export default AllUploadedLecture;

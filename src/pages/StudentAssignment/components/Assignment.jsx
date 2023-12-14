import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Card,
  Flex,
  Button,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Center,
  Image,
  VStack,
  useTheme,
  Tooltip,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import axios from "axios";
import { BASE_URL } from "../../../constants/staticurls";
import {
  boxShadowStyles,
  capitalize,
  extractFileNameFromS3URL,
} from "../../../utils";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { setIsDocModalOpen } from "../../../store/actions/genericActions";
import ChemistryImage from "../../../assets/images/undraw_science_re_mnnr 1.svg";
import MathematicsImage from "../../../assets/images/undraw_mathematics_-4-otb 1.svg";
import { getAssignmentBySubjectNameApi } from "../../../api/assignments";

const AssignmentDetails = () => {
  const [assignmentData, setAssignmentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { subjectName } = useParams();
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;
  const dispatch = useDispatch();

  const filteredData = Array.isArray(assignmentData)
    ? assignmentData.filter((assignment) => {
        const topicName = assignment.topicName.toLowerCase();
        const search = searchQuery.toLowerCase();
        return topicName.includes(search);
      })
    : [];

  useEffect(() => {
    // axios
    //   .get(BASE_URL + `/topic/get-assignment-by-subject-name/${subjectName}`)
    //   .then((response) => {
    //     setAssignmentData(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching assignments:", error);
    //   });
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
    <Box width={"full"} h={"full"} bg={outerBackground} borderRadius={"26px"}>
      <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
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
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
      </HStack>
      {filteredData.length > 0 ? (
        <SimpleGrid
          columns={{ base: 1, md: 1, lg: 1 }}
          spacing={"6"}
          p={4}
          mr={"20px"}
        >
          {filteredData.map((assignment) => (
            <Card
              w="100%"
              bg={innerBackground}
              boxShadow={innerBoxShadow}
              borderRadius={"18px"}
              key={assignment.id}
            >
              <Text
                fontSize={"15px"}
                lineHeight={"18px"}
                ml={"13px"}
                mt={"16px"}
              >
                {capitalize(assignment?.topicName)}
              </Text>
              <Text
                fontWeight={400}
                fontSize={"12px"}
                lineHeight={"14px"}
                ml={"13px"}
                mt={"3px"}
                color={"#2C332978"}
              >
                {assignment.instructorName}
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
                mt={"5px"}
                color={"#2C332978"}
                noOfLines={2}
              >
                {assignment.description}
              </Text>
              <Box
                flex={1}
                display="flex"
                flexWrap={"wrap"}
                gap={4}
                mx={"14px"}
                my={"7px"}
              >
                {assignment?.AssignmentFiles.map((files, index) => (
                  <Flex
                    key={index}
                    w={"160px"}
                    h={"49px"}
                    color={"#2C332978"}
                    border={"1px solid rgba(149, 151, 146, 0.49)"}
                   
                    alignItems={"center"}
                    bg="white"
                    mb={2}
                    borderRadius={"md"}
                    px={2}
                    py={5}
                    onClick={() =>
                      dispatch(
                        setIsDocModalOpen(
                          files?.id,
                          files?.key,
                          "assignment",
                          true
                        )
                      )
                    }
                  >
                    <Tooltip
                      label={extractFileNameFromS3URL(files.key)}
                      placement="bottom"
                      hasArrow
                      arrowSize={8}
                      fontSize={"11px"}
                    >
                      <Text
                        mt={2}
                        fontSize={"11px"}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {extractFileNameFromS3URL(files.key)}
                      </Text>
                    </Tooltip>
                  </Flex>
                ))}
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <Box mt={4}>
          {subjectName === "CHEMISTRY" && (
            <Center>
              <VStack>
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
                  p={"44px"}
                >
                  Coming Soon
                </Text>
              </VStack>
            </Center>
          )}

          {subjectName === "MATHEMATICS" && (
            <Center>
              <VStack>
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
                  p={"44px"}
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

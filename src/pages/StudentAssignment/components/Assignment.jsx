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
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
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

const AssignmentDetails = () => {
  const [assignmentData, setAssignmentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { subjectName } = useParams();
  const dispatch = useDispatch();

  const filteredData = Array.isArray(assignmentData)
    ? assignmentData.filter((assignment) => {
        const topicName = assignment.topicName.toLowerCase();
        const search = searchQuery.toLowerCase();
        return topicName.includes(search);
      })
    : [];

  useEffect(() => {
    axios
      .get(BASE_URL + `/topic/get-assignment-by-subject-name/${subjectName}`)
      .then((response) => {
        setAssignmentData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      });
  }, [subjectName]);

  return (
    <Box
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      width={"full"}
      h={"full"}
      bg={"white"}
      borderRadius={"26px"}
    >
      <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"}>
          Assignments ({capitalize(subjectName)})
        </Text>
        <Spacer />
        <InputGroup m={4} w={"220px"}>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="#000000" />
          </InputLeftElement>
          <Input
            placeholder="Search"
            w={"240px"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
              blendMode={"multiply"}
              bg={"#F1F5F8"}
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
              my={"13px"}
              mx={"13px"}
               
              >
                {assignment?.AssignmentFiles.map((files, index) => (
                  <Flex
                    key={index}
                    w={"180px"}
                    h={"49px"}
                    word-wrap={"break-word"}
                    color={"#2C332978"}
                    borderColor={"#9597927D"}
                    boxShadow={" 0px 1px 6px 0px #00000029 "}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    bg="white"
                    mb={2}
                    borderRadius={"md"}
                    px={2}
                    py={5}
                  >
                    <Text mt={2} fontSize={"11px"}>{extractFileNameFromS3URL(files.key)}</Text>
                    <Spacer />
                    <Button
                      rightIcon={<BsDownload />}
                      variant={"ghost"}
                      size="sm"
                      color={"black"}
                      ml={2}
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
                    ></Button>
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

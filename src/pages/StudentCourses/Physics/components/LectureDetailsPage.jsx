import {
  Box,
  Text,
  Card,
  useTheme,
  Button,
  Flex,
  HStack,
  Input,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { capitalize } from "../../../../utils";
import VectorImage from "../../../../assets/images/Line/Vector.svg";

import topicDescriptionConstants from "../../../../constants/topicDescriptionConstants";
import lecturesData from "../data/lectureData";

const LectureDetailsPage = () => {
  const location = useLocation();
  const topics = location.state?.topics || [];
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  const selectedChapterName =
    location.state?.selectedChapterName || "Select a Chapter";

  const lectures = selectedTopic ? lecturesData : [];
  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <Box width={"100%"}>
      <Box bg={outerBackground} borderRadius={"26px"} className="example">
        <Box pt={5} marginLeft={"33px"}>
          <HStack spacing={"10px"} alignItems="center">
            <Box
              width={"12px"}
              height={"25px"}
              borderRadius={"20px"}
              bg={"#3C8DBC"}
            ></Box>
            <Text fontSize={"19px"} lineHeight={"24px"}>
              Physics({selectedChapterName})
            </Text>
          </HStack>
        </Box>
        <Flex
          flexDirection={"row"}
          gap={23}
          overflowX={"auto"}
          className="example"
          m={"24px"}
        >
          {topics.map((topic) => (
            <Card
              key={topic.id}
              w={"30%"}
              boxShadow={innerBoxShadow}
              borderRadius={"18px"}
              flexShrink={"0"}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Text
                fontSize={"15px"}
                ml={"13px"}
                mt={"16px"}
                lineHeight={"19px"}
                noOfLines={1}
              >
                {capitalize(topic.name)}
              </Text>
              <Text
                fontWeight={400}
                fontSize={"11px"}
                lineHeight={"15px"}
                ml={"13px"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                Nitin Sachan
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
                fontSize={"11px"}
                lineHeight={"21px"}
                fontWeight={400}
                ml={13}
                noOfLines={"3"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                {topicDescriptionConstants[topic.id]}
              </Text>

              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600"}
                size={"14px"}
                lineHeight={"16px"}
                m={"20px"}
                _hover={{ bg: "white" }}
                onClick={() => handleTopicClick(topic)}
              >
                View Details
              </Button>
            </Card>
          ))}
        </Flex>
      </Box>
      {selectedTopic ? (
        <Box bg={outerBackground} borderRadius={"26px"} mt={"24px"}>
          <Flex>
            <HStack spacing={"10px"} ml="27px">
              <Box
                width={"12px"}
                height={"25px"}
                borderRadius={"20px"}
                bg={"#3C8DBC"}
              ></Box>
              <Text fontSize={"19px"} lineHeight={"24px"}>
                Topic({capitalize(selectedTopic.name)})
              </Text>
            </HStack>

            <Spacer />

            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              w="30%"
              border="1px solid #ccc"
              borderRadius="14px"
              px="3"
              bg={innerBackground}
              py="2"
              mx={12}
              my={"17"}
              style={{
                backgroundImage: `url(${VectorImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "10px center",
                paddingLeft: "40px",
              }}
            />
          </Flex>

          <Flex m={"24px"} gap={"24px"} flexWrap={"wrap"}>
            {lectures.map((lecture, index) => (
              <Card
                key={lecture.id}
                w={"30%"}
                h={"204px"}
                boxShadow={innerBoxShadow}
                borderRadius={"18px"}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                mb={index === lectures.length - 1 ? "20px" : "0"}
              >
                <Flex
                  justifyContent={"space-between"}
                 
                >
                  <Box>
                    <Text
                      fontSize={"15px"}
                      ml={"13px"}
                      lineHeight={"19px"}
                      noOfLines={1}
                      mt={"16px"}

                    >
                      {capitalize(lecture.name)}
                    </Text>
                    <Text
                      fontWeight={400}
                      fontSize={"11px"}
                      ml={"13px"}
                      color={"rgba(44, 51, 41, 0.47)"}
                    >
                      {capitalize(selectedTopic.name)}
                    </Text>
                  </Box>

                  <Text
                    fontWeight={400}
                    fontSize={"11px"}
                    lineHeight={"15px"}
                    color={"#2C332978"}
                    mr={"13px"}
                    mt={"16px"}
                  >
                    {lecture.date}
                  </Text>
                </Flex>

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
                  fontSize={"11px"}
                  lineHeight={"21px"}
                  fontWeight={400}
                  ml={13}
                  noOfLines={"3"}
                  color={"rgba(44, 51, 41, 0.47)"}
                >
                  {lecture.description}
                </Text>

                <Button
                  variant={"ghost"}
                  color={"#3C8DBC"}
                  fontWeight={"600"}
                  size={"14px"}
                  lineHeight={"16px"}
                  m={"20px"}
                  _hover={{ bg: "white" }}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </Flex>
        </Box>
      ) : (
        <Box
          width={"100%"}
          bg={outerBackground}
          borderRadius={"26px"}
          mt={"24px"}
        >
          <Flex
            align="center"
            justify="center"
            direction="column"
            height="300px"
            color="gray.500"
          >
            <Text fontSize="18px">Please select a topic !!</Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default LectureDetailsPage;

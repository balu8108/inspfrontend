import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  HStack,
  Text,
  InputGroup,
  Input,
  InputLeftElement,
  Spacer,
  Stack,
  Flex,
  Button,
} from "@chakra-ui/react";
import { fetchAllTopicsWithoutChapterIdApi } from "../../../../api/inspexternalapis";
import { SearchIcon } from "@chakra-ui/icons";
import topicDescriptionConstants from "../../../../constants/topicDescriptionConstants";
import { capitalize } from "../../../../utils";
import { useParams } from "react-router-dom";
const TopicBasedRecordings = () => {
  const [topic, setTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { subjectName } = useParams();
  useEffect(() => {
    const fetchtopic = async () => {
      try {
        const response = await fetchAllTopicsWithoutChapterIdApi();
        if (response && response.result) {
          setTopic(response.result);
        } else {
          setTopic([]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchtopic();
  }, []);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box width={"100%"} borderRadius={"26px"}>
      <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"}>
          Library ({capitalize(subjectName)})
        </Text>
        <Spacer />
        <InputGroup w="30%" mx={12} my={17}>
          <Input
            type="text"
            placeholder="Search..."
            border="1px solid #ccc"
            borderRadius="md"
          />
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
      </HStack>

      {/* {topic && (
        <Card>
          {topic.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </Card>
      )} */}

      <Stack>
        <Flex flexWrap="wrap" p={5} gap={"24px"} ml={5}>
          {topic?.length === 0
            ? null
            : topic?.map((libraryData) => (
                <Card
                  key={libraryData.id}
                  w="30%"
                  h={"204px"}
                  blendMode={"multiply"}
                  bg={"#F1F5F8"}
                  borderRadius={"18px"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Text
                    fontSize={"15px"}
                    fontWeight={"400px"}
                    lineHeight={"19.36px"}
                    color={"#2C3329"}
                    mt={"13px"}
                    ml={"13px"}
                    noOfLines={1}
                  >
                    {capitalize(libraryData.name)}
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
                    mt={"16px"}
                    ml={"13px"}
                    fontSize={"12px"}
                    lineHeight={"14.52px"}
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
                    {topicDescriptionConstants[libraryData.id]}
                  </Text>

                  <Button
                    color={"#3C8DBC"}
                    variant={"ghost"}
                    mt={"10px"}
                    fontSize={"14px"}
                    lineHeight={"16px"}
                    fontWeight={"600"}
                  >
                    View Details
                  </Button>
                </Card>
              ))}
        </Flex>
      </Stack>
    </Box>
  );
};

export default TopicBasedRecordings;

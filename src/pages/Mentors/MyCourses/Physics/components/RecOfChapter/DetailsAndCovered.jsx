import React from "react";
import {
  Box,
  Text,
  HStack,
  Card,
  Flex,
  Button,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import { BsDownload } from "react-icons/bs";
import {PiUploadSimpleLight} from "react-icons/pi"
import chapterDetailsData from "../../data/Details";
import quizType from "../../data/quizType";

const ChapterDetailsAndCoveredPart = () => {
  return (
    <Box w={"100%"} height={"999px"} bg={"#F1F5F8"} borderRadius={"26px"}>
      <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"} fontWeight={400}>
          Details
        </Text>
      </HStack>

      <Stack ml={"20px"} mt={"50px"}>
        {chapterDetailsData.map((chapter) => (
          <Flex key={chapter.id} p={4}>
            <Box flex={1}>
              <Text>Description</Text>

              <Text fontSize={"12px"} color={"#2C332978"} mt={"15px"}>
                {chapter.description}
              </Text>
            </Box>

            <Box flex={1} ml={"24px"}>
              <Text fontSize="md">Covered</Text>
              <ul
                style={{
                  listStyle: "circle",
                  fontSize: "12px",
                  lineHeight: "20px",
                  color: "#2C332978",
                  marginTop: "15px",
                }}
              >
                {chapter.covered.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </Box>
          </Flex>
        ))}
      </Stack>
      <Box ml={"21px"}>
        <Text p={"12px"}>Files/Notes</Text>
        <Box
          flex={1}
          display="flex"
          justifyContent="flex-end"
          gap={4}
          my={"13px"}
          mx={"25px"}
        >
          {chapterDetailsData.map((chapter) =>
            chapter.filesOrNotes.map((filesOrNotes, index) => (
              <Flex
                key={index}
                flex={1}
                mt={"15px"}
                color={"#2C332978"}
                p={"9px"}
                borderRadius={"6px"}
                border={"1px"}
                borderColor={"#9597927D"}
                boxShadow={"md"}
                h={"49px"}
                fontSize={"13px"}
              >
                {filesOrNotes}
                <Spacer />
                <Button
                  rightIcon={<PiUploadSimpleLight/>}
                  variant={"ghost"}
                  color={"black"}
                  ml={2}
                ></Button>
              </Flex>
            ))
          )}
        </Box>
      </Box>

      <Box m={"20px"}>
        <Flex>
          {quizType.map((type) => (
            <Card
              key={type.id}
              h={"178px"}
              p={3}
              m={2}
              flex={1}
              borderRadius={"18px"}
              bg={"#F1F5F8"}
              blendMode={"multiply"}
            >
              <Text>{type.name}</Text>

              <Text fontSize={"xs"} mt={"15px"}>
                Description
              </Text>
              <Text
                fontSize={"xs"}
                mt={"5px"}
                color={"#2C332978"}
                noOfLines={2}
              >
                {type.description}
              </Text>
              <Button
                variant={"ghost"}
                fontWeight={"600"}
                color={"#3C8DBC"}
                mt={"20px"}
              >
                View Details
              </Button>
            </Card>
          ))}
        </Flex>
      </Box>

      <Box m={"20px"} >
        <Text>Assignments</Text>
        {chapterDetailsData.map((chapter) => (
          <Flex key={chapter.id} gap={"18px"} mt={"16px"}>
            {chapter.assignment.map((assignment, index) => (
              <Card
                key={index}
                h={"200px"}
                flex={1}
                borderRadius={"18px"}
                bg={"#F1F5F8"}
                blendMode={"multiply"}
                p={4}
              >
                <Text>{assignment.assignmentName}</Text>
                <Text fontSize={"12px"} color={"#2C332978"}>
                  {assignment.instructorName}
                </Text>
                <Text fontSize={"xs"} mt={"15px"}>
                  Description
                </Text>
                <Text
                  fontSize={"xs"}
                  mt={"5px"}
                  color={"#2C332978"}
                  noOfLines={2}
                >
                  {assignment.description}
                </Text>
                <Button
                  variant={"ghost"}
                  fontWeight={"600"}
                  color={"#3C8DBC"}
                  mt={"20px"}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default ChapterDetailsAndCoveredPart;

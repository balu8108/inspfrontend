import React from "react";
import {
  Box,
  Text,
  HStack,
  Card,
  Flex,
  Button,
  Stack,
  Icon,
  Spacer,
} from "@chakra-ui/react";
import { BsDownload } from "react-icons/bs";

import chapterDetails from "../../data/viewChapterData";

const Details = () => {
  return (
    <Box width={"100%"} height={"999px"} bg={"#F1F5F8"} borderRadius={"26px"}>
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
        {chapterDetails.map((chapter) => (
          <Flex key={chapter.id} p={4}>
            <Box flex={1}>
              <Text style={{}}>Description</Text>

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
      </Box>
      <Box flex={1} display="flex" justifyContent="flex-end">
        {[1, 2, 3].map((fileNumber) => (
          <Box
            key={fileNumber}
            flex={1}
            bg={"blackAlpha.200"}
            m={2}
            p={"6px"}
            borderRadius={"6px"}
            border={"1px"}
            borderColor={"#9597927D"}
            boxShadow={"md"}
          >
            <Icon as={BsDownload} w={"18px"} h={"18px"} />
          </Box>
        ))}
      </Box>
      <Box m={"20px"}>
        <Text>Assignments</Text>
        {chapterDetails.map((chapter) => (
          <div key={chapter.id}>
            <Flex>
              {chapter.assignment.map((assignment, index) => (
                <Card key={index} p={3} m={2} flex={1} borderRadius={"18px"}>
                  <Text> {assignment.assignmentName}</Text>
                  <Text fontSize={"12px"} color={"#2C332978"}>
                    {" "}
                    {assignment.instructorName}
                  </Text>
                  <Text fontSize={"xs"} mt={"15px"}>
                    Description
                  </Text>
                  <Text fontSize={"xs"} mt={"5px"} color={"#2C332978"}>
                    {assignment.description}
                  </Text>
                  <Button
                    variant={"ghost"}
                    fontWeight={"600"}
                    color={"#3C8DBC"}
                    p={[10, 21]}
                    mt={"28px"}
                    mb={"10px"}
                  >
                    View Details
                  </Button>
                </Card>
              ))}
            </Flex>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default Details;

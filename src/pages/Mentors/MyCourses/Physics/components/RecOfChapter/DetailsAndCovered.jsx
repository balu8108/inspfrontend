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
  Image,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { BsDownload } from "react-icons/bs";
import chapterDetailsData from "../../data/Details";
import defaultImageUrl from "../../../.././../../assets/images/image1.png";
import viewChapterRecordings from "../../data/recording";
import { IoIosAdd } from "react-icons/io";
import UploadAssignmentPopup from "../../../../../../components/popups/UploadAssignmentPopup";
import { checkUserType } from "../../../../../../utils";
import { userType } from "../../../../../../constants/staticvariables";
const ChapterDetailsAndCoveredPart = () => {
  const userRoleType = checkUserType();
  const maxAssignmentsToShow = 5;
  return (
    <Box w={"100%"} height={"full"} bg={"#F1F5F8"} borderRadius={"26px"}>
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

      <Box p={"13px"} ml={"21px"} overflowX={"auto"}>
        <Text>Recordings</Text>
        <Flex>
          {viewChapterRecordings.map((chapter) => (
            <Flex key={chapter.chapterId} gap={"24px"}>
              {chapter.recordings.map((recording) => (
                <Card
                  key={recording.recordingId}
                  mt={"15px"}
                  color={"#2C332978"}
                  fontSize={"13px"}
                  w={"120px"}
                >
                  <Image src={defaultImageUrl} alt="Recording Image" />
                </Card>
              ))}
            </Flex>
          ))}
        </Flex>
      </Box>

      <Box ml={"21px"} mt={"30px"}>
        <Text p={"12px"}>Files/Notes</Text>
        <Box flex={1} display="flex" justifyContent="flex-end" gap={4}>
          {chapterDetailsData.map((chapter) =>
            chapter.filesOrNotes.map((filesOrNotes, index) => (
              <Flex
                key={index}
                flex={1}
                mt={"10px"}
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
                  rightIcon={<BsDownload />}
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
          <Text p={"13px"}>Assignments</Text>
          <Spacer />
          <Button
            variant={"ghost"}
            fontSize={"sm"}
            fontWeight={400}
            mt={"15px"}
            mr={"10px"}
            color={"#3C8DBC"}
          >
            {userRoleType === userType.teacher && (
              <>
                <Icon as={IoIosAdd} mr={2} boxSize={7} />
                Add Assignment
              </>
            )}
          </Button>
        </Flex>

        {chapterDetailsData.map((chapter) => (
          <SimpleGrid key={chapter.id} gap={"24px"} mt={"16px"}>
            {chapter.assignment
              .slice(0, maxAssignmentsToShow)
              .map((assignment, index) => (
                <Card
                  key={index}
                  h={"100%"}
                  flex={1}
                  borderRadius={"18px"}
                  bg={"#F1F5F8"}
                  blendMode={"multiply"}
                  p={4}
                >
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
                  <HStack mt={"12px"}>
                    {assignment.assignmentFiles.map((file, fileIndex) => (
                      <Flex
                        key={fileIndex}
                        mt={"5px"}
                        color={"#2C332978"}
                        px={"15px"}
                        py={"8px"}
                        borderRadius={"6px"}
                        border={"1px"}
                        borderColor={"#9597927D"}
                        boxShadow={"md"}
                        w={"19%"}
                        h={"49px"}
                        fontSize={"13px"}
                      >
                        {file}
                        <Spacer />
                        <Button
                          rightIcon={<BsDownload />}
                          variant={"ghost"}
                          color={"black"}
                          ml={2}
                        ></Button>
                      </Flex>
                    ))}
                  </HStack>
                </Card>
              ))}
          </SimpleGrid>
        ))}
      </Box>
    </Box>
  );
};

export default ChapterDetailsAndCoveredPart;

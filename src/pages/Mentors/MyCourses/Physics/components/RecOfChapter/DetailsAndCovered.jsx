// this is the screen where  all the description , agenda , files , all assignments , recordings..
import React, { useEffect, useState } from "react";
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
  ListItem,
  UnorderedList,
  useTheme,
  Tooltip,
} from "@chakra-ui/react";
import { BsDownload } from "react-icons/bs";
import chapterDetailsData from "../../data/chapterDetailsData";
import defaultImageUrl from "../../../.././../../assets/images/image1.png";
import { capitalize, extractFileNameFromS3URL } from "../../../../../../utils";
import topicDescriptionConstants from "../../../../../../constants/topicDescriptionConstants";
import { pollsFileNameExtraction } from "../../../../../../utils/pollsFileNameExtraction";
import { BASE_URL } from "../../../../../../constants/staticurls";
import axios from "axios";
import { setIsDocModalOpen } from "../../../../../../store/actions/genericActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const ChapterDetailsAndCoveredPart = ({ viewTopic, viewtopicName }) => {
  const [liveClassRoomData, setLiveClassRoomData] = useState(null);

  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const { outerBackground } = useTheme().colors.pallete;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseDocumentViewer = () => {
    setModalIsOpen(false);
    setSelectedFileUrl("");
  };

  const fetchLiveClassData = async (topicId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/recording/all-live-recordings?type=topic&id=${topicId}`
      );

      const liveRecordingsData = response.data;

      setLiveClassRoomData(liveRecordingsData);
    } catch (error) {
      console.error("Error fetching live class room", error);
    }
  };

  useEffect(() => {
    if (viewTopic !== null) {
      fetchLiveClassData(viewTopic);
    }
  }, [viewTopic]);

  const fetchAssignmentDetails = async (topicId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/topic/get-all-assignments-topic-id?topicId=${topicId}`
      );

      const topicDetailsData = response.data;

      setAssignmentDetails(topicDetailsData);
    } catch (error) {
      console.error("Error fetching topic details:", error);
    }
  };

  const handleViewRecording = (recording) => {
    navigate(`/view-recording?type=live_specific&id=${recording.id}`);
  };

  useEffect(() => {
    if (viewTopic !== null) {
      fetchAssignmentDetails(viewTopic);
    }
  }, [viewTopic]);

  if (!viewTopic) {
    return (
      <Box
        w={"100%"}
        height={"full"}
        borderRadius={"26px"}
        bg={outerBackground}
        p={4}
      >
        <Text textAlign="center" m={"10%"}>
          Please select a topic to view details.
        </Text>
      </Box>
    );
  }

  return (
    <Box w={"100%"} height={"full"} borderRadius={"26px"} bg={outerBackground}>
      <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"} fontWeight={400}>
          {capitalize(viewtopicName)}
        </Text>
      </HStack>
      <Stack ml={"20px"} mt={"50px"}>
        <Flex p={4}>
          <Box flex={1}>
            <Text fontSize="md">Description</Text>
            {viewTopic && (
              <Text
                fontSize="12px"
                lineHeight={"21px"}
                color={"#2C332978"}
                mt={"15px"}
              >
                {topicDescriptionConstants[viewTopic]}
              </Text>
            )}
          </Box>

          <Box flex={1} ml={"24px"}>
            <Text fontSize="md">Agenda</Text>
            <UnorderedList
              fontSize={"12px"}
              color={"#2C332978"}
              spacing={"10px"}
              mt={"16px"}
            >
              {chapterDetailsData[0].covered.map((topic, index) => (
                <ListItem key={index}>{topic}</ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Flex>
      </Stack>

      <Box p={"13px"} ml={"21px"} overflowX={"auto"}>
        <Text>Recordings</Text>
        {liveClassRoomData && liveClassRoomData.data.length > 0 ? (
          <Flex gap={"24px"}>
            {liveClassRoomData.data.map((liveClassData) =>
              liveClassData.LiveClassRoomRecordings.length > 0
                ? liveClassData.LiveClassRoomRecordings.map(
                    (recording, index) => (
                      <Card
                        key={recording.id}
                        mt={"15px"}
                        color={"#2C332978"}
                        fontSize={"13px"}
                        w={"150px"}
                        onClick={() => handleViewRecording(recording)}
                      >
                        <Image
                          src={recording.imageUrl || defaultImageUrl}
                          alt="Recording Image"
                        />
                      </Card>
                    )
                  )
                : null
            )}
            {liveClassRoomData.data.every(
              (data) => data.LiveClassRoomRecordings.length === 0
            ) && (
              <Text fontSize="12px" p={3}>
                No recordings available for the topic.
              </Text>
            )}
          </Flex>
        ) : (
          <Text fontSize="12px" p={3}>
            No data available for the topic.
          </Text>
        )}
      </Box>

      <Box ml={"21px"} mt={"30px"}>
        <Text p={"12px"}>Files/Notes</Text>
        {liveClassRoomData && liveClassRoomData.data.length > 0 ? (
          <Flex flexWrap="wrap" gap={4} ml={"10px"}>
            {liveClassRoomData.data.map(
              (liveClassData) =>
                liveClassData.LiveClassRoomFiles.length > 0 && (
                  <Box
                    key={liveClassData.id}
                    w={"170px"}
                    h={"49px"}
                    borderRadius={6}
                    border={" 1px solid #9597927D "}
                    boxShadow={" 0px 1px 6px 0px #00000029 "}
                    mb={"25px"}
                  >
                    <Flex align="center" m={"5px"}>
                      <Tooltip
                        label={extractFileNameFromS3URL(
                          liveClassData.LiveClassRoomFiles[0].key
                        )}
                        placement="bottom"
                        hasArrow
                        arrowSize={8}
                        fontSize={"11px"}
                      >
                        <Text
                          fontSize={"12px"}
                          color={"#2C332978"}
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {extractFileNameFromS3URL(
                            liveClassData.LiveClassRoomFiles[0].key
                          )}
                        </Text>
                      </Tooltip>

                      <Spacer />
                      <Button
                        rightIcon={<BsDownload />}
                        variant={"ghost"}
                        color={"black"}
                        ml={2}
                        _hover={{ bg: "none" }}
                        onClick={() =>
                          dispatch(
                            setIsDocModalOpen(
                              liveClassData.LiveClassRoomFiles[0].id,
                              liveClassData.LiveClassRoomFiles[0].key,
                              "live",
                              true
                            )
                          )
                        }
                      ></Button>
                    </Flex>
                  </Box>
                )
            )}
            {liveClassRoomData.data.every(
              (data) => data.LiveClassRoomFiles.length === 0
            ) && (
              <Text fontSize="12px" p={3}>
                No files available for the topic.
              </Text>
            )}
          </Flex>
        ) : (
          <Text fontSize="12px" p={3}>
            No data available for the topic.
          </Text>
        )}
      </Box>

      <Box ml="21px" mt="30px">
        <Text p="12px">Polls/QnA</Text>
        {liveClassRoomData?.data?.length > 0 ? (
          <Flex flexWrap="wrap" gap={4} ml="10px">
            {liveClassRoomData.data.map((liveClassData) => {
              const qnaNote = liveClassData.LiveClassRoomQNANote;

              if (qnaNote !== null && typeof qnaNote === "object") {
                return (
                  <Flex
                    key={liveClassData.id}
                    mt="12px"
                    flexWrap="wrap"
                    gap={4}
                  >
                    <Flex
                      key={qnaNote.id}
                      color="#2C332978"
                      p="10px"
                      borderRadius="6px"
                      border="1px solid #9597927D"
                      boxShadow="0px 1px 6px 0px #00000029"
                      alignItems="center"
                      w="157px"
                      h={"49px"}
                      fontSize="12px"
                    >
                      <Text flex="1">
                        {pollsFileNameExtraction(qnaNote.key)}
                      </Text>
                      <Button
                        rightIcon={<BsDownload />}
                        variant="ghost"
                        color="black"
                        ml={2}
                        _hover={{ bg: "none" }}
                        onClick={() =>
                          dispatch(
                            setIsDocModalOpen(
                              qnaNote.id,
                              qnaNote.key,
                              "qna",
                              true
                            )
                          )
                        }
                      ></Button>
                    </Flex>
                  </Flex>
                );
              }
            })}
          </Flex>
        ) : (
          <Text fontSize="12px" p={3}>
            No data available for the topic.
          </Text>
        )}
      </Box>

      <Box m={"20px"}>
        <Text p={"13px"}>Assignments</Text>
        {assignmentDetails && assignmentDetails.length > 0 ? (
          <SimpleGrid gap={"24px"} mt={"16px"}>
            {assignmentDetails.map((assignment, index) => (
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
                <HStack mt={"12px"} flexWrap="wrap">
                  {assignment.AssignmentFiles.map((file, fileIndex) => (
                    <Flex
                      key={fileIndex}
                      mt={"5px"}
                      w={"157px"}
                      h={"49px"}
                      color={"#2C332978"}
                      bg={"#FFFFFF"}
                      p={"9px"}
                      borderRadius={"6px"}
                      border={"1px solid #9597927D"}
                      boxShadow={"0px 1px 6px 0px #00000029"}
                    >
                      {/* <Text
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        mt={2}
                      >
                        {extractFileNameFromS3URL(file.key)}
                      </Text> */}
                      <Tooltip
                        label={extractFileNameFromS3URL(file.key)}
                        placement="bottom"
                        hasArrow
                        arrowSize={8}
                        fontSize={"11px"}
                      >
                        <Text
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          mt={2}
                          fontSize={"12px"}
                        >
                          {extractFileNameFromS3URL(file.key)}
                        </Text>
                      </Tooltip>

                      <Spacer />
                      <Button
                        as="a"
                        rightIcon={<BsDownload />}
                        variant={"ghost"}
                        color={"black"}
                        _hover={{ bg: "none" }}
                        ml={2}
                        onClick={() =>
                          dispatch(
                            setIsDocModalOpen(
                              file?.id,
                              file?.key,
                              "assignment",
                              true
                            )
                          )
                        }
                      ></Button>
                    </Flex>
                  ))}
                </HStack>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Text fontSize={"12px"} mx={"20px"}>
            No assignments for this topic.
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default ChapterDetailsAndCoveredPart;

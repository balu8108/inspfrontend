// this is the screen where  all the description , agenda , files , all assignments ,
// recordings will come related to the particular topic
import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  HStack,
  Card,
  Flex,
  Stack,
  Image,
  SimpleGrid,
  ListItem,
  UnorderedList,
  useTheme,
  IconButton,
} from "@chakra-ui/react";
import chapterDetailsData from "../../data/chapterDetailsData";
import defaultImageUrl from "../../../.././../../assets/images/image1.png";
import { capitalize } from "../../../../../../utils";
import topicDescriptionConstants from "../../../../../../constants/topicDescriptionConstants";
import { useNavigate } from "react-router-dom";
import { allLiveRecordingDetailsApi } from "../../../../../../api/recordingapi";
import { getAllAssignmentByTopicApi } from "../../../../../../api/assignments";
import SingleFileComponent from "../../../../../../components/filebox/SingleFileComponent";
import { BsPlayFill } from "react-icons/bs";
const ChapterDetailsAndCoveredPart = ({ viewTopic,  }) => {
  const [liveClassRoomData, setLiveClassRoomData] = useState(null);

  const [assignmentDetails, setAssignmentDetails] = useState(null);

  const { outerBackground, innerBackground } = useTheme().colors.pallete;

  const navigate = useNavigate();

  const fetchLiveClassData = async (topicId) => {
    try {
      const response = await allLiveRecordingDetailsApi(topicId);

      if (response?.status === 200) {
        setLiveClassRoomData(response?.data);
      }
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
      const response = await getAllAssignmentByTopicApi(topicId);
      if (response?.status === 200) {
        const topicDetailsData = response.data;
        setAssignmentDetails(topicDetailsData);
      }
    } catch (error) {
      console.error("Error fetching topic details:", error);
    }
  };

  const handleViewRecording = (recording, liveClassData) => {
    navigate(
      `/view-recording?type=live_specific&id=${recording?.id}&topicId=${liveClassData?.LiveClassRoomDetail?.topicId}`
    );
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
    <Box
      w={"100%"}
      height={"full"}
      p={8}
      borderRadius={"26px"}
      bg={outerBackground}
    >
      <HStack spacing={"10px"} alignItems="center">
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"} fontWeight={400}>
          {capitalize()}
        </Text>
      </HStack>
      <Stack mt={10}>
        <Flex gap={4}>
          <Box flex={1}>
            <Text fontSize="md">Description</Text>
            {viewTopic && (
              <Text
                fontSize="12px"
                lineHeight={"21px"}
                color={"#2C332978"}
                mt={4}
              >
                {topicDescriptionConstants[viewTopic]}
              </Text>
            )}
          </Box>

          <Box flex={1}>
            <Text fontSize="md">Agenda</Text>
            <UnorderedList fontSize={"12px"} color={"#2C332978"} pt={2}>
              {chapterDetailsData[0].covered.map((topic, index) => (
                <ListItem key={topic?.id} my={2}>
                  {topic}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Flex>
      </Stack>

      <Box overflowX={"auto"} mt={8}>
        <Text>Recordings</Text>
        <Flex gap={"24px"} overflowX="auto">
          {liveClassRoomData && liveClassRoomData?.data.length > 0 ? (
            <Flex gap={4} mt={4}>
              {liveClassRoomData?.data.map((liveClassData) =>
                liveClassData?.LiveClassRoomRecordings.map(
                  (recording, index) => (
                    <Flex
                      alignItems="center"
                      w={"160px"}
                      key={recording?.id}
                      onClick={() =>
                        handleViewRecording(recording, liveClassData)
                      }
                      position={"relative"}
                      cursor={"pointer"}
                    >
                      <Image
                        src={defaultImageUrl}
                        alt="Video Thumbnail"
                        width={"100%"}
                        height={"100%"}
                      />
                      <IconButton
                        icon={<BsPlayFill />}
                        fontSize="24px"
                        position="absolute"
                        top="50%"
                        left="50%"
                        borderRadius={"100%"}
                        transform="translate(-50%, -50%)"
                      />
                    </Flex>
                  )
                )
              )}
              {liveClassRoomData?.data.every(
                (data) => data.LiveClassRoomRecordings.length === 0
              ) && (
                <Text fontSize="12px">
                  No recordings available for the topic.
                </Text>
              )}
            </Flex>
          ) : (
            <Text fontSize={"12px"} mt={4}>
              No recording are available for this topic.
            </Text>
          )}
        </Flex>
      </Box>

      <Box mt={8}>
        <Text>Files/Notes</Text>
        {liveClassRoomData?.data?.length > 0 ? (
          <Flex mt={4} flexWrap="wrap" gap={2}>
            {liveClassRoomData?.data?.map((ld) =>
              ld?.LiveClassRoomFiles?.map((file) => (
                <SingleFileComponent key={file?.id} file={file} type={"live"} />
              ))
            )}
            {/* liveClassRoomData?.data?.map(
              (ld) =>
                ld?.LiveClassRoomNote !== null && (
                  <SingleFileComponent
                    key={ld?.LiveClassRoomNote?.id}
                    file={ld?.LiveClassRoomNote}
                    type="note"
                  />
                )
            )*/}

            {liveClassRoomData?.data?.every(
              (ld) =>
                !ld?.LiveClassRoomFiles?.length &&
                ld?.LiveClassRoomNote === null
            ) && <Text fontSize="12px">No Files for this topic</Text>}
          </Flex>
        ) : (
          <Text fontSize="12px" mt={4}>
            No Data for this topic
          </Text>
        )}
      </Box>

      <Box mt={8}>
        <Text>Polls/QnA</Text>
        {liveClassRoomData?.data?.length > 0 ? (
          <Flex mt={4} flexWrap="wrap" gap={2}>
            {liveClassRoomData?.data?.map(
              (ld) =>
                ld?.LiveClassRoomQNANote !== null && (
                  <SingleFileComponent
                    key={ld?.LiveClassRoomQNANote?.id}
                    file={ld?.LiveClassRoomQNANote}
                    type="qna"
                  />
                )
            )}

            {liveClassRoomData?.data?.every(
              (ld) => ld?.LiveClassRoomQNANote === null
            ) && <Text fontSize="12px">No QNA for this topic</Text>}
          </Flex>
        ) : (
          <Text fontSize="12px" mt={4}>
            No Data for this topic
          </Text>
        )}
      </Box>

      <Box mt={8}>
        <Text>Assignments</Text>
        {assignmentDetails && assignmentDetails.length > 0 ? (
          <SimpleGrid style={{ marginTop: "16px" }} spacing={6}>
            {assignmentDetails.map((assignment, index) => (
              <Card
                key={assignment?.id}
                h={"100%"}
                flex={1}
                borderRadius={"18px"}
                bg={innerBackground}
                p={4}
              >
                <Text fontSize={"xs"}>Description</Text>
                <Text fontSize={"xs"} color={"#2C332978"} noOfLines={2} mt={2}>
                  {assignment.description}
                </Text>
                <HStack mt={4}>
                  {assignment.AssignmentFiles.map((file, fileIndex) => (
                    <SingleFileComponent
                      key={file?.id}
                      file={file}
                      type="assignment"
                    />
                  ))}
                </HStack>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Text fontSize={"12px"} mt={4}>
            No assignments for this topic.
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default ChapterDetailsAndCoveredPart;

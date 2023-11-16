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
  Icon,
} from "@chakra-ui/react";
import { BsDownload } from "react-icons/bs";
import chapterDetailsData from "../../data/Details";
import defaultImageUrl from "../../../.././../../assets/images/image1.png";

import { IoIosAdd } from "react-icons/io";

import {
  boxShadowStyles,
  capitalize,
  checkUserType,
  extractFileNameFromS3URL,
} from "../../../../../../utils";
import { userType } from "../../../../../../constants/staticvariables";
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
  const userRoleType = checkUserType();
  // const maxAssignmentsToShow = 5;
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
      // console.log("Assignment Data from API:", topicDetailsData);
      // Update the state with the received topic details
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
  return (
    <Box
      w={"100%"}
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      height={"full"}
      borderRadius={"26px"}
      bg="white"
    >
      <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"} fontWeight={400}>
          Details( {capitalize(viewtopicName)} )
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
          {liveClassRoomData ? (
            liveClassRoomData?.data.map((liveClassData) => (
              <Flex gap={"24px"} key={liveClassData.id}>
                {liveClassData?.LiveClassRoomRecordings.map(
                  (recording, index) => (
                    <Card
                      key={recording.id}
                      mt={"15px"}
                      color={"#2C332978"}
                      fontSize={"13px"}
                      w={"120px"}
                      onClick={(recording) => handleViewRecording(recording)}
                    >
                      <Image
                        src={recording.imageUrl || defaultImageUrl}
                        alt="Recording Image"
                      />
                    </Card>
                  )
                )}
              </Flex>
            ))
          ) : (
            <Text fontSize="12px" p={4}>
              No recordings available for the topic.
            </Text>
          )}
        </Flex>
      </Box>

      <Box ml={"21px"} mt={"30px"}>
        <Text p={"12px"}>Files/Notes</Text>
        {liveClassRoomData ? (
          liveClassRoomData?.data.map((liveClassData) => (
            <Box
              key={liveClassData?.id}
              display="flex"
              justifyContent="space-between"
              gap={4}
            >
              {liveClassData?.LiveClassRoomFiles.map((fileData, index) => (
                <Flex
                  key={fileData?.id}
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
                  {extractFileNameFromS3URL(fileData.key)}
                  <Spacer />
                  <Button
                    rightIcon={<BsDownload />}
                    variant={"ghost"}
                    color={"black"}
                    ml={2}
                    onClick={() =>
                      dispatch(
                        setIsDocModalOpen(
                          fileData?.id,
                          fileData?.key,
                          "live",
                          true
                        )
                      )
                    }
                  ></Button>
                </Flex>
              ))}
            </Box>
          ))
        ) : (
          <Text fontSize="12px" p={4}>
            No files available for the topic.
          </Text>
        )}
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
                <HStack mt={"12px"}>
                  {assignment.AssignmentFiles.map((file, fileIndex) => (
                    <Flex
                      key={fileIndex}
                      mt={"5px"}
                      color={"#2C332978"}
                      bg={"#FFFFFF"}
                      px={"15px"}
                      py={"8px"}
                      borderRadius={"6px"}
                      border={"1px solid #9597927D"}
                      boxShadow={"0px 1px 6px 0px #00000029"}
                      fontSize={"13px"}
                    >
                      {extractFileNameFromS3URL(file.key)}

                      <Spacer />
                      <Button
                        as="a"
                        rightIcon={<BsDownload />}
                        variant={"ghost"}
                        color={"black"}
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
          <Text fontSize={"12px"} p={4}>
            No assignments for this topic.
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default ChapterDetailsAndCoveredPart;

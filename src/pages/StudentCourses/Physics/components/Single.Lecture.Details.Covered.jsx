import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  useTheme,
  Button,
  Card,
  IconButton,
  Spacer,
  SimpleGrid,
} from "@chakra-ui/react";
import learderboard from "../../../../assets/images/learderboard.png";
import { getAllLectureByTopicName } from "../../../../api/regularclasses";
import { capitalize } from "../../../../utils";
import { getAllAssignmentByTopicApi } from "../../../../api/assignments";
import { getAllLectureDetails } from "../../../../api/crashCourse";
import SingleFileComponent from "../../../../components/filebox/SingleFileComponent";
import leaderBoardImage from "../../../../assets/images/leaderBoard.svg";
import defaultImageUrl from "../../../../assets/images/image1.png";
import { BsPlayFill } from "react-icons/bs";
import moment from "moment";

const SingleLectureDetailsCovered = (selectedTopic) => {
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;
  const navigate = useNavigate();
  const { topicname, roomId } = useParams();
  const [lecturesData, setLecturesData] = useState([]);
  const [lectureDetails, setLectureDetails] = useState({});
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const getAllLecture = async () => {
    try {
      const response = await getAllLectureByTopicName({ name: topicname });
      const { data } = response.data;

      setLecturesData(data);
    } catch (err) {
      console.error("Error fetching all crash course lectures:", err);
    }
  };
  const handleView = (roomId) => {
    if (topicname) {
      navigate(`/${topicname}/${roomId}`);
    }
  };
  const getLectureDetails = async () => {
    try {
      const response = await getAllLectureDetails(roomId);
      const { data } = response.data;
      console.log("line--nu--54-", { data });
      fetchAssignmentDetails(data?.LiveClassRoomDetail?.topicId);
      setLectureDetails(data);
    } catch (err) {
      console.error("Error fetching all crash course lectures:", err);
    }
  };
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
    getLectureDetails();
  }, [roomId]);

  useEffect(() => {
    if (topicname) {
      getAllLecture();
    }
  }, [topicname]);

  return (
    <Box>
      <Box borderRadius={"25px"} backgroundColor={outerBackground}>
        <HStack spacing={"10px"} alignItems="center" p={"20px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"}>
            Physics({topicname})
          </Text>
        </HStack>

        <Flex gap={"24px"} overflowX="auto" className="example" mx={5}>
          {lecturesData.map((lecture, index) => (
            <Card
              minW={"30%"}
              h={"200px"}
              borderRadius={"16px"}
              bg={innerBackground}
              key={lecture.id}
              boxShadow={innerBoxShadow}
              mb={5}
            >
              <Flex>
                <Box>
                  <Text
                    fontSize={"15px"}
                    ml={"13px"}
                    lineHeight={"19px"}
                    noOfLines={1}
                    mt={"16px"}
                  >
                    Lecture {lecture?.LiveClassRoomDetail?.lectureNo}
                  </Text>
                  <Text
                    fontWeight={400}
                    fontSize={"11px"}
                    ml={"13px"}
                    color={"rgba(44, 51, 41, 0.47)"}
                    noOfLines={1}
                  >
                    {capitalize(topicname)}
                  </Text>
                </Box>
                <Spacer />

                <Text
                  fontWeight={400}
                  fontSize={"11px"}
                  lineHeight={"15px"}
                  color={"#2C332978"}
                  mr={"13px"}
                  mt={"16px"}
                >
                  {moment(lecture.scheduledDate).format("L")}
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
                {lecture?.LiveClassRoomDetail?.description}
              </Text>

              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600"}
                size={"14px"}
                lineHeight={"16px"}
                m={"20px"}
                _hover={{ bg: "white" }}
                onClick={() => handleView(lecture?.roomId)}
                mt={"auto"}
              >
                View Details
              </Button>
            </Card>
          ))}
        </Flex>
      </Box>
      <Box
        backgroundColor={outerBackground}
        width={"100%"}
        borderRadius={"26px"}
        p={"20px"}
        mt={"24px"}
      >
        <Stack spacing={6} w={"85%"}>
          <Box
            width={"full"}
            h={"100%"}
            bg={outerBackground}
            borderRadius={"26px"}
          >
            <Flex mt={"17px"}>
              <HStack spacing={"10px"} alignItems="center">
                <Box
                  width={"12px"}
                  height={"25px"}
                  borderRadius={"20px"}
                  bg={"#3C8DBC"}
                ></Box>
                <Text fontSize={"19px"} lineHeight={"24px"}>
                  Details :{" "}
                  <span>
                    ({lectureDetails?.LiveClassRoomDetail?.topicName})
                  </span>
                </Text>
              </HStack>
              <Spacer />
            </Flex>
            <Flex mt={"37px"}>
              <Box width={"100%"}>
                <Flex flexDirection={"column"} gap={"16px"}>
                  <Text
                    fontWeight={"400"}
                    fontSize={"16px"}
                    textColor={"#2C3329"}
                    lineHeight={"20px"}
                  >
                    Description
                  </Text>
                  <Text
                    textColor={"#2C332978"}
                    fontSize={"12px"}
                    lineHeight={"21px"}
                  >
                    {lectureDetails?.LiveClassRoomDetail?.description}
                  </Text>
                </Flex>
                <Box pt={6}>
                  <Text fontSize={"16px"} textColor={"#2C3329"} mb={2}>
                    Agenda
                  </Text>
                  {lectureDetails?.LiveClassRoomDetail?.agenda ? (
                    lectureDetails.LiveClassRoomDetail.agenda
                      .split("\r\n")

                      .map((agenda, index) => (
                        <HStack key={index} pt={1}>
                          <Box
                            minWidth={"7px"}
                            height={"7px"}
                            bg={"gray.400"}
                            borderRadius={"100%"}
                          />
                          <Text
                            textColor={"#2C332978"}
                            fontSize={"12px"}
                            mt={"4px"}
                            lineHeight={"21px"}
                          >
                            {agenda}
                          </Text>
                        </HStack>
                      ))
                  ) : (
                    <Text color={"#2C332978"} fontSize={"12px"} noOfLines={2}>
                      No Data
                    </Text>
                  )}
                </Box>
              </Box>
              <Box width={"50%"} pl={"20px"}>
                <Text
                  fontWeight={"400"}
                  fontSize={"16px"}
                  textColor={"#2C3329"}
                  mb={"5px"}
                >
                  Leader Board
                </Text>
                <img
                  className="h-[250px] ml-10"
                  src={leaderBoardImage}
                  alt="Leader Board"
                />
              </Box>
            </Flex>
          </Box>
        </Stack>

        <Box overflowX={"auto"} mt={8} width={"100%"}>
          <Text
            fontWeight={"400"}
            fontSize={"16px"}
            textColor={"#2C3329"}
            lineHeight={"20px"}
          >
            Recordings
          </Text>
          <Flex gap={"24px"} overflowX="auto">
            {lectureDetails?.LiveClassRoomRecordings?.length > 0 ? (
              <Flex gap={4} mt={4}>
                {lectureDetails?.LiveClassRoomRecordings.map(
                  (recording, index) => (
                    <Flex
                      alignItems="center"
                      w={"160px"}
                      key={recording?.id}
                      onClick={() =>
                        handleViewRecording(recording, lectureDetails)
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
          <Text
            fontWeight={"400"}
            fontSize={"16px"}
            textColor={"#2C3329"}
            lineHeight={"20px"}
          >
            Files/Notes
          </Text>
          {lectureDetails?.LiveClassRoomFiles?.length > 0 ? (
            <Flex mt={4} flexWrap="wrap" gap={2}>
              {lectureDetails?.LiveClassRoomFiles?.map((file) => (
                <SingleFileComponent key={file?.id} file={file} type={"live"} />
              ))}

              {lectureDetails?.LiveClassRoomNote !== null && (
                <SingleFileComponent
                  key={lectureDetails?.LiveClassRoomNote?.id}
                  file={lectureDetails?.LiveClassRoomNote}
                  type="note"
                />
              )}
            </Flex>
          ) : (
            <Text fontSize="12px" mt={4}>
              No Data for this topic
            </Text>
          )}
        </Box>
        <Box mt={8}>
          <Text
            fontWeight={"400"}
            fontSize={"16px"}
            textColor={"#2C3329"}
            lineHeight={"20px"}
          >
            Assignments
          </Text>
          {assignmentDetails && assignmentDetails.length > 0 ? (
            <SimpleGrid style={{ marginTop: "16px" }} spacing={6}>
              {assignmentDetails.map((assignment, index) => (
                <Card
                  key={assignment?.id}
                  h={"100%"}
                  width={"100%"}
                  flex={1}
                  borderRadius={"18px"}
                  bg={innerBackground}
                  p={4}
                >
                  <Text fontSize={"xs"}>Description</Text>
                  <Text
                    fontSize={"xs"}
                    color={"#2C332978"}
                    noOfLines={2}
                    mt={2}
                  >
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
    </Box>
  );
};
export default SingleLectureDetailsCovered;

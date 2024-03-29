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
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { getAllLectureByTopicName } from "../../../../api/regularclasses"; //This api is for getting the number of lectures
import { capitalize } from "../../../../utils";
import { getAllAssignmentByTopicApi } from "../../../../api/assignments";
import SingleFileComponent from "../../../../components/filebox/SingleFileComponent";
import leaderBoardImage from "../../../../assets/images/leaderBoard.svg";
import defaultImageUrl from "../../../../assets/images/image1.png";
import { BsPlayFill } from "react-icons/bs";
import moment from "moment";
import { FaCircle } from "react-icons/fa6";
import { getLectureDetails } from "../../../../api/regularclasses";
import UploadAssignmentToClass from "../../../../components/popups/UploadAssignmentToClass";
import { checkUserType } from "../../../../utils";
import { IoAddOutline } from "react-icons/io5";
import { userType } from "../../../../constants/staticvariables";

const SingleLectureDetailsCovered = () => {
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;
  const navigate = useNavigate();
  const location = useLocation();
  const userRoleType = checkUserType();
  const lectures = location.state?.lecture || [];
  
  const { topicname, roomId } = useParams();
  const [lecturesData, setLecturesData] = useState(lectures);
  const [lectureDetails, setLectureDetails] = useState({});
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [isFileAdded, setIsFileAdded] = useState(false);
  const [isAssignmentPopupOpen, setIsAssignmentPopupOpen] = useState(false);

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
  const getDetails = async () => {
    try {
      const response = await getLectureDetails(roomId);
      const { data } = response.data;
      fetchAssignmentDetails(data?.LiveClassRoomDetail?.topicId);
      setLectureDetails(data);
    } catch (err) {
      console.error("Error fetching course lectures:", err);
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
    navigate(`/view-recording?type=live&id=${liveClassData?.id}`);
  };

  useEffect(() => {
    getDetails();
  }, [roomId]);

  useEffect(() => {
    if (topicname && lectures.length === 0) {
      getAllLecture();
    }
  }, [topicname]);

  const handleAddFile = () =>{
    setIsAssignmentPopupOpen(false)
    getDetails();
  }

  return (
    <>
    {isAssignmentPopupOpen && (
        <UploadAssignmentToClass
          classId={lectureDetails?.id}
          type="live"
          isOpen={isAssignmentPopupOpen}
          onClose={() =>handleAddFile()}
          setIsFileAdded={setIsFileAdded}
        />
      )}
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
        <Stack spacing={6}>
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
                <span>({lectureDetails?.LiveClassRoomDetail?.topicName})</span>
              </Text>
            </HStack>
            <Spacer />
          </Flex>
          <Flex mt={"37px"} gap={"18px"}>
            <Box width={"50%"}>
                <Text
                  fontWeight={"400"}
                  fontSize={"16px"}
                  textColor={"#2C3329"}
                  lineHeight={"20px"}
                  mb={"40px"}
                >
                  Lecture {lectureDetails?.LiveClassRoomDetail?.lectureNo}
                </Text>
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
                  <Box>
                    {lectureDetails.LiveClassRoomDetail.agenda
                      .split("\r\n")
                      .slice(0, 5)
                      .map((agenda, index) =>
                        agenda.trim() !== "" ? (
                          <Stack
                            key={index}
                            spacing={1}
                            direction="row"
                            alignItems="center"
                            mt={"10px"}
                          >
                            <List>
                              <ListItem>
                                <Flex>
                                  {agenda && (
                                    <ListIcon
                                      as={FaCircle}
                                      color={"#2C332978"}
                                      boxSize={"6px"}
                                      blendMode={"multiply"}
                                      mt={"2px"}
                                    />
                                  )}
                                  <Text
                                    fontSize={"12px"}
                                    lineHeight={"14px"}
                                    color={"#2C332978"}
                                  >
                                    {agenda ?? "No Data"}
                                  </Text>
                                </Flex>
                              </ListItem>
                            </List>
                          </Stack>
                        ) : null
                      )}
                  </Box>
                ) : (
                  <Text color={"#2C332978"} fontSize={"12px"} noOfLines={2}>
                    No Data
                  </Text>
                )}
              </Box>
            </Box>
            <Box>
              <Stack spacing={"16px"}>
                <Text
                  fontWeight={"400"}
                  fontSize={"16px"}
                  textColor={"#2C3329"}
                  mb={"5px"}
                >
                  Leader Board
                </Text>
                <Flex p={10}>
                  <Image src={leaderBoardImage} alt="Leader Board" />

                  {lectureDetails?.LeaderBoards?.map((leaderBoard, index) => (
                    <Flex
                      key={leaderBoard?.id}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      mt={"3px"}
                      flexDirection={"column"}
                    >
                      <Text
                        fontSize={"14px"}
                        fontWeight={"400"}
                        textColor={"#2C332978"}
                      >
                        {index + 1}. {leaderBoard?.peerName}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Stack>
            </Box>
          </Flex>
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
          <Flex>
            <Text
              fontWeight={"400"}
              fontSize={"16px"}
              textColor={"#2C3329"}
              lineHeight={"20px"}
            >
              Files/Notes
            </Text>

            <Spacer />
            {userRoleType === userType.teacher && (
              <Flex alignItems={"center"}
              _hover={{ bg: "none", cursor: "pointer" }}                      
                onClick={() => {
                setIsAssignmentPopupOpen(true);
              }}>
                <Button           
                  variant={"ghost"}
                  bg="none"
                >
                  <IoAddOutline
                    color={"3C8DBC"}
                    fontSize={"20px"}
                    bg="red"
                  />
                </Button>

                <Text
                  fontSize={"14px"}
                  fontWeight={400}
                  color={"#3C8DBC"}
                  variant={"ghost"}
                >
                  Add Files
                </Text>
              </Flex>
            )}
          </Flex>
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
    </>
  );
};
export default SingleLectureDetailsCovered;

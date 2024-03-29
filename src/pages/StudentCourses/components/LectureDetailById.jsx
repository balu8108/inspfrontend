import React, { useState, useEffect } from "react";
import {
  Flex,
  Stack,
  Box,
  useDisclosure,
  useTheme,
  Text,
  HStack,
  Spacer,
  SimpleGrid,
  Card,
  Image,
  IconButton,
  Button,
} from "@chakra-ui/react";
import SimpleBar from "simplebar-react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"
import { BsPlayFill } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";

import Header from "../../Mentors/Header/components/HeaderInAllScreen";
import { getAllLiveClassesSchedule } from "../../../store/actions/scheduleClassActions";
import ScheduleClassPopup from "../../../components/popups/ScheduleClassPopup";
import { getAllLectureDetails } from "../../../api/lecture";
import SingleFileComponent from "../../../components/filebox/SingleFileComponent";
import defaultImageUrl from "../../../assets/images/image1.png";
import { getAllAssignmentByTopicApi } from "../../../api/assignments";
import leaderBoard from "../../../assets/images/leaderBoard.svg";
import { userType } from "../../../constants/staticvariables";
import { checkUserType } from "../../../utils";
import UploadAssignmentToClass from "../../../components/popups/UploadAssignmentToClass";
import { className } from "../../../constants/className";
import ScheduleClassList from "../../ScheduleClasses/components/ScheduleClassList";
export default function LectureDetailsById() {
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;
  const userRoleType = checkUserType();
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();

  const [selectedDate, setSelectedDate] = useState(""); // if clicked from calendar
  const [classTiming, setClassTiming] = useState(["--:--", "--:--"]);
  const [lectureDetails, setLectureDetails] = useState(null);
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [isFileAdded, setIsFileAdded] = useState(false);
  const [isAssignmentPopupOpen, setIsAssignmentPopupOpen] = useState(false);
  const navigate = useNavigate();

  const getLectureDetails = async () => {
    try {
      const response = await getAllLectureDetails(roomId);
      const { data } = response.data;

      fetchAssignmentDetails(data?.LiveClassRoomDetail?.topicId);
      setLectureDetails(data);
    } catch (err) {
      setLectureDetails(null);
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
    navigate(`/view-recording?type=live&id=${liveClassData?.id}`);
  };

  useEffect(() => {
    getLectureDetails();
  }, [roomId]);

  useEffect(() => {
    dispatch(getAllLiveClassesSchedule());
  }, [dispatch]);

  const handleAddFile = () =>{
    setIsAssignmentPopupOpen(false)
    getLectureDetails();
  }

  return (
    <>
      {isSchedulePopupOpen && (
        <ScheduleClassPopup
          isOpen={isSchedulePopupOpen}
          onClose={onScheduleClosePopupOpen}
          selectedDate={selectedDate}
          classTiming={classTiming}
          setSelectedDate={setSelectedDate}
          setClassTiming={setClassTiming}
        />
      )}

      {isAssignmentPopupOpen && (
        <UploadAssignmentToClass
          classId={lectureDetails?.id}
          type="live"
          isOpen={isAssignmentPopupOpen}
          onClose={() =>handleAddFile()}
          setIsFileAdded={setIsFileAdded}
        />
      )}

      <Flex gap={"23px"} m={"52px"}>
        <Stack spacing={6} w={"75%"}>
          <Header />
          {lectureDetails ? (
            <Box
              width={"full"}
              h={"100%"}
              bg={outerBackground}
              borderRadius={"26px"}
              p={"20px"}
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
                    <span className="text-base">
                      ({lectureDetails?.LiveClassRoomDetail?.topicName})
                    </span>:{" "}
                    <span className="text-base">
                      ({className[lectureDetails?.classLevel]})
                    </span>
                  </Text>
                </HStack>
                <Spacer />
              </Flex>
              <Flex mt={"20px"}>
                <Box width={"50%"}>
                <Text
                  fontWeight={"400"}
                  fontSize={"16px"}
                  textColor={"#2C3329"}
                  lineHeight={"20px"}
                  mb={"40px"}
                  mt={"20px"}
                >
                  Lecture {lectureDetails?.LiveClassRoomDetail?.lectureNo}
                </Text>
                  <Box>
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
                      mt={"4px"}
                      lineHeight={"21px"}
                    >
                      {lectureDetails?.LiveClassRoomDetail?.description}
                    </Text>
                  </Box>
                  <Box pt={6}>
                    <Text fontSize={"16px"} textColor={"#2C3329"} mb={2}>
                      Agenda
                    </Text>
                    {lectureDetails?.LiveClassRoomDetail?.agenda ? (
                      lectureDetails.LiveClassRoomDetail.agenda
                        .split("\r\n")
                        .slice(0, 4) // Take only the first 4 items
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
                  <Flex>
                    <img
                      className="h-[250px] ml-10"
                      src={leaderBoard}
                      alt="Leader Board"
                    />
                    <Box ml={"15px"}>
                      {lectureDetails?.LeaderBoards?.map(
                        (leaderBoard, index) => (
                          <Box
                            key={leaderBoard?.id}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            mt={"3px"}
                            noOfLines={1}
                          >
                            <Text
                              fontSize={"14px"}
                              fontWeight={"400"}
                              textColor={"#2C332978"}
                            >
                              {index + 1}. {leaderBoard?.peerName}
                            </Text>
                          </Box>
                        )
                      )}
                    </Box>
                  </Flex>
                </Box>
              </Flex>
              <Box overflowX={"auto"} mt={8}>
                <Text
                  fontWeight={"400"}
                  fontSize={"16px"}
                  textColor={"#2C3329"}
                  lineHeight={"20px"}
                >
                  Recordings
                </Text>
                <Flex gap={"24px"} overflowX="auto" className="example">
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
                      <SingleFileComponent
                        key={file?.id}
                        file={file}
                        type={"live"}
                      />
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
          ) : (
            <Flex
              width={"full"}
              h={"300px"}
              bg={outerBackground}
              borderRadius={"26px"}
              p={"20px"}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Text>No Data Found</Text>
            </Flex>
          )}
        </Stack>
        <Box w={"25%"}>
          <SimpleBar
            style={{
              maxHeight: "85vh",
              borderRadius: "26px",
              background: outerBackground,
            }}
          >
            <Box p={4}>
              <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
            </Box>
          </SimpleBar>
        </Box>
      </Flex>
    </>
  );
}

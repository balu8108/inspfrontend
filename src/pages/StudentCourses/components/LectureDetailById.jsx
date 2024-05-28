import React, { useState, useEffect } from "react";
import {
  Flex,
  Stack,
  Box,
  useTheme,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

import Header from "../../Mentors/Header/components/HeaderInAllScreen";
import { getAllLectureDetails } from "../../../api/lecture";
import { getAllAssignmentByTopicApi } from "../../../api/assignments";
import { userType } from "../../../constants/staticvariables";
import { checkUserType } from "../../../utils";
import UploadAssignmentToClass from "../../../components/popups/UploadAssignmentToClass";
import { className } from "../../../constants/className";
import SingleLectureDetailsCovered from "../Physics/components/Single.Lecture.Details.Covered";
import LectureRecordingCard from "./LectureRecordingCard";
import LectureFileCard from "./LectureFileCard";
import LectureLeaderBoard from "./LectureLeaderBoard";
import LectureAssignmentCard from "./LectureAssignmentCard";
export default function LectureDetailsById() {
  const { outerBackground } = useTheme().colors.pallete;
  const { userProfile } = useSelector((state) => state.auth);
  const userRoleType = checkUserType(userProfile);
  const { roomId, courseType } = useParams();

  const [lectureDetails, setLectureDetails] = useState(null);
  const [questionLog, setQuestionLog] = useState(0);
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [isAssignmentPopupOpen, setIsAssignmentPopupOpen] = useState(false);

  const getLectureDetails = async () => {
    try {
      const response = await getAllLectureDetails(roomId);
      const { data } = response.data;

      fetchAssignmentDetails(data?.LiveClassRoomDetail?.topicId);
      setLectureDetails(data?.liveClassRoom);
      setQuestionLog(data?.questionLogCount);
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

  useEffect(() => {
    getLectureDetails();
  }, [roomId]);

  const handleAddFile = () => {
    setIsAssignmentPopupOpen(false);
    getLectureDetails();
  };

  return (
    <>
      {isAssignmentPopupOpen && (
        <UploadAssignmentToClass
          classId={lectureDetails?.id}
          type="live"
          isOpen={isAssignmentPopupOpen}
          onClose={() => handleAddFile()}
        />
      )}
      <Stack spacing={6}>
        {courseType === "Physics" ? (
          <SingleLectureDetailsCovered />
        ) : (
          <Header />
        )}
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
                </span>
                :{" "}
                <span className="text-base">
                  ({className[lectureDetails?.classLevel]})
                </span>
              </Text>
            </HStack>
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
              <LectureLeaderBoard
                lectureDetails={lectureDetails}
                questionLog={questionLog}
              />
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
            <LectureRecordingCard lectureDetails={lectureDetails} />
          </Box>

          <Box mt={8}>
            <Flex justifyContent={"space-between"}>
              <Text
                fontWeight={"400"}
                fontSize={"16px"}
                textColor={"#2C3329"}
                lineHeight={"20px"}
              >
                Files/Notes
              </Text>
              {userRoleType === userType.teacher && (
                <Flex
                  alignItems={"center"}
                  _hover={{ bg: "none", cursor: "pointer" }}
                  onClick={() => {
                    setIsAssignmentPopupOpen(true);
                  }}
                >
                  <Button variant={"ghost"} bg="none">
                    <IoAddOutline color={"3C8DBC"} fontSize={"20px"} bg="red" />
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
            <LectureFileCard lectureDetails={lectureDetails} />
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
            <LectureAssignmentCard assignmentDetails={assignmentDetails} />
          </Box>
        </Box>
      </Stack>
    </>
  );
}

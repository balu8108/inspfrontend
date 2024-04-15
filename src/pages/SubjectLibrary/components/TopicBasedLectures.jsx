import {
  Box,
  Center,
  Text,
  useTheme,
  Flex,
  HStack,
  Stack,
  Input,
  Spacer,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { capitalize } from "../../../utils";
import VectorImage from "../../../assets/images/Line/Vector.svg";
import { getAllLectureByTopicId } from "../../../api/lecture";
import LectureCard from "../../../components/Card/LectureCard";
import ScheduleClassList from "../../ScheduleClasses/components/ScheduleClassList";
import ScheduleClassPopup from "../../../components/popups/ScheduleClassPopup";

const TopicBasedLectures = () => {
  const { topicId, topicName } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [lecturesDataLoading, setLecturesDataLoading] = useState(true);
  const [lecturesData, setLecturesData] = useState([]);
  const { outerBackground, innerBackground } = useTheme().colors.pallete;

  const handleNavigate = (roomId) => {
    navigate(`/my-courses/lecture-detail/${roomId}/Physics`, {
      state: {
        lecture: lecturesData,
        topicname: topicName,
      },
    });
  };

  const filterLectures = (lecture) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const lectureNumber = lecture?.LiveClassRoomDetail?.lectureNo
      ?.toString()
      .toLowerCase();

    return lectureNumber.includes(lowerCaseSearchTerm);
  };

  const getAllLecture = async () => {
    try {
      const response = await getAllLectureByTopicId(topicId, "both");
      const { data } = response.data;
      setLecturesData(data);
      setLecturesDataLoading(false);
    } catch (err) {
      setLecturesDataLoading(false);
      console.error("Error fetching all crash course lectures:", err);
    }
  };

  useEffect(() => {
    getAllLecture();
  }, []);

  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();

  return (
    <>
      {isSchedulePopupOpen && (
        <ScheduleClassPopup
          isOpen={isSchedulePopupOpen}
          onClose={onScheduleClosePopupOpen}
          isCalenderScreen={false}
        />
      )}
      <Flex m={"52px"}>
        <Stack spacing={6} w={"75%"}>
          <Box width={"100%"}>
            <Box bg={outerBackground} borderRadius={"26px"}>
              <Flex>
                <HStack spacing={"10px"} ml="27px">
                  <Box
                    width={"12px"}
                    height={"25px"}
                    borderRadius={"20px"}
                    bg={"#3C8DBC"}
                  ></Box>
                  <Text fontSize={"19px"} lineHeight={"24px"}>
                    Topic({capitalize(topicName)})
                  </Text>
                </HStack>

                <Spacer />

                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  w="30%"
                  border="1px solid #ccc"
                  borderRadius="14px"
                  px="3"
                  bg={innerBackground}
                  py="2"
                  mx={12}
                  my={"17"}
                  style={{
                    backgroundImage: `url(${VectorImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "10px center",
                    paddingLeft: "40px",
                  }}
                />
              </Flex>
              {lecturesDataLoading && (
                <Center my={2}>
                  <Spinner />
                </Center>
              )}
              <Flex p={6} gap={"24px"} flexWrap={"wrap"}>
                {lecturesData.filter(filterLectures).map((lecture) => (
                  <LectureCard
                    id={lecture?.roomId}
                    classRoomDetail={lecture?.LiveClassRoomDetail}
                    scheduledDate={lecture?.scheduledDate}
                    classLevel={lecture?.classLevel}
                    route={handleNavigate}
                  />
                ))}
                {lecturesData.length === 0 && (
                  <Box
                    h={"204px"}
                    width={"100%"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    display={"flex"}
                  >
                    No Lecture for this topic
                  </Box>
                )}
              </Flex>
            </Box>
          </Box>
        </Stack>
        <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
      </Flex>
    </>
  );
};

export default TopicBasedLectures;

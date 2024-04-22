import {
  Box,
  Center,
  Text,
  useTheme,
  Flex,
  HStack,
  Input,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { capitalize } from "../../../utils";
import VectorImage from "../../../assets/images/Line/Vector.svg";
import { getAllLectureByTopicId } from "../../../api/lecture";
import LectureCard from "../../../components/Card/LectureCard";

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

  return (
    <Box width={"100%"}>
      <Box bg={outerBackground} borderRadius={"26px"} p={"30px"}>
        <Flex justifyContent={"space-between"} mb={"20px"}>
          <HStack spacing={"10px"}>
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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={"6"}>
          {lecturesData.filter(filterLectures).map((lecture) => (
            <LectureCard
              width={"100%"}
              id={lecture?.roomId}
              classRoomDetail={lecture?.LiveClassRoomDetail}
              scheduledDate={lecture?.scheduledDate}
              classLevel={lecture?.classLevel}
              route={handleNavigate}
            />
          ))}
        </SimpleGrid>
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
      </Box>
    </Box>
  );
};

export default TopicBasedLectures;

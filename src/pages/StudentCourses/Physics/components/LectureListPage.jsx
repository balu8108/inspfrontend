import {
  Box,
  Text,
  useTheme,
  Flex,
  HStack,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalize } from "../../../../utils";
import VectorImage from "../../../../assets/images/Line/Vector.svg";
import { getAllLectureByTopicId } from "../../../../api/lecture";
import LectureCard from "../../../../components/Card/LectureCard";
import TopicCard from "../../../../components/Card/TopicCard";

const LectureListPage = ({ lectureId, lectureName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const topics = location.state?.topics || [];
  const [selectedTopic, setSelectedTopic] = useState(lectureId);
  const [selectedTopicName, setSelectedTopicName] = useState(lectureName);
  const [searchTerm, setSearchTerm] = useState("");
  const [lecturesData, setLecturesData] = useState([]);
  const { outerBackground, innerBackground } = useTheme().colors.pallete;

  const selectedChapterName =
    location.state?.selectedChapterName || "Select a Chapter";

  const lectures = selectedTopic ? lecturesData : [];

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic?.id);
    setSelectedTopicName(topic?.name);
  };

  const handleView = (roomId) => {
    if (selectedTopic && lectures.length > 0) {
      navigate(`/my-courses/lecture-detail/${roomId}/Physics`, {
        state: {
          lecture: lectures,
          topicname: selectedTopicName,
        },
      });
    }
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
      const response = await getAllLectureByTopicId(selectedTopic, "regular");
      const { data } = response.data;
      setLecturesData(data);
    } catch (err) {
      console.error("Error fetching all crash course lectures:", err);
    }
  };

  useEffect(() => {
    if (selectedTopic) {
      getAllLecture();
    }
  }, [selectedTopic]);

  return (
    <Box width={"100%"}>
      <Box
        bg={outerBackground}
        borderRadius={"26px"}
        p={"30px"}
        className="example"
      >
        <HStack spacing={"10px"} mb={"20px"} alignItems="center">
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"}>
            Physics ({selectedChapterName})
          </Text>
        </HStack>
        <Flex
          flexDirection={"row"}
          gap={23}
          overflowX={"auto"}
          className="example"
        >
          {topics.map((topic) => (
            <TopicCard
              width={"30%"}
              topic={topic}
              handleView={handleTopicClick}
            />
          ))}
        </Flex>
      </Box>
      {selectedTopic ? (
        <Box bg={outerBackground} borderRadius={"26px"} mt={"24px"} p={"30px"}>
          <Flex justifyContent={"space-between"} mb={"20px"}>
            <HStack spacing={"10px"}>
              <Box
                width={"12px"}
                height={"25px"}
                borderRadius={"20px"}
                bg={"#3C8DBC"}
              ></Box>
              <Text fontSize={"19px"} lineHeight={"24px"}>
                Topic ({capitalize(selectedTopicName)})
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
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={"6"}>
            {lectures.filter(filterLectures).map((lecture) => (
              <LectureCard
                width={"100%"}
                id={lecture?.roomId}
                classRoomDetail={lecture?.LiveClassRoomDetail}
                scheduledDate={lecture?.scheduledDate}
                classLevel={lecture?.classLevel}
                route={handleView}
              />
            ))}
          </SimpleGrid>
          {lectures.length === 0 && (
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
      ) : (
        <Box
          width={"100%"}
          bg={outerBackground}
          borderRadius={"26px"}
          mt={"24px"}
        >
          <Flex
            align="center"
            justify="center"
            direction="column"
            height="300px"
            color="gray.500"
          >
            <Text fontSize="18px">Please select a topic !!</Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default LectureListPage;
